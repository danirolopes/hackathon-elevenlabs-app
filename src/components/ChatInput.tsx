
import { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-2 border-t bg-white/80 px-4 py-4 backdrop-blur-sm"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm outline-none transition-all focus:border-blue-500"
        disabled={disabled}
      />
      <button
        type="submit"
        disabled={disabled || !message.trim()}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white transition-all hover:bg-blue-600 disabled:opacity-50"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
};
