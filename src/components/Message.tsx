
import { cn } from "@/lib/utils";

interface MessageProps {
  content: string;
  isAi?: boolean;
}

export const Message = ({ content, isAi = false }: MessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full animate-fade-in",
        isAi ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm transition-all",
          isAi
            ? "bg-gray-100 text-gray-800"
            : "bg-blue-500 text-white"
        )}
      >
        {content}
      </div>
    </div>
  );
};
