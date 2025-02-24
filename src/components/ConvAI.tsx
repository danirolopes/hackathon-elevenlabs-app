
"use client";

import { Button } from "@/components/ui/button";
import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Conversation } from "@11labs/client";
import { cn } from "@/lib/utils";

async function requestMicrophonePermission() {
  try {
    await navigator.mediaDevices.getUserMedia({
      audio: true
    });
    return true;
  } catch {
    console.error('Microphone permission denied');
    return false;
  }
}

export function ConvAI() {
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function startConversation() {
    if (isLoading) return; // Prevent double-clicks

    setIsLoading(true);
    try {
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        alert("No permission");
        return;
      }

      const clientTools = {
        getCustomerDetails: async () => {
          const customerData = {
            id: 123,
            name: "Alice",
            subscription: "Pro"
          };
          return customerData;
        }
      };

      const conversation = await Conversation.startSession({
        agentId: "abDDQkj2EPM0DhZoh85K",
        clientTools,
        onConnect: () => {
          setIsConnected(true);
          setIsSpeaking(true);
        },
        onDisconnect: () => {
          setIsConnected(false);
          setIsSpeaking(false);
        },
        onError: error => {
          console.log(error);
          alert('An error occurred during the conversation');
        },
        onModeChange: ({
          mode
        }) => {
          setIsSpeaking(mode === 'speaking');
        }
      });
      setConversation(conversation);
    } catch (error) {
      console.error('Error starting conversation:', error);
      alert('Failed to start conversation');
    } finally {
      setIsLoading(false);
    }
  }

  async function endConversation() {
    if (!conversation) {
      return;
    }
    await conversation.endSession();
    setConversation(null);
  }

  return <div className={"flex justify-center items-center gap-x-4 min-h-screen"}>
      <Card className={'rounded-3xl'}>
        <CardContent>
          <CardHeader>
            <CardTitle className={'text-center text-xl font-bold'}>
              Personal Chef AI
            </CardTitle>
          </CardHeader>
          <div className={'flex flex-col gap-y-4 text-center'}>
            <div className={cn('orb my-8 mx-12', isSpeaking ? 'animate-orb' : conversation && 'animate-orb-slow', isConnected ? 'orb-active' : 'orb-inactive')}></div>

            <p className="text-sm text-gray-500 -mt-4 mb-2 py-[10px]">
              {isConnected ? isSpeaking ? "Agent is speaking" : "Agent is listening" : "Disconnected"}
            </p>

            <Button variant={'outline'} className={'rounded-full'} size={"lg"} disabled={isLoading || conversation !== null && isConnected} onClick={startConversation}>
              {isLoading ? 'Starting...' : 'Start conversation'}
            </Button>
            <Button variant={'outline'} className={'rounded-full'} size={"lg"} disabled={conversation === null && !isConnected} onClick={endConversation}>
              End conversation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>;
}
