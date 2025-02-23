
import { useConversation } from "@11labs/react";
import { useEffect, useState } from "react";

export const ElevenLabsAgent = () => {
  const conversation = useConversation();
  const [volume, setVolume] = useState(1);
  const { status, isSpeaking } = useConversation();

  useEffect(() => {
    const initConversation = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        await conversation.startSession({
          agentId: "abDDQkj2EPM0DhZoh85K"
        });
      } catch (error) {
        console.error("Error starting conversation:", error);
      }
    };

    initConversation();

    return () => {
      conversation.endSession();
    };
  }, [conversation]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white p-4">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">AI Assistant</h1>
        <p className="text-sm text-gray-600">
          {status === "connected" 
            ? isSpeaking 
              ? "Speaking..." 
              : "Listening..."
            : "Connecting..."}
        </p>
      </div>
      
      <div className="w-full max-w-md">
        <label htmlFor="volume" className="mb-2 block text-sm font-medium text-gray-700">
          Volume: {Math.round(volume * 100)}%
        </label>
        <input
          type="range"
          id="volume"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => {
            const newVolume = parseFloat(e.target.value);
            setVolume(newVolume);
            conversation.setVolume({ volume: newVolume });
          }}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
        />
      </div>
    </div>
  );
};
