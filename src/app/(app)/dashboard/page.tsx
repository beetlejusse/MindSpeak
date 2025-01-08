"use client";

import { useToast } from "@/hooks/use-toast";
import { Message } from "@/model/User.model";
import { acceptMessagesSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, RefreshCcw, Copy, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import MessageCard from "@/components/custom-ui/messageCard";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { User } from "next-auth";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import Navbar from "@/components/custom-ui/navbar";

function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();
  const form = useForm({
    resolver: zodResolver(acceptMessagesSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-message");
      setValue("acceptMessages", response.data.isAcceptingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "Failed to fetch message settings",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue, toast]);

  const fetchAllMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/get-message");
      setMessages(response.data.messages || []);
      if (refresh) {
        toast({
          title: "Refreshed Messages",
          description: "Showing Latest Messages",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "Failed to fetch messages",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (!session || !session.user) return;
    fetchAcceptMessage();
    fetchAllMessages();
  }, [session, fetchAcceptMessage, fetchAllMessages]);

  const handleSwitchChange = async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.post<ApiResponse>("/api/accept-message", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      toast({
        title: response.data.message,
        variant: "default",
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message || "Failed to update message settings",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  };

  if (!session || !session.user) {
    return <></>;
  }

  const { userName } = session?.user as User;
  const hostURL = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : '';
  const profileURL = `${hostURL}/u/${userName}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileURL);
    setIsCopied(true);
    toast({
      title: "URL Copied Successfully",
      description: "Profile URL copied to clipboard",
    });
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="relative min-h-screen text-white bg-gradient-to-b from-neutral-900 to-neutral-800 flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl z-20 bg-neutral-800 bg-opacity-50 backdrop-blur-lg rounded-xl shadow-2xl p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">User Dashboard</h1>
          <div className="space-y-8">
            <div className="bg-neutral-700 bg-opacity-50 rounded-lg p-4 sm:p-6">
              <h2 className="text-xl font-semibold mb-4 text-center">Your Unique Link</h2>
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <input
                  type="text"
                  value={profileURL}
                  readOnly
                  className="w-full sm:flex-grow p-2 bg-neutral-600 rounded-md text-sm"
                />
                <Button
                  onClick={copyToClipboard}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 ease-in-out flex items-center justify-center"
                >
                  {isCopied ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {isCopied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>
            <div className="bg-neutral-700 bg-opacity-50 rounded-lg p-4 sm:p-6">
              <div className="flex items-center justify-center space-x-4">
                <Switch
                  {...register("acceptMessages")}
                  checked={acceptMessages}
                  onCheckedChange={handleSwitchChange}
                  disabled={isSwitchLoading}
                  className="bg-neutral-600"
                />
                <span className="font-bold text-lg">
                  Accept Messages: {acceptMessages ? "On" : "Off"}
                </span>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Messages</h2>
                <Button
                  className="flex items-center justify-center space-x-2 bg-black text-white"
                  variant="default"
                  onClick={() => fetchAllMessages(true)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCcw className="h-4 w-4" />
                  )}
                  <span>Refresh</span>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {messages.length > 0 ? (
                  messages.map((message) => (
                    <MessageCard
                      key={String(message._id)}
                      message={message}
                      onMessageDelete={handleDeleteMessage}
                    />
                  ))
                ) : (
                  <p className="text-center font-semibold tracking-normal text-lg col-span-full py-8">
                    No Messages to Display.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ShootingStars className="absolute inset-0 z-0" />
      <StarsBackground className="absolute inset-0 z-0" />
    </div>
  );
}

export default Dashboard;

