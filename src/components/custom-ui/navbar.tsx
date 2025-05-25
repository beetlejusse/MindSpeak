"use client"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Menu, X, Star } from "lucide-react"
import { useState } from "react"

const Navbar = () => {
  const { data: session } = useSession()
  const user = session?.user
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 py-6 px-6 backdrop-blur-sm border-b border-white/10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-thin tracking-widest text-white">
          MINDSPEAK
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="https://github.com/beetlejusse/MindSpeak"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-white/20 hover:border-white/40 text-white hover:bg-white/5 px-6 py-2 font-light tracking-wide transition-all duration-300"
          >
            <Star className="w-4 h-4" />
            <span>STAR</span>
          </a>

          {session ? (
            <>
              <span className="text-white/70 font-light tracking-wide">{user?.name || user?.email}</span>
              <Button
                onClick={handleSignOut}
                className="bg-white text-black hover:bg-gray-200 px-8 py-2 font-light tracking-wide transition-all duration-300 hover:scale-105"
              >
                LOGOUT
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-white/70 hover:text-white font-light tracking-wide transition-colors duration-300"
              >
                SIGN IN
              </Link>
              <Link
                href="/sign-up"
                className="border border-white/20 hover:border-white/40 text-white hover:bg-white/5 px-8 py-2 font-light tracking-wide transition-all duration-300"
              >
                SIGN UP
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden absolute w-full top-full left-0 bg-black/90 backdrop-blur-sm border-b border-white/10 p-6"
        >
          <div className="flex flex-col items-center space-y-6">
            <a
              href="https://github.com/beetlejusse/MindSpeak"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-white/20 hover:border-white/40 text-white hover:bg-white/5 px-6 py-2 font-light tracking-wide transition-all duration-300"
            >
              <Star className="w-4 h-4" />
              <span>STAR ON GITHUB</span>
            </a>

            {session ? (
              <>
                <span className="text-white/70 font-light tracking-wide text-center">{user?.name || user?.email}</span>
                <Button
                  onClick={handleSignOut}
                  className="bg-white text-black hover:bg-gray-200 px-8 py-2 font-light tracking-wide transition-all duration-300"
                >
                  LOGOUT
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-white/70 hover:text-white font-light tracking-wide transition-colors duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  SIGN IN
                </Link>
                <Link
                  href="/sign-up"
                  className="border border-white/20 hover:border-white/40 text-white hover:bg-white/5 px-8 py-2 font-light tracking-wide transition-all duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  SIGN UP
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar
