import Image from "next/image";
import GuestNavbar from "../shared/GuestNavbar";

const About = () => {
  return (
    <div className="w-full">
      {/* Background Image Section with GuestNavbar */}
      <div className="relative w-full h-[70vh]">
  {/* Background image */}
  <Image
    src="/backgroundHome.jpg"
    alt="About Background"
    fill
    className="object-cover object-center"
    priority
  />

  {/* Dark overlay - ensure it stays below interactive elements */}
  <div className="absolute inset-0 bg-black opacity-80 z-10 pointer-events-none" />

  {/* Navbar on top - increased z-index and explicit positioning */}
  <div className="absolute top-0 left-0 right-0 z-50 pt-7 px-4 sm:px-6 md:px-10">
    <GuestNavbar />
  </div>

  {/* Centered heading - below navbar but above overlay */}
  <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#FCFCFC] text-center leading-tight">
      OUR STORY
    </h1>
  </div>
</div>

      {/* Content Section */}
      <div className="mt-10 flex flex-col w-full">
        <h1 className="text-center font-bold text-[#263238] text-lg sm:text-2xl md:text-4xl mt-6 sm:mt-10">
          Discover The Vision Behind AnyOneCanConnect
        </h1>
        <div className="py-5 px-5 sm:px-8 md:px-12 mt-8 w-full bg-[rgb(247,251,250)] border-s-black">
          <div className="flex flex-col md:flex-row justify-center gap-6 sm:gap-10 md:gap-16 lg:gap-24">
            {/* Image */}
            <div className="relative w-full h-64 sm:h-72 md:h-auto md:max-w-md lg:max-w-2xl">
              <Image
                src="/homeBottom.jpg"
                alt="Vision Behind Next Connect"
                fill
                className="rounded-md object-cover cursor-pointer"
              />
            </div>
            {/* Text */}
            <div className="flex flex-col justify-center text-justify">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                Collaboration is the key to unlocking the potential of every
                great idea.
              </h1>
              <p className="mt-5 sm:mt-7 text-sm sm:text-base leading-relaxed">
                Founded on the principle of fair transactions, AnyOneCanConnect
                emerged from the need for a commission-free freelancing
                alternative. Our vision was clear: to empower freelancers with
                direct deals without hidden fees, transforming how they connect
                with clients.
              </p>
              <p className="mt-5 sm:mt-7 text-sm sm:text-base leading-relaxed">
                We have successfully served a diverse range of clients, from
                start-ups to established corporations, providing them with
                exceptional talent and reliable services. Our commitment to
                quality and transparency has earned us a loyal user base.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="bg-[rgb(228,243,239)]">
        <div className="px-5 sm:px-8 md:px-12 flex flex-col mt-10 items-center gap-6 sm:gap-8 py-10">
          <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-center">
            Our Core Values
          </h1>
          <p className="text-center text-base sm:text-lg md:text-xl font-bold max-w-4xl">
            The foundation of AnyOneCanConnect lies in the principles that guide
            everything we do. These values define our commitment to creating a
            better freelancing experience
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 w-full">
            {/* Integrity */}
            <div className="flex flex-col gap-3 text-center md:text-left">
              <h1 className="font-bold text-xl">Integrity</h1>
              <p className="text-sm sm:text-base text-justify leading-relaxed">
                At AnyOneCanConnect, honesty and transparency are at the heart
                of every interaction. We ensure every user—freelancer or
                client—feels secure, valued, and respected. Our no-commission
                policy reflects our commitment to fairness, creating a platform
                where everyone can focus on building genuine connections instead
                of worrying about hidden costs or unfair practices.
              </p>
            </div>
            {/* Empowerment */}
            <div className="flex flex-col gap-3 text-center md:text-left">
              <h1 className="font-bold text-xl">Empowerment</h1>
              <p className="text-sm sm:text-base text-justify leading-relaxed">
                Empowerment drives our mission. We aim to give freelancers the
                tools and opportunities to grow their careers without
                restrictions, while clients gain access to a pool of talented
                professionals who meet their needs. By fostering independence
                and self-confidence, we help you take charge of your freelancing
                journey and make informed decisions that shape your success.
              </p>
            </div>
            {/* Innovation */}
            <div className="flex flex-col gap-3 text-center md:text-left">
              <h1 className="font-bold text-xl">Innovation</h1>
              <p className="text-sm sm:text-base text-justify leading-relaxed">
                Continuous improvement is essential to staying relevant in the
                fast-changing freelance world. At AnyOneCanConnect, we are
                constantly refining our tools and services to meet your evolving
                needs. Whether it’s simplifying workflows or introducing new
                features, we are dedicated to helping freelancers and clients
                work smarter, faster, and with greater ease.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
