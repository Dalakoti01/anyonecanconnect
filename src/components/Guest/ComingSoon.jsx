import Image from 'next/image'
import GuestNavbar from '../shared/GuestNavbar'

const ComingSoon = () => {
  return (
    <div className="w-full">
      <div className="relative h-screen w-full">
        {/* Background Image */}
        <Image
          src="/pexels-minan1398-813269.jpg"
          alt="Contact Background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black opacity-80 z-10"></div>

        <div className="relative z-20 pt-7 px-7">
          <GuestNavbar />
          <div className="flex justify-center items-center text-center h-screen">
            <h1 className="text-white font-bold text-4xl">Coming Soon</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComingSoon
