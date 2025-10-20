import { useRef, type JSX } from "react";
import "./card.css";

type CardProps = JSX.IntrinsicElements["div"] & {
  spotlightColor?: string;
};

export const Card = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
  ...rest
}: CardProps) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
    divRef.current.style.setProperty("--spotlight-color", spotlightColor);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};
