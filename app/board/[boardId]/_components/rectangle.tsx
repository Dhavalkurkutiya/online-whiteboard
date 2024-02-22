import { colorToCss } from "@/lib/utils";
import { RectangleLayer } from "@/types/canvas";

interface ReactangleProps {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selctionColor?: string;
}

export const Rectangle = ({
  id,
  layer,
  onPointerDown,
  selctionColor,
}: ReactangleProps) => {
  const { x, y, width, height, fill } = layer;

  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      fill={fill ? colorToCss(fill) : "#000"}
      stroke={selctionColor || "transparent"}
    />
  );
};
