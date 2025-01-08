"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Mail } from 'lucide-react';
import React from "react";
import messages from "@/messages.json";
import Autoplay from "embla-carousel-autoplay";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import Navbar from "@/components/custom-ui/navbar";

const HomePage = () => {
  const words2 = [
    { text: "MindSpeak", className: "bg-clip-text bg-gradient-to-r text-purple-400" },
    { text: "-", className: "bg-clip-text bg-gradient-to-r text-purple-400" },
    { text: "Say", className: "bg-clip-text bg-gradient-to-r text-purple-400" },
    { text: "anything", className: "bg-clip-text bg-gradient-to-r text-purple-500" },
    { text: "you", className: "bg-clip-text bg-gradient-to-r text-violet-500" },
    { text: "want, ", className: "bg-clip-text bg-gradient-to-r text-violet-500" },
    { text: "without", className: "bg-clip-text bg-gradient-to-r text-violet-500" },
    { text: "revealing", className: "bg-clip-text bg-gradient-to-r text-pink-500" },
    { text: "your", className: "bg-clip-text bg-gradient-to-r text-pink-500" },
    { text: "true", className: "bg-clip-text bg-gradient-to-r text-pink-700" },
    { text: "Identity.", className: "bg-clip-text bg-gradient-to-r text-pink-700" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <BackgroundBeamsWithCollision className="flex-grow">
        <div className="flex-grow flex flex-col items-center justify-center px-4 h-full sm:px-6 md:px-8 lg:px-12 xl:px-24 bg-[#242424] text-slate-500">
          <section className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8">
              Dive into the World of Anonymous FeedBack...
            </h1>
            <div className="bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-2 sm:py-3 md:py-4">
              <p className="tracking-tight font-semibold text-xs sm:text-sm md:text-base lg:text-lg">
                <TypewriterEffect words={words2} />
              </p>
            </div>
          </section>
          {/* Carousel for Messages */}
          <Carousel
            plugins={[Autoplay({ delay: 2000 })]}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index} className="p-2 sm:p-3 md:p-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm sm:text-base md:text-lg lg:text-xl">{message.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-2 md:space-x-4">
                      <Mail className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                      <div>
                        <p className="text-xs sm:text-sm md:text-base">{message.content}</p>
                        <p className="text-xxs sm:text-xs text-muted-foreground mt-1">
                          {message.received}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
};

export default HomePage;

