import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

const GuestNavbar = () => {
  return (
    <div className="flex p-2 justify-between text-white">
      {/* Left Logo */}
      <div className="flex justify-center items-center gap-2">
        <Image
          src="/LOGOANY.png"
          alt="Logo"
          width={56}
          height={56}
          className="rounded-lg object-cover"
        />
        <h1 className="text-xl font-bold">AnyOneCanConnect</h1>
      </div>

      {/* Center Nav Links */}
      <div className="flex  text-lg mt-[10px] gap-5">
        <Link href="/">Home</Link>
        <Link href="/about">About Us</Link>
        <Link href="/offering">Offerings</Link>
        <Link href="/coming-soon">Coming Soon</Link>
      </div>

      {/* Right Auth Buttons */}
      <div className="flex gap-4">
        <Link href="/signup">
          <Button className="bg-[#FCFCFC] cursor-pointer text-black hover:bg-[#FCFCFC] hover:text-black">
            Sign Up
          </Button>
        </Link>
        <Link href="/login">
          <Button className="bg-[#2164f3] text-[#FCFCFC] cursor-pointer hover:bg-[hsl(221,64%,36%)] hover:text-white">
            Login
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default GuestNavbar
