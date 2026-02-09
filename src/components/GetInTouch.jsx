import { Phone, Mail, MapPin } from "lucide-react";

export default function GetInTouch() {
  return (
    <section className="w-full bg-[#fffaf5] py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-2">
        
        {/* LEFT CONTENT */}
        <div>
          <span className="inline-block text-xs font-semibold text-orange-500 bg-orange-100 px-4 py-1 rounded-full mb-4">
            GET IN TOUCH
          </span>

          <h2 className="text-4xl font-semibold leading-tight">
            Let's Start a <br />
            <span className="text-orange-500">Conversation</span>
          </h2>

          <p className="text-gray-500 text-sm mt-4 max-w-md">
            Have questions? We're here to help. Reach out to us and our team
            will get back to you shortly.
          </p>

          {/* Contact Info */}
          <div className="mt-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold">Call Us</p>
                <p className="text-sm text-gray-500">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold">Email Us</p>
                <p className="text-sm text-gray-500">hello@sportslover.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold">Visit Us</p>
                <p className="text-sm text-gray-500">
                  Bhubaneswar, Odisha, India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <form className="space-y-5">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-orange-500"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:border-orange-500"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full border border-gray-200 rounded-2xl px-5 py-3 text-sm resize-none focus:outline-none focus:border-orange-500"
            />

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-full text-sm hover:bg-gray-900 transition"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
