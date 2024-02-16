"use client"

import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"

interface ConvasProps {
    boardId: string;

}

export const Convas = ({
    boardId,
} :ConvasProps) => {
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