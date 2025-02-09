"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function SignupPage() {
  const [userName, setUserName] = useState("");
  const [nameMessage, setNameMessage] = useState("");
  const [isCheckingUserName, setIsCheckingUserName] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const debouncedUserName = useDebounceCallback(setUserName, 300);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUniqueName = async () => {
      if (userName) {
        setIsCheckingUserName(true);
        setNameMessage("");

        try {
          const response = await axios.get<ApiResponse>(
            `/api/check-unique-username?userName=${userName}`
          );
          setNameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setNameMessage(
            axiosError.response?.data.message ?? "Error finding username"
          );
        } finally {
          setIsCheckingUserName(false);
        }
      }
    };
    checkUniqueName();
  }, [userName]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitted(true);
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data);
      toast({
        title: "Success",
        description: response.data.message,
        variant: "default",
      });
      router.replace(`/sign-in`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Signup Failed",
        description: axiosError.response?.data.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitted(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 overflow-hidden">
      <div className="absolute inset-0 w-full h-full opacity-30 animate-pulse" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-transparent to-gray-900 opacity-50 animate-spin-slow" />
      <div className="relative w-full max-w-md bg-gray-900 shadow-lg rounded-xl p-8 space-y-6 z-10">
        <h1 className="text-3xl font-bold text-center">Join MindSpeak</h1>
        <p className="text-gray-400 text-center">Create an account to get started</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="userName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
                      className="bg-gray-800 border-gray-700 text-white"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debouncedUserName(e.target.value);
                      }}
                    />
                  </FormControl>
                  {isCheckingUserName && <Loader2 className="animate-spin h-5 w-5 mt-1" />}
                  <p className={`text-sm ${nameMessage.includes("Unique") ? "text-green-500" : "text-red-500"}`}>{nameMessage}</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="bg-gray-800 border-gray-700 text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter a strong password"
                      className="bg-gray-800 border-gray-700 text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500" disabled={isSubmitted}>
              {isSubmitted ? <Loader2 className="animate-spin h-5 w-5" /> : "Sign Up"}
            </Button>
          </form>
        </Form>

        <p className="text-center text-gray-400 text-sm">
          Already have an account?{' '}
          <Link href="/sign-in" className="text-indigo-400 hover:underline">
            Sign in here
          </Link>
        </p>
      </div>
      <BackgroundBeams />

    </div>
  );
}
