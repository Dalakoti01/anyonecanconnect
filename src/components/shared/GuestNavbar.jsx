'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const GuestNavbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className=" text-white">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/LOGOANY.png"
            alt="Logo"
            width={48}
            height={48}
            className="rounded-lg object-cover"
          />
          <h1 className="text-xl font-bold">AnyOneCanConnect</h1>
        </div>

        {/* Hamburger (mobile) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Nav Links (desktop only) */}
        <div className="hidden md:flex gap-6 text-lg">
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/offering">Offerings</Link>
          <Link href="/coming-soon">Coming Soon</Link>
        </div>

        {/* Auth Buttons (desktop only) */}
        <div className="hidden md:flex gap-4">
          <Link href="/signup">
            <Button className="bg-white text-black hover:bg-white">Sign Up</Button>
          </Link>
          <Link href="/login">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">Login</Button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-6 pt-2 space-y-6 text-base font-medium">
          <div className="flex flex-col gap-4">
            <Link href="/" onClick={() => setIsOpen(false)} className="block">
              Home
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className="block">
              About Us
            </Link>
            <Link href="/offering" onClick={() => setIsOpen(false)} className="block">
              Offerings
            </Link>
            <Link href="/coming-soon" onClick={() => setIsOpen(false)} className="block">
              Coming Soon
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/signup" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-white text-black hover:bg-white">Sign Up</Button>
            </Link>
            <Link href="/login" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">Login</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default GuestNavbar
