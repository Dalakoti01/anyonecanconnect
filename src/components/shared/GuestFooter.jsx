import Link from 'next/link'
import { Button } from '../ui/button'

const GuestFooter = () => {
  return (
    <div>
      <div className="mt-20 relative h-[40vh]">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/homeLast.jpg')",
          }}
        >
          {/* Dimming overlay */}
          <div className="absolute inset-0 bg-black opacity-60"></div>

          <div className="relative z-10 flex justify-center items-center h-full">
            <div className="flex flex-col gap-6 items-center px-4 md:gap-8 lg:gap-10">
              <h1
                className="text-[#FCFCFC] text-3xl md:text-4xl lg:text-6xl font-bold text-center"
                style={{
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
                }}
              >
                Join Our Community Today
              </h1>
              <h3
                className="text-[#FCFCFC] text-base md:text-lg lg:text-xl font-bold text-center"
                style={{
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)",
                }}
              >
                Sign up now to revolutionize your freelance experience and
                connect with clients directly without any commission fees.
              </h3>
              <a
                rel="noopener noreferrer"
              href="/"
              >
                <Button className="bg-[rgb(33,100,243)] cursor-pointer text-sm md:text-lg px-5 md:px-7 py-3 md:py-5 font-bold hover:bg-white hover:text-black">
                  Join Us
                </Button>
              </a>
            </div>
          </div>

          {/* Bottom Legal Links */}
          <div className="relative z-10 flex justify-center items-center gap-5 mt-8">
            <p className="text-center text-[#607D8B] text-xs md:text-sm">
              Copyright © 2024 Next-connect-hub
            </p>
            <Link
              href="/privacy-policy"
              className="text-slate-500 underline text-xs md:text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-condition"
              className="text-slate-500 underline text-xs md:text-sm"
            >
              Terms and Condition
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GuestFooter
