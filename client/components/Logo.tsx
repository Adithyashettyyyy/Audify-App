import { Link } from "react-router-dom";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ size = "md", className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <Link to="/" className={`${className}`}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets%2F177f829a9f0248e68b63ccb65368eee6%2Fa3153342a73941eda1de35b8a41af511?format=webp&width=800"
        alt="Audify Logo"
        className={`${sizeClasses[size]} object-contain hover:scale-105 transition-transform duration-200`}
      />
    </Link>
  );
}
