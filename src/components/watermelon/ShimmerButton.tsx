import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ShimmerButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "ghost";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  children,
  variant = "primary",
  icon,
  iconPosition = "right",
  fullWidth = false,
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  const variantStyles = {
    primary:
      "bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white shadow-indigo-500/25 border-indigo-400/30 hover:shadow-indigo-500/40",
    secondary:
      "bg-slate-800/80 text-slate-200 border-slate-700 hover:bg-slate-700/80 hover:text-white shadow-black/40",
    success:
      "bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-emerald-500/25 border-emerald-400/30 hover:shadow-emerald-500/40",
    ghost:
      "bg-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border-transparent",
  };

  const isDisabled = disabled || isLoading;

  return (
    <div className={`shimmer-btn-wrapper inline-block ${fullWidth ? "w-full" : ""}`}>
      <motion.button
        whileHover={{ scale: isDisabled ? 1 : 1.02, y: isDisabled ? 0 : -1 }}
        whileTap={{ scale: isDisabled ? 1 : 0.97 }}
        disabled={isDisabled}
        className={`relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm border shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
          variantStyles[variant]
        } ${fullWidth ? "w-full" : ""} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-white" />
        ) : (
          <>
            {icon && iconPosition === "left" && (
              <span className="transition-transform duration-200 group-hover:-translate-x-0.5">
                {icon}
              </span>
            )}
            <span>{children}</span>
            {icon && iconPosition === "right" && (
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                {icon}
              </span>
            )}
          </>
        )}
      </motion.button>
    </div>
  );
};

export default ShimmerButton;
