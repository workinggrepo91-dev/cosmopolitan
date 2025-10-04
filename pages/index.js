import Link from 'next/link'
// Consider using an icon library like 'react-icons' for professional icons
// import { FaUniversity, FaPeopleCarry, FaLightbulb } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ======================================= */}
      {/* Navigation Bar                        */}
      {/* ======================================= */}
       <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary-700">
            <Link href="/">Global Support Funds</Link>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-gray-600">
            <Link href="#about" className="hover:text-primary-600 transition">About</Link>
            <Link href="#impact" className="hover:text-primary-600 transition">Impact</Link>
            <Link href="#testimonials" className="hover:text-primary-600 transition">Stories</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-primary-600 font-semibold hover:text-primary-700 transition">
              Login
            </Link>
            <Link href="/register" className="bg-primary-600 text-white px-5 py-2 rounded-lg hover:bg-primary-700 transition">
              Apply Now
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* ======================================= */}
        {/* Hero Section                          */}
        {/* ======================================= */}
        <section className="relative text-white text-center py-20 md:py-32">
          {/* IMAGE PLACEHOLDER: Replace this div with a Next.js <Image> component for your hero background */}
          <div className="absolute inset-0 bg-primary-700 opacity-80"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069')" /* Replace with your image URL */ }}
          ></div>
          {/* End of IMAGE PLACEHOLDER */}
          
          <div className="relative container mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
              Empowering Global Change, One Grant at a Time
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              We provide the essential funding that transforms innovative ideas into impactful realities for communities worldwide.
            </p>
            <Link href="/register" className="bg-white text-primary-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition text-lg">
              Start Your Application
            </Link>
          </div>
        </section>

        {/* ======================================= */}
        {/* About Us / Our Mission Section        */}
        {/* ======================================= */}
        <section id="about" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary-700 mb-4">Our Mission: Fueling a Better Future</h2>
              <p className="text-gray-700 mb-4 text-lg">
                At Cosmopolitant Grant Program, our core mission is to identify and support individuals and organizations with groundbreaking ideas. We believe that with the right resources, passionate people can solve the world’s most pressing challenges.
              </p>
              <p className="text-gray-700">
                From fostering education in underserved areas to backing sustainable entrepreneurship, we are committed to creating a ripple effect of positive change that lasts for generations.
              </p>
            </div>
            {/* IMAGE PLACEHOLDER */}
            <div className="bg-gray-200 h-80 rounded-lg shadow-lg flex items-center justify-center">
              <p className="text-gray-500"></p>
            </div>
            {/* End of IMAGE PLACEHOLDER */}
          </div>
        </section>

         {/* ======================================= */}
        {/* Our Impact Section (Enhanced)         */}
        {/* ======================================= */}
<section id="impact" className="py-16 md:py-24 bg-gray-100">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-primary-700 mb-2">Where We Make a Difference</h2>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">We focus our support on key areas fundamental to building strong, self-sufficient, and innovative communities.</p>
            {/* CORRECTED GRID: This now creates a 2x2 grid on medium screens and up */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Card 1: Education */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="text-5xl text-primary-600 mx-auto mb-4">🎓</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Education & Literacy</h3>
                <p className="text-gray-600">Unlocking potential through scholarships, school resources, and literacy programs.</p>
              </div>
              {/* Card 2: Community */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="text-5xl text-primary-600 mx-auto mb-4">👨‍👩‍👧‍👦</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Empowerment</h3>
                <p className="text-gray-600">Funding local projects that improve infrastructure, health, and social well-being.</p>
              </div>
              {/* Card 3: Supporting Farmers */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="text-5xl text-primary-600 mx-auto mb-4">🌱</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Supporting Farmers</h3>
                <p className="text-gray-600">Empowering agricultural communities with tools and training for sustainable farming.</p>
              </div>
              {/* Card 4: Innovators in Tech */}
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="text-5xl text-primary-600 mx-auto mb-4">💡</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Innovators in Tech</h3>
                <p className="text-gray-600">Backing tech entrepreneurs who are building solutions for a better tomorrow.</p>
              </div>
            </div>
          </div>
        </section>


        {/* ======================================= */}
        {/* Success Stories (Enhanced)            */}
        {/* ======================================= */}
        <section id="testimonials" className="py-16 md:py-24 bg-primary-600 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-12">Success Stories from Our Grantees</h2>
            {/* CORRECTED GRID: This also creates a 2x2 grid on medium screens and up */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Testimonial 1 */}
              <div className="bg-white text-gray-700 p-6 rounded-lg shadow-lg">
                <img className="w-20 h-20 rounded-full mx-auto mb-4 -mt-12 border-4 border-white object-cover" src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=1974" alt="Maria S." />
                <p className="italic mb-4">"Their grant allowed me to build a computer lab for children in my village, opening up a new world of opportunity for them."</p>
                <p className="font-bold text-primary-700">Maria S.</p>
                <p className="text-sm text-gray-500">Founder, 'Tech for Tots'</p>
              </div>
              {/* Testimonial 2 */}
              <div className="bg-white text-gray-700 p-6 rounded-lg shadow-lg">
                <img className="w-20 h-20 rounded-full mx-auto mb-4 -mt-12 border-4 border-white object-cover" src="https://images.unsplash.com/photo-1627541593552-a54ebb45610b?q=80&w=1974" alt="John K." />
                <p className="italic mb-4">"The training in sustainable farming practices has doubled our crop yield. My family and my community are grateful."</p>
                <p className="font-bold text-primary-700">John K.</p>
                <p className="text-sm text-gray-500">Co-op Farmer, Ghana</p>
              </div>
              {/* Testimonial 3 */}
              <div className="bg-white text-gray-700 p-6 rounded-lg shadow-lg">
                <img className="w-20 h-20 rounded-full mx-auto mb-4 -mt-12 border-4 border-white object-cover" src="https://images.unsplash.com/photo-1541250848049-b9f71362cb77?q=80&w=1974" alt="Aisha B." />
                <p className="italic mb-4">"As a first-time entrepreneur, securing funding felt impossible. Global Support Funds gave me the seed money to launch my eco-friendly business."</p>
                <p className="font-bold text-primary-700">Aisha B.</p>
                <p className="text-sm text-gray-500">CEO, 'GreenBox'</p>
              </div>
              {/* Testimonial 4 */}
              <div className="bg-white text-gray-700 p-6 rounded-lg shadow-lg">
                <img className="w-20 h-20 rounded-full mx-auto mb-4 -mt-12 border-4 border-white object-cover" src="https://images.unsplash.com/photo-1622253692010-33352f4568d2?q=80&w=1974" alt="Dr. Chen" />
                <p className="italic mb-4">"With this funding, our mobile health clinic can now reach remote villages, providing essential medical care to those who need it most."</p>
                <p className="font-bold text-primary-700">Dr. Chen</p>
                <p className="text-sm text-gray-500">Health Outreach Project</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* ======================================= */}
        {/* Footer                                */}
        {/* ======================================= */}
        <footer className="bg-gray-800 text-white">
          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Column 1: About */}
              <div>
                <h3 className="font-bold text-xl mb-4">Cosmopolitant Grant Program</h3>
                <p className="text-gray-400">Committed to empowering communities and fostering innovation worldwide.</p>
              </div>
              {/* Column 2: Quick Links */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="#about" className="text-gray-400 hover:text-white">About Us</Link></li>
                  <li><Link href="/register" className="text-gray-400 hover:text-white">Apply for a Grant</Link></li>
                  <li><Link href="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                </ul>
              </div>
              {/* Column 3: Follow Us */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
                 <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white">[LinkedIn]</a>
                  <a href="#" className="text-gray-400 hover:text-white">[Twitter]</a>
                  <a href="#" className="text-gray-400 hover:text-white">[Facebook]</a>
                </div>
              </div>
              {/* Column 4: Newsletter */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
                <p className="text-gray-400 mb-2">Subscribe to our newsletter for the latest news and funding opportunities.</p>
                <form className="flex">
                  <input type="email" className="w-full rounded-l-lg p-2 text-gray-800" placeholder="your.email@example.com" />
                  <button type="submit" className="bg-primary-600 px-4 rounded-r-lg hover:bg-primary-700">Go</button>
                </form>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
              © {new Date().getFullYear()} Cosmopolitant Grant Program. All Rights Reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}