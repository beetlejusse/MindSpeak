'use client';

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { useCompletion } from "ai/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import * as z from "zod";
import { ApiResponse } from "@/types/ApiResponse";
import Link from "next/link";
import { useParams } from "next/navigation";
import { messageSchema } from "@/schemas/messageSchema";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

// Separator used for splitting the AI response
const specialChar = "||";

// Parse the string to split AI response based on "||" separator
const parseStringMessages = (messageString: string): string[] => {
  if (!messageString || !messageString.includes(specialChar)) {
    console.warn("No separator found in the AI response.");
    return ["Oops! No suggested messages available."]; // Fallback message
  }
  return messageString.split(specialChar).filter(Boolean); // Ensure no empty entries
};

// Initial message string (could be a default value)
const initialMessageString =
  "What's your favorite movie?||Do you have any pets?||What's your dream job?";

export default function SendMessage() {
  const param = useParams<{ userName: string }>();
  const userName = param.userName;
  const [isLoading, setIsLoading] = useState(false);

  // AI Completion using the useCompletion hook
  const {
    complete,
    completion,
    isLoading: isSuggestLoading,
    error,
  } = useCompletion({
    api: "/api/suggest-messages", // Call to backend API
    initialCompletion: initialMessageString,
  });

  // Hook form for handling form submission
  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
  });

  // Watch form content for updates
  const messageContent = form.watch("content");

  // Handle the message click from the suggestions
  const handleMessageClick = (message: string) => {
    form.setValue("content", message);
  };

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setIsLoading(true);
    try {
      await axios.post<ApiResponse>("/api/send-message", {
        ...data,
        userName,
      });

      toast({ title: "Message Sent Successfully", variant: "default" });
      form.reset({ ...form.getValues(), content: "" });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ?? "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch suggested messages using AI
  const fetchSuggestedMessages = async () => {
    try {
      await complete(""); // Trigger the useCompletion API call
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Error",
        description: "Unable to fetch suggested messages. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container min-h-screen bg-gradient-to-b from-neutral-900 to-neutral-800 p-12 shadow-lg min-w-full">
      <h1 className="text-3xl lg:text-5xl font-extrabold mb-8 placeholder:text-gray-300 text-center text-gray-300 z-20">
        Share Your Thoughts Anonymously
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 bg-transparent p-6 rounded-md shadow-md z-20"
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium text-gray-300 z-30">
                  Message to @{userName}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your anonymous message here..."
                    className="resize-none  rounded-md text-gray-300 "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            {isLoading ? (
              <Button
                disabled
                className="bg-gray-400 text-white border-gray-600 cursor-not-allowed"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-gray-800 text-white hover:bg-gray-700 transition-all rounded-md py-2 px-6"
                disabled={!messageContent}
              >
                Send it
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="space-y-4 my-8 z-20">
        <div className="text-center">
          <Button
            onClick={fetchSuggestedMessages}
            className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-6 py-3 rounded-md shadow-md hover:scale-105 transition-transform duration-300"
            disabled={isSuggestLoading}
          >
            {isSuggestLoading ? "Loading..." : "Suggest Messages from AI"}
          </Button>
          <p className="text-gray-400 mt-2">
            Select a suggested message below to quickly add it!
          </p>
        </div>
        <Card className="p-4 bg-transparent rounded-md shadow-md">
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-200">
              Suggested Messages
            </h3>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            {error ? (
              <p className="text-red-500">{error.message}</p>
            ) : (
              parseStringMessages(completion).map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left w-full text-gray-800 bg-gray-100 hover:bg-gray-200 truncate py-2 px-4 rounded-md"
                  onClick={() => handleMessageClick(message)}
                >
                  {message}
                </Button>
              ))
            )}
          </CardContent>
        </Card>
      </div>
      <Separator className="my-6 inset-0 z-20" />
      <div className="text-center z-20">
        <p className="mb-4 text-gray-400">Join us to enhance your experience!</p>
        <Link href={"/sign-up"}>
          <Button className="bg-gray-700 text-white py-2 px-6 rounded-md shadow-lg hover:scale-105 transition-transform duration-300">
            Create Account
          </Button>
        </Link>
      </div>
      {/* <StarsBackground className="absolute inset-0 z-0" /> */}
    </div>
  );
}