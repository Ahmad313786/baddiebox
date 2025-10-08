import React, { useState } from 'react'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for contacting BaddieBox! We will reach out soon.')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="bg-black min-h-screen mt-10">
      {/* Header */}
      <div className="text-3xl md:text-4xl text-center pt-10 border-t border-gray-700 text-pink-600 font-bold tracking-widest">
        CONTACT <span className="text-white">US</span>
      </div>

      {/* Content */}
      <div className="mt-10 flex flex-col justify-center items-center gap-10 px-6 md:px-16 pb-16">
        {/* Store Info */}
        <div className="flex flex-col items-start justify-center gap-8 w-full md:max-w-2xl">
          <div>
            <p className="font-semibold text-xl text-pink-600">Our Store</p>
            <p className="text-gray-300 mt-2">
              BaddieBox HQ <br />
              22 Fashion Street, Karachi, Pakistan
            </p>
            <p className="text-gray-300 mt-2">
              Tel: +92 324 7316502 <br />
              Email: ah2319655@gmail.com
            </p>
          </div>

          {/* Careers */}
          <div>
            <p className="font-semibold text-xl text-pink-600">Careers at BaddieBox</p>
            <p className="text-gray-300 mt-2">
              Join our growing team and shape the future of fashion.
            </p>
            <button className="mt-3 border border-pink-600 px-8 py-3 text-sm text-pink-600 hover:bg-pink-600 hover:text-black transition-all duration-500 rounded">
              Explore Jobs
            </button>
          </div>

          {/* Contact Form */}
          <div className="w-full mt-6">
            <p className="font-semibold text-xl text-pink-600 mb-4">Get in Touch</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                className="w-full px-4 py-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
              <input
                className="w-full px-4 py-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
              <textarea
                className="w-full px-4 py-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="4"
                required
              />
              <button
                type="submit"
                className="bg-pink-600 text-black font-semibold py-3 px-8 rounded hover:bg-pink-700 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
