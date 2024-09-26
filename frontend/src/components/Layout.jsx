import React, { useState } from "react";
import ReactPlayer from "react-player";
import video from "../assets/test.mp4";
const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-blue-100 to-green-100">
      <main>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
  <div className="absolute inset-0 z-0">
    <video autoPlay loop muted className="w-full h-full object-cover">
      <source src={video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <div className="absolute inset-0 bg-black opacity-50"></div>
  </div>
  <div className="relative z-10 text-center text-white">
    <h2 className="text-6xl md:text-8xl font-bold mb-4 animate-fade-in-down">Discover Paradise</h2>
    <p className="text-xl md:text-2xl mb-8 animate-fade-in-up">Immerse yourself in the magic of Sri Lanka</p>
    <a href="#experiences" className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition duration-300 text-lg font-semibold animate-pulse">
      Start Your Journey
    </a>
  </div>
</section>

        <section id="experiences" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-orange-600 mb-12">
              Unforgettable Experiences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Ancient Wonders",
                  image: "/api/placeholder/600/400",
                  description: "Explore millennia-old ruins and temples",
                },
                {
                  title: "Tropical Beaches",
                  image: "/api/placeholder/600/400",
                  description: "Relax on pristine golden sand beaches",
                },
                {
                  title: "Wildlife Safaris",
                  image: "/api/placeholder/600/400",
                  description:
                    "Encounter exotic animals in their natural habitats",
                },
              ].map((experience, index) => (
                <div
                  key={experience.title}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
                >
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-orange-600 mb-2">
                      {experience.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {experience.description}
                    </p>
                    <a
                      href="#book-now"
                      className="inline-block text-black px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                      style={{ backgroundColor: "#fdba74" }}
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="culture" className="py-20 bg-orange-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-blue-600 mb-12">
              Rich Cultural Heritage
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
              <div className="w-full md:w-1/2">
                <img
                  src="/api/placeholder/800/600"
                  alt="Sri Lankan Culture"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <p className="text-lg text-gray-700">
                  Immerse yourself in the vibrant tapestry of Sri Lankan
                  culture, from ancient traditions to modern festivities.
                </p>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Visit UNESCO World Heritage Sites</li>
                  <li>Experience colorful festivals</li>
                  <li>Learn traditional arts and crafts</li>
                  <li>Savor authentic Sri Lankan cuisine</li>
                </ul>
                <a
                  href="#book-now"
                  className="inline-block bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 text-lg font-semibold mt-4"
                >
                  Explore Cultural Tours
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="nature"
          className="py-20 "
          style={{ backgroundColor: "#fdba74" }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-orange-600 mb-12">
              Breathtaking Nature
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                "Lush Rainforests",
                "Misty Mountains",
                "Serene Beaches",
                "Diverse Wildlife",
              ].map((item, index) => (
                <div
                  key={item}
                  className="bg-white rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition duration-300"
                >
                  <div className="text-5xl mb-4">
                    {["🌿", "⛰️", "🏖️", "🐘"][index]}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {item}
                  </h3>
                  <p className="text-gray-600">
                    Experience the natural wonders of Sri Lanka
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Layout;
