import Image from 'next/image'
import Link from 'next/link'
import GuestNavbar from '../shared/GuestNavbar'
import { Button } from '../ui/button'

const Offering = () => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-[85vh]">
        <Image
          src="/pexels-fauxels-3184357.jpg"
          alt="Offerings Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-80 pointer-events-none" />

        <div className="relative z-20 px-4 sm:px-6 md:px-10 pt-5">
          <GuestNavbar />
          <div className="flex items-center justify-center h-[60vh]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center leading-tight">
              OUR OFFERINGS
            </h1>
          </div>
        </div>
      </div>

      {/* Intro Text */}
      <div className="flex flex-col items-center gap-4 px-4 sm:px-6 md:px-10 mt-8 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#263238]">
          Explore Our Key Offerings
        </h1>
        <p className="text-sm sm:text-base lg:text-lg max-w-3xl">
          Discover how AnyOneCanConnect simplifies freelancing while creating opportunities for growth
          and meaningful connections. No hidden fees, no competition—just genuine support.
        </p>
      </div>

      {/* Offering Cards */}
     {[
  {
    number: '01',
    title: 'No Commission',
    text:
      'We believe your hard-earned money belongs to you. That’s why we’ve removed commission fees entirely. With AnyOneCanConnect, you keep everything you earn while connecting directly with clients or freelancers who value your work.',
    image: '/pexels-sora-shimazaki-5673488.jpg',
    button: 'Get Started - Take Control Over your Earning',
  },
  {
    number: '02',
    title: 'Community Engagement',
    text:
      'Freelancing doesn’t have to be isolating. Our platform fosters a vibrant, supportive community where freelancers and clients can share updates, ask questions, and grow together.',
    image: '/pexels-ivan-samkov-5676744.jpg',
    reverse: true,
    button: 'Join The Conversation - Be A Part Of Something Bigger',
  },
  {
    number: '03',
    title: 'Interactive Learning',
    text:
      'Through mentorship programs, workshops, and resources, we’re here to help you level up. Whether you’re seasoned or just starting out, you’ll find the guidance you need to grow your skills and achieve your goals.',
    image: '/pexels-tranmautritam-58709.jpg',
    button: 'Learn And Grow - Start your Next Chapter',
  },
].map((item, idx) => (
  <div
    key={idx}
    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full max-w-6xl mx-auto mt-12 px-4 sm:px-6`}
    style={{ direction: item.reverse ? 'rtl' : 'ltr' }} // For reversing order
  >
    {/* Image */}
    <div className="flex justify-center">
      <Image
        src={item.image}
        alt={item.title}
        width={600}
        height={450}
        className="w-full max-w-lg rounded-md object-cover"
      />
    </div>

    {/* Text */}
    <div className="flex flex-col gap-6 text-center lg:text-left" style={{ direction: 'ltr' }}>
      <h1 className="font-bold text-xl sm:text-2xl">
        <span className="text-blue-500 mr-3">{item.number}</span> {item.title}
      </h1>
      <p className="text-justify text-sm sm:text-base">{item.text}</p>
      <Link href="/signup">
        <Button className="bg-[rgb(33,100,243)] text-sm md:text-lg px-4 py-2 md:px-6 md:py-4 font-bold hover:bg-white hover:text-black">
          {item.button}
        </Button>
      </Link>
    </div>
  </div>
))}


      {/* Quote Section */}
      <div className="relative w-full h-[50vh] mt-20">
        <Image
          src="/pexels-canvastudio-3277808.jpg"
          alt="Quote"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative z-10 flex justify-center items-center h-full px-4">
          <div className="flex flex-col gap-5 max-w-4xl">
            <h1
              className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}
            >
              Take the next step in your freelancing journey with Direct Connect. Whether you’re a
              client or a freelancer, our platform is designed to help you do well—together.
            </h1>
            <h3
              className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-center"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}
            >
              Join Our Community Today
            </h3>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="flex flex-col items-center gap-4 px-4 sm:px-6 mt-10">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
          Why Choose AnyOneCanConnect?
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-justify max-w-4xl">
          At AnyOneCanConnect, we’ve reimagined freelancing to focus on what truly matters: trust,
          collaboration, and giving everyone the tools they need to succeed. Say goodbye to
          confusing fees and hidden costs—our platform is built on transparency.
        </p>
        <div className="flex flex-col md:flex-row justify-center mt-12 gap-6 w-full max-w-6xl">
          {[
            {
              title: 'Transparency',
              image: '/homeSecondLast.jpg',
              desc:
                'Tired of hidden fees? We show exactly what things cost—no nasty surprises. You keep all your money when freelancing—no percentage cuts or sneaky charges...',
            },
            {
              title: 'Seamless Collaboration',
              image: '/pexels-canvastudio-3277808.jpg',
              desc:
                'Freelancing often feels like a tug-of-war, but Next Connect changes that. Our tools make collaboration seamless...',
            },
          ].map((val, i) => (
            <div key={i} className="flex flex-col items-center gap-4 w-full md:w-1/2 px-2">
              <Image
                src={val.image}
                alt={val.title}
                width={500}
                height={350}
                className="w-full rounded-lg object-cover"
              />
              <h1 className="font-bold text-lg sm:text-xl">{val.title}</h1>
              <p className="text-sm sm:text-base text-justify">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Offering
