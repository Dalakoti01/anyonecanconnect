import Image from 'next/image'
import Link from 'next/link'
import GuestNavbar from '../shared/GuestNavbar'
import { Button } from '../ui/button'

const Offering = () => {
  return (
    <div className="w-full">
      <div className="relative h-[85vh]">
        {/* Background Image for the top of the page */}
        <div className="absolute top-0 left-0 w-full h-[80%]">
          <Image
            src="/pexels-fauxels-3184357.jpg"
            alt="Offerings Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-80"></div>

          <div className="relative pt-7 px-5 md:px-10">
            <GuestNavbar />
            <div className="flex items-center justify-center h-[50vh]">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FCFCFC] text-center leading-tight">
                OUR OFFERINGS <br />
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-5 px-5">
        <div className="text-center text-[#263238] text-3xl md:text-4xl lg:text-5xl font-bold">
          <h1>Explore Our Key Offerings</h1>
        </div>
        <div className="text-center text-sm md:text-base lg:text-xl">
          <p className="px-12">
            Discover how AnyOneCanConnect simplifies freelancing while creating
            opportunities for growth and meaningful connections. We’re redefining
            the way freelancers and clients work together — no hidden fees, no
            competition, just genuine support.
          </p>
        </div>
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
          className={`flex flex-col ${item.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} justify-center items-center gap-10 lg:gap-24 w-full mt-12 px-5`}
        >
          <div className="px-20 flex flex-col lg:flex-row items-center gap-20">
            <Image
              src={item.image}
              alt={item.title}
              width={500}
              height={400}
              className="w-full max-w-sm rounded-md lg:max-w-lg"
            />
            <div className="text-center lg:text-left flex flex-col max-w-md gap-10">
              <h1 className="font-bold text-2xl">
                <span className="text-blue-500 mr-5">{item.number}</span> {item.title}
              </h1>
              <p className="text-justify">{item.text}</p>
              <Link href="/signup">
                <Button className="bg-[rgb(33,100,243)] text-sm md:text-lg px-5 md:px-7 py-3 md:py-5 font-bold hover:bg-white hover:text-black">
                  {item.button}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Quote Section */}
      <div className="relative h-[50vh] mt-20">
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            src="/pexels-canvastudio-3277808.jpg"
            alt="Quote"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 flex justify-center items-center h-full">
            <div className="flex flex-col gap-7">
              <h1
                className="text-[#FCFCFC] text-xl md:text-2xl lg:text-3xl font-bold text-center px-12"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)' }}
              >
                Take the next step in your freelancing journey with Direct
                Connect. Whether you’re a client or a freelancer, our platform is designed
                to help you do well—together.
              </h1>
              <h3
                className="text-[#FCFCFC] text-lg md:text-xl lg:text-2xl font-bold text-center"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)' }}
              >
                Join Our Community Today
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="flex flex-col justify-center items-center gap-3 px-9 mt-10">
        <h1 className="font-bold text-5xl text-center">Why Choose AnyOneCanConnect?</h1>
        <p className="text-lg text-justify">
          At AnyOneCanConnect, we’ve reimagined freelancing to focus on what truly
          matters: trust, collaboration, and giving everyone the tools they need
          to succeed. Say goodbye to confusing fees and hidden costs—our
          platform is built on transparency.
        </p>
        <div className="flex flex-col md:flex-row justify-center mt-12 gap-6">
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
            <div key={i} className="flex flex-col justify-center items-center gap-4 w-full md:w-1/2 px-4">
              <Image
                src={val.image}
                alt={val.title}
                width={500}
                height={350}
                className="w-full max-w-md object-cover rounded-lg"
              />
              <h1 className="font-bold text-xl">{val.title}</h1>
              <p className="text-justify">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Offering
