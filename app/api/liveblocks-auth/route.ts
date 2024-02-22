import { auth, currentUser } from '@clerk/nextjs';
import { Liveblocks } from '@liveblocks/node';
import { ConvexHttpClient } from 'convex/browser';

import { api } from '@/convex/_generated/api';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
    secret: "sk_dev_LJNaxRpqOFI5SApzCgkhOI6MopEPVsf-WuymRuPbH6bUlGrB-xEeVeB0WSyK1Esq",
});

export async function POST(request: Request) {
    const authorizaton = await auth();
    const user = await currentUser();


    if (!authorizaton || !user) {
        return new Response("Unauthorized", { status: 403 });
    }

    const { room } = await request.json();
    const board = await convex.query(api.board.get, { id: room });


    if (board?.orgId !== authorizaton.orgId) {
        return new Response("Unauthorized", { status: 403 });
    }

    const userInfo = {
        name: user.firstName! || "Teammeate",
        picture: user.imageUrl,
    };


    const session = liveblocks.prepareSession(
        user.id,
        { userInfo }
    );

    if (room) {
        session.allow(room, session.FULL_ACCESS);
    }


    const { status, body } = await session.authorize();
    return new Response(body, { status });

};