import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../ui/button'
import GuestNavbar from '../shared/GuestNavbar'

const HomePage = () => {
  return (
    <div className="w-full">

      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute top-0 left-0 w-full h-[90%]">
          <Image
            src="/backgroundHome.jpg"
            alt="Hero Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-80"></div>

          <div className="relative pt-7 px-7">
            <GuestNavbar /> {/* ✅ Navbar added here */}

            <div className="mt-28 flex flex-col items-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-[#FCFCFC] leading-tight">
                Elevate Your Freelance <br />
                <span className="block">Experience</span>
              </h1>
              <div className="mt-8 font-bold text-[#FCFCFC] text-sm md:text-base">
                Discover a platform where meaningful collaboration takes center stage.
                <div>
                  Say goodbye to commissions and hello to opportunities that put
                  your success first
                </div>
              </div>
              <Link href="/coming-soon">
                <Button className="mt-7 py-4 md:py-6 bg-[#2164f3] hover:bg-white hover:text-black max-w-32 text-[#FCFCFC]">
                  Coming Soon
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[10%] bg-white"></div>
      </div>

      {/* Explore Section */}
      <div className="flex flex-col items-center gap-7 px-5 md:px-0">
        <h1 className="text-black font-bold text-3xl md:text-5xl text-center">
          Explore Our Key Offerings
        </h1>
        <div className="flex flex-col items-center">
          <p className="text-base md:text-lg text-black text-center">
            We’re here to redefine how freelancers and clients connect.
            Explore a suite of tools and features designed to help you succeed on your own terms.
          </p>
          <p className="mt-5 font-bold text-lg md:text-xl text-black text-center">
            Empower Your Work, Your Way
          </p>
        </div>
      </div>

      {/* Key Offerings */}
      <div className="flex flex-wrap justify-around gap-10 mt-10 px-5">
        {[
          {
            src: '/homeCard1.webp',
            title: 'No Commission',
            desc: 'Experience complete transparency with our no-commission model. Maximise your earnings while enjoying direct communication with clients for better collaboration.'
          },
          {
            src: '/homeCard2.webp',
            title: 'Community Engagement',
            desc: 'Join a vibrant community of freelancers and clients. Engage in forums, share feedback, and enhance your freelancing journey through collective knowledge.'
          },
          {
            src: '/homeCard3.jpeg',
            title: 'Interactive Learning',
            desc: 'Stay updated with our blogging section, featuring valuable tips and insights. Learn from others and contribute to discussions that drive your success.'
          }
        ].map((item, idx) => (
          <div key={idx} className="max-w-sm flex flex-col gap-3 text-justify">
            <Image
              src={item.src}
              alt={item.title}
              width={400}
              height={240}
              className="w-full h-60 object-cover cursor-pointer rounded-md"
            />
            <h1 className="font-bold text-xl text-center">{item.title}</h1>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Vision Section */}
      <div className="py-10 mt-24 bg-[rgb(228,243,239)] border-s-black">
        <div className="flex flex-wrap justify-around items-center gap-10 px-5">
          <Image
            src="/homeBottom.jpg"
            alt="Vision"
            width={600}
            height={400}
            className="w-full max-w-lg rounded-md cursor-pointer"
          />
          <div className="flex flex-col items-center max-w-lg">
            <h1 className="text-3xl md:text-5xl font-bold text-center">
              Discover The Vision Behind AnyOneCanConnect
            </h1>
            <p className="mt-7 text-justify text-sm md:text-base leading-relaxed">
              Built on years of experience in the freelancing world, <span className="font-bold"> AnyOneCanConnect</span> is more than a platform—it’s a movement. We believe in empowering
              freelancers and clients to collaborate without barriers.
            </p>
            <a
              rel="noopener noreferrer"
              href="/"
            >
              <Button className="mt-7 text-lg font-bold px-10 py-4 md:py-6 bg-[#2164f3] hover:bg-white hover:text-black max-w-32 text-[#FCFCFC]">
                Join Us
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Quote Section */}
      <div className="mt-12 relative h-[50vh]">
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            src="/homeBackgroundBottom.jpg"
            alt="Quote Background"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black opacity-80"></div>
          <div className="relative z-10 flex justify-center items-center h-full">
            <div className="flex flex-col gap-7 text-center">
              <h1 className="text-[#FCFCFC] text-xl md:text-3xl font-bold" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)" }}>
                Alone, we can do so little; together, we can do so much
              </h1>
              <h3 className="text-[#FCFCFC] text-lg md:text-2xl font-bold" style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.9)" }}>
                – Helen Keller
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="flex flex-col gap-5 justify-center items-center mt-10">
        <h1 className="font-bold text-5xl text-center">Why Choose AnyOneCanConnect For Freelancing?</h1>
        <p className="font-bold text-3xl text-center">A Platform Built for You</p>
        <p className="px-12 text-3xl text-center">
          We know the challenges freelancers and clients face. That’s why AnyOneCanConnect is designed to 
          make things easier, fairer, and more effective. Here’s how
        </p>
      </div>

      {/* Transparent Transactions */}
      <div className="mt-14 flex flex-wrap justify-center items-center gap-8 md:gap-24 px-5">
        <Image
          src="/homeSecondLast.jpg"
          alt="Transparent Transactions"
          width={400}
          height={300}
          className="w-full max-w-sm rounded-sm object-cover"
        />
        <div className="flex flex-col items-center max-w-sm gap-4 md:gap-5">
          <h1 className="font-bold text-lg md:text-xl text-center">Transparent Transactions</h1>
          <p className="text-justify">
            Enjoy seamless payments with no hidden fees or middlemen. You earn what you work for, and clients pay what they agreed—simple as that.
          </p>
          <a rel="noopener noreferrer"
              href="/">
            <Button className="bg-[rgb(33,100,243)] text-sm md:text-lg px-5 md:px-7 py-3 md:py-5 font-bold hover:bg-white hover:text-black">
              Join Us
            </Button>
          </a>
        </div>
      </div>

      {/* Seamless Collaboration */}
      <div className="mt-14 md:mt-15 flex flex-wrap justify-center items-center gap-8 md:gap-24 px-5">
        <div className="flex flex-col justify-center items-center max-w-sm gap-4 md:gap-5">
          <h1 className="font-bold text-lg md:text-xl text-center">Seamless Collaboration</h1>
          <p className="text-justify">
            Work smarter, not harder. Our tools make it easy to connect, communicate, and deliver projects without unnecessary hassle.
          </p>
          <a rel="noopener noreferrer"
              href="/">
            <Button className="bg-[rgb(33,100,243)] text-sm md:text-lg px-5 md:px-7 py-3 md:py-5 font-bold hover:bg-white hover:text-black">
              Join Us
            </Button>
          </a>
        </div>
        <Image
          src="/pexels-canvastudio-3277808.jpg"
          alt="Seamless Collaboration"
          width={400}
          height={300}
          className="w-full max-w-sm rounded-sm object-cover"
        />
      </div>
    </div>
  )
}

export default HomePage
