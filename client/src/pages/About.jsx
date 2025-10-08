import React from 'react'

const About = () => {
  return (
    <div className="bg-black min-h-screen text-gray-300 mt-10">
      {/* Header */}
      <div className="text-3xl md:text-4xl text-center pt-10 border-t border-gray-700 text-pink-600 font-bold tracking-widest">
        ABOUT <span className="text-white">BADDIEBOX</span>
      </div>

      {/* Main Content */}
      <div className="mt-10 px-6 md:px-20 flex flex-col items-center gap-12 pb-16">
        {/* Intro Text */}
        <div className="max-w-3xl text-center space-y-6">
          <p className="text-lg leading-relaxed">
            Welcome to <span className="text-pink-500 font-semibold">BaddieBox</span> —  
            your one-stop shop for all things <span className="text-pink-400">cute, chic, and classy</span>.  
            We believe every girl deserves a little sparkle in her life, and our curated
            gift boxes are designed to bring joy, confidence, and a dash of pink magic
            to your everyday moments.
          </p>
          <p className="text-lg leading-relaxed">
            From stylish <span className="text-pink-400">hair pins</span> and adorable
            <span className="text-pink-400"> nail cutters</span> to
            <span className="text-pink-400"> self-care goodies</span> and surprise trinkets,
            every BaddieBox is packed with love and trendy treasures that make the
            perfect gift—for yourself or someone special.
          </p>
        </div>

        {/* Brand Highlights */}
        <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl text-center">
          <div className="border border-pink-600 rounded-xl p-6 hover:bg-pink-600 hover:text-black transition-all duration-500">
            <h3 className="text-xl font-semibold mb-3 text-pink-500">✨ Cute & Curated</h3>
            <p>
              Each box is thoughtfully packed with girly must-haves to brighten your day.
            </p>
          </div>
          <div className="border border-pink-600 rounded-xl p-6 hover:bg-pink-600 hover:text-black transition-all duration-500">
            <h3 className="text-xl font-semibold mb-3 text-pink-500">🎁 Perfect for Gifting</h3>
            <p>
              Whether it’s a birthday, bridal shower, or just because—
              our boxes make every occasion special.
            </p>
          </div>
          <div className="border border-pink-600 rounded-xl p-6 hover:bg-pink-600 hover:text-black transition-all duration-500">
            <h3 className="text-xl font-semibold mb-3 text-pink-500">💖 For Every Baddie</h3>
            <p>
              We celebrate individuality and confidence.
              There’s a BaddieBox for every mood and style.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-3xl text-center mt-10 space-y-4">
          <p className="text-xl text-pink-400 font-semibold">
            Our Mission
          </p>
          <p className="leading-relaxed">
            At BaddieBox, we aim to spread happiness one box at a time.  
            Our mission is to make gifting effortless and exciting by providing
            high-quality, affordable, and Instagram-worthy goodies that bring a smile
            to every face.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10">
          <button className="bg-pink-600 text-black font-semibold py-3 px-10 rounded-full hover:bg-pink-700 transition-all duration-300">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default About
