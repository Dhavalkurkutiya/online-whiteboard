"use client"

import { useState } from "react"
import { Info } from "./info"
import { Participants } from "./participants"
import { Toolbar } from "./toolbar"

import { useCanRedo, useCanUndo, useHistory, useSelf } from "@/liveblocks.config"
import { CanvasMode, CanvasState } from "@/types/canvas"
interface ConvasProps {
    boardId: string;

}

export const Canvas = ({
    boardId,
} :ConvasProps) => {

    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
      });

      const history = useHistory();
      const canUndo = useCanUndo();
      const canRedo = useCanRedo();

    return (
        <main
            className="h-full w-full bg-neutral-100 touch-none"
        >
            <Info boardId={boardId} />
            <Participants />
            <Toolbar 
            canvasState={canvasState}
            setCanvasState={setCanvasState}
            canRedo={canRedo}
            canUndo={canUndo}
            undo={history.undo}
            redo={history.redo}
            />
        </main>
    )
}