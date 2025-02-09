"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Menu, X, Star } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="p-4 md:p-5 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-wider text-purple-400">
          MINDSPEAK
        </h1>

        <div className="hidden md:flex space-x-6 items-center">
          <a
            href="https://github.com/beetlejusse/MindSpeak"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 px-5 py-2.5 rounded-lg transition font-semibold"
          >
            <Star className="w-5 h-5 text-yellow-400" />
            <span>Star on GitHub</span>
          </a>

          {session ? (
            <>
              <span className="font-semibold text-lg">Welcome, {user?.name || user?.email}</span>
              <Button 
                onClick={handleSignOut} 
                variant="outline" 
                className="border border-purple-400 text-white bg-purple-400 font-semibold transition px-6 py-2 rounded-lg "
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button 
                variant="outline" 
                className="border border-purple-400 text-white bg-purple-400 transition px-6 py-2 rounded-lg font-semibold "
              >
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 absolute w-full top-full left-0 flex flex-col items-center space-y-4 shadow-lg"
        >
          <a
            href="https://github.com/beetlejusse/MindSpeak"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 px-5 py-2.5 rounded-lg transition font-semibold"
          >
            <Star className="w-5 h-5 text-yellow-400" />
            <span>Star on GitHub</span>
          </a>

          {session ? (
            <Button 
              onClick={handleSignOut} 
              variant="outline" 
              className="border border-purple-400 text-white hover:bg-purple-400 hover:text-gray-900 transition px-6 py-2 rounded-lg font-medium"
            >
              Logout
            </Button>
          ) : (
            <Link href="/sign-in">
              <Button 
                variant="outline" 
                className="border border-purple-400 text-white hover:bg-purple-400 hover:text-gray-900 transition px-6 py-2 rounded-lg font-medium"
              >
                Login
              </Button>
            </Link>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
