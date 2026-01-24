interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "submit" | "button" | "reset";
  variant?: "primary" | "secondary" | "outline" | "teritary";
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-red-800 text-white hover:bg-gray-700",
  outline: "border border-gray-600 hover:bg-gray-200",
  teritary: "bg-gray-200 border border-gray-400 hover:bg-gray-100",
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "primary",
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`
        cursor-pointer
        px-4 py-2
        rounded-md
        transition-colors
        ${variantClasses[variant]}
      `}
    >
      {label}
    </button>
  );
};

export { Button };
