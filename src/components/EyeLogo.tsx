import { Eye } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface EyeLogoProps {
  className?: string;
  animated?: boolean;
}

export const EyeLogo = ({ className, animated = false }: EyeLogoProps) => {
  if (!animated) {
    return <Eye className={cn("h-6 w-6", className)} strokeWidth={2.2} />;
  }
  return (
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className={cn("inline-flex", className)}
    >
      <Eye className="h-full w-full" strokeWidth={2.2} />
    </motion.div>
  );
};
