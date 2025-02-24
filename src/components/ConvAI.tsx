
import { useEffect, useState } from "react";
import { useConversation } from "@11labs/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mic } from "lucide-react";

export const ConvAI = () => {
  const { toast } = useToast();
  const conversation = useConversation({
    clientTools: {
      showAlert: (parameters: { message: string }) => {
        toast({
          title: "Chef's Note",
          description: parameters.message
        });
        return "Alert shown successfully";
      }
    }
  });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const initConversation = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        await conversation.startSession({
          agentId: "abDDQkj2EPM0DhZoh85K"
        });
        setIsConnected(true);
      } catch (error) {
        console.error("Error starting conversation:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not start conversation. Please make sure you have granted microphone access."
        });
      }
    };

    initConversation();

    return () => {
      conversation.endSession();
    };
  }, [conversation]);

  return (
    <Card className="mx-4 mt-4">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center gap-4">
          <Button 
            variant={isConnected ? "outline" : "default"}
            size="icon"
            className="h-16 w-16 rounded-full"
          >
            <Mic className={`h-8 w-8 ${isConnected ? 'text-green-500' : ''}`} />
          </Button>
          <p className="text-sm text-gray-500">
            {isConnected ? "I'm listening..." : "Connecting..."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
