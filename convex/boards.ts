import  { v } from "convex/values";
import { mutation } from "./_generated/server";


const images = [
    "/paceholders/1.svg",
    "/paceholders/2.svg",
    "/paceholders/3.svg",
    "/paceholders/4.svg",
    "/paceholders/5.svg",
    "/paceholders/6.svg",
    "/paceholders/7.svg",
    "/paceholders/8.svg",
    "/paceholders/9.svg",
    "/paceholders/10.svg",
]

export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if(!identity) {
            throw new Error("Unauthorized");
        }

        const randomImage =  images[Math.floor(Math.random() * images.length)];
        const board  = await ctx.db.insert("boards", {
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authornName: identity.name!,
            imageUrl: randomImage,
        })
        return board;
    },
});