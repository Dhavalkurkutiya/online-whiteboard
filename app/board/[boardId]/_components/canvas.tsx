"use client"

import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"

import { useSelf } from "@/liveblocks.config"

interface ConvasProps {
    boardId: string;

}

export const Canvas = ({
    boardId,
} :ConvasProps) => {

    const info = useSelf((me) => me.info!);
    console.log(info)

    return (
        <main
            className="h-full w-full bg-neutral-100 touch-none"
        >
            <Info />
            <Participants />
            <Toolbar />
        </main>
    )
}