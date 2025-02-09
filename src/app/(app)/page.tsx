"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Mail, Users, Shield, Quote, MessageCircleCode } from "lucide-react";
import React from "react";
import messages from "@/messages.json";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import Navbar from "@/components/custom-ui/navbar";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 sm:px-12">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl mt-12 sm:mt-20"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Share Your Thoughts, Stay Anonymous
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Speak freely without revealing your identity. Connect with honesty and transparency.
          </p>
          <Button className="mt-6 px-6 py-3 text-lg font-semibold bg-purple-500 hover:bg-purple-600 rounded-lg shadow-lg transition-transform hover:scale-105">
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </motion.section>
        <section className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
          {[{ icon: Users, title: "Community", desc: "Engage with an open and supportive community.", color: "text-purple-400" },
            { icon: Shield, title: "Privacy", desc: "Your identity remains anonymous and secure.", color: "text-green-400" },
            { icon: Mail, title: "Messaging", desc: "Express your thoughts freely with like-minded people.", color: "text-blue-400" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="p-6 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform border border-gray-700">
                <CardHeader className="flex flex-col items-center">
                  <feature.icon size={40} className={`${feature.color}`} />
                  <CardTitle className="mt-4 text-xl font-semibold text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-400 text-sm text-center">
                  {feature.desc}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </section>
        <motion.section 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          className="mt-16 w-full max-w-3xl"
        >
          <Carousel plugins={[Autoplay({ delay: 3000 })]}>
            <CarouselContent className="flex justify-center gap-10">
              {messages.map((msg, index) => (
                <CarouselItem key={index} className="p-6 bg-gray-900 shadow-lg flex flex-col items-center text-center w-full">
                  <MessageCircleCode size={32} className="text-purple-400 mb-4" />
                  <p className="text-gray-300 italic text-lg text-center w-4/5">"{msg.content}"</p>
                  <p className="mt-4 text-sm text-gray-500 font-medium">- {msg.author}</p>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.section>
      </main>
    </div>
  );
};

export default HomePage;