import React from "react";
import { Link } from "react-router-dom";

/*
=========================================================
HostelKart – Student Essentials Platform
Landing Page (Professional / Apple-like)
Tech: React + Tailwind CSS
=========================================================
*/

const Landing = () => {
  return (
    <div className="text-gray-900 bg-white">

     {/* ======================================================
    NAVBAR (REFINED – LOGO TYPE + BETTER HOVERS)
   ====================================================== */}
<nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-black/5">
  <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">

    {/* BRAND / LOGO-TYPE */}
    <div className="text-xl tracking-tight select-none">
      <span className="font-semibold text-black">Hostel</span>
      <span className="font-light text-black/80 ml-1">Hungry</span>
    </div>

    {/* NAV LINKS */}
    <div className="hidden md:flex items-center gap-10 mx-auto text-sm text-black/60">
      {[
        { label: "Platform", id: "platform" },
        { label: "Categories", id: "categories" },
        { label: "How it works", id: "how" },
        { label: "Testimonials", id: "testimonials" },
      ].map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="relative group py-1 transition-colors duration-300 hover:text-black"
        >
          {item.label}

          {/* clean underline animation */}
          <span
            className="absolute left-1/2 -bottom-1 h-[1px] w-0 bg-black
                       transition-all duration-300 ease-out
                       group-hover:w-full group-hover:left-0"
          />
        </a>
      ))}
    </div>

    {/* ACTION BUTTONS */}
    <div className="flex items-center gap-4 ml-auto text-sm">

      {/* Sign in – underline on hover */}
      <a
        href="/signin"
        className="relative font-medium text-black/70
                   transition-colors duration-300
                   hover:text-black
                   after:absolute after:left-0 after:-bottom-1
                   after:h-[1px] after:w-0 after:bg-black
                   after:transition-all after:duration-300
                   hover:after:w-full"
      >
        Sign in
      </a>

      {/* Get started – inverted hover */}
      <a
        href="/signup"
        className="px-5 py-2 rounded-full font-medium
                   border border-black
                   transition-all duration-300
                   hover:bg-black hover:text-white"
      >
        Get started
      </a>

    </div>

  </div>
</nav>
{/* ================= HERO SECTION ================= */}
<section className="relative h-screen w-full flex items-center justify-center bg-gray-900">
  
  {/* subtle gradient overlay (Apple feel) */}
  <div className="absolute inset-0 bg-gradient-to-b from-gray-500 to-gray-600"></div>

  {/* CONTENT */}
  <div className="relative z-10 max-w-4xl mx-auto px-6 text-center animate-fade-up">
    <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white leading-tight">
      Everything a <br />
      <span className="text-white/80">
        college student needs.
      </span>
    </h1>

    <p className="mt-6 text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
      Hostel Hungry is a student-first platform that helps you manage
      food, daily essentials, stationery, groceries, and campus services —
      all in one simple experience.
    </p>

    <div className="mt-10 flex justify-center gap-5">
      <a
        href="/signup"
        className="px-8 py-3 rounded-full bg-white text-black
                   font-medium transition-all duration-300
                   hover:bg-white/80"
      >
        Get started
      </a>

      <a
        href="#platform"
        className="px-8 py-3 rounded-full border border-white text-white
                   transition-all duration-300
                   hover:bg-white hover:text-black"
      >
        Learn more
      </a>
    </div>

    <p className="mt-10 text-sm text-white/50">
      Trusted by students across multiple campuses
    </p>
  </div>

</section>


   {/* ================= PLATFORM SECTION ================= */}
<section
  id="platform"
  className="relative bg-white py-32"
>
  <div className="max-w-6xl mx-auto px-6">

    {/* HEADER */}
    <div className="max-w-3xl mx-auto text-center animate-fade-up">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
        A single platform designed for hostel life.
      </h2>

      <p className="mt-6 text-lg text-gray-600">
        Hostel Hungry is built to simplify everyday life for college students
        by bringing essential products and services into one reliable,
        easy-to-use platform.
      </p>
    </div>

    {/* MAIN CONTENT */}
    <div className="mt-24 grid md:grid-cols-2 gap-20 items-start">

      {/* LEFT : PRODUCT STORY */}
      <div className="space-y-7 text-gray-700 leading-relaxed">
        <p>
          College life often means managing multiple daily needs —
          ordering food, purchasing essentials, arranging services,
          and coordinating deliveries — all while balancing academics
          and personal time.
        </p>

        <p>
          Hostel Hungry removes this friction by providing a centralized
          platform where students can discover nearby vendors, compare
          options, place orders, and track everything seamlessly.
        </p>

        <p>
          The platform is thoughtfully designed around hostel schedules,
          student budgets, and the realities of campus living — ensuring
          convenience without compromise.
        </p>
      </div>

      {/* RIGHT : CORE PILLARS */}
      <div className="grid grid-cols-1 gap-8">

        <div className="p-8 rounded-2xl border border-gray-200 hover-lift">
          <h4 className="text-lg font-medium text-gray-900">
            Built for students
          </h4>
          <p className="mt-3 text-gray-600">
            Every feature is designed keeping hostel routines,
            affordability, and student preferences in mind.
          </p>
        </div>

        <div className="p-8 rounded-2xl border border-gray-200 hover-lift">
          <h4 className="text-lg font-medium text-gray-900">
            Trusted local ecosystem
          </h4>
          <p className="mt-3 text-gray-600">
            Access verified kitchens, shops, and service providers
            located close to your campus.
          </p>
        </div>

        <div className="p-8 rounded-2xl border border-gray-200 hover-lift">
          <h4 className="text-lg font-medium text-gray-900">
            One account, complete control
          </h4>
          <p className="mt-3 text-gray-600">
            Manage orders, services, payments, and tracking
            from a single, unified account.
          </p>
        </div>

      </div>
    </div>

  </div>
</section>


     {/* ================= CATEGORIES SECTION ================= */}
<section
  id="categories"
  className="relative bg-gray-50 py-36"
>
  <div className="max-w-7xl mx-auto px-6">

    {/* HEADER */}
    <div className="max-w-3xl mx-auto text-center animate-fade-up">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
        Everything students use, every single day.
      </h2>

      <p className="mt-6 text-lg text-gray-600">
        Hostel Hungry brings together essential products and services
        that power everyday hostel and college life.
      </p>
    </div>

    {/* CATEGORY GRID */}
    <div className="mt-28 grid sm:grid-cols-2 lg:grid-cols-3 gap-12">

      {/* CARD 1 */}
      <div className="group p-10 rounded-3xl bg-white border border-gray-200 hover-lift">
        <div className="text-3xl mb-6">🍽️</div>
        <h3 className="text-xl font-medium text-gray-900">
          Food & Meals
        </h3>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Daily meals, snacks, night food, mess subscriptions,
          and affordable student meal plans.
        </p>
      </div>

      {/* CARD 2 */}
      <div className="group p-10 rounded-3xl bg-white border border-gray-200 hover-lift">
        <div className="text-3xl mb-6">🛒</div>
        <h3 className="text-xl font-medium text-gray-900">
          Daily Essentials
        </h3>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Groceries, toiletries, medicines, personal care,
          and everyday necessities for hostel living.
        </p>
      </div>

      {/* CARD 3 */}
      <div className="group p-10 rounded-3xl bg-white border border-gray-200 hover-lift">
        <div className="text-3xl mb-6">📚</div>
        <h3 className="text-xl font-medium text-gray-900">
          Stationery & Academics
        </h3>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Notebooks, books, lab supplies, printing services,
          and academic essentials.
        </p>
      </div>

      {/* CARD 4 */}
      <div className="group p-10 rounded-3xl bg-white border border-gray-200 hover-lift">
        <div className="text-3xl mb-6">🧺</div>
        <h3 className="text-xl font-medium text-gray-900">
          Laundry Services
        </h3>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Hassle-free laundry, ironing, and clothing care
          services near your hostel.
        </p>
      </div>

      {/* CARD 5 */}
      <div className="group p-10 rounded-3xl bg-white border border-gray-200 hover-lift">
        <div className="text-3xl mb-6">🧹</div>
        <h3 className="text-xl font-medium text-gray-900">
          Hostel Services
        </h3>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Room cleaning, maintenance, repairs,
          and other essential hostel services.
        </p>
      </div>

      {/* CARD 6 */}
      <div className="group p-10 rounded-3xl bg-white border border-gray-200 hover-lift">
        <div className="text-3xl mb-6">🔌</div>
        <h3 className="text-xl font-medium text-gray-900">
          Utilities & Support
        </h3>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Charging accessories, small electronics,
          and technical support essentials.
        </p>
      </div>

    </div>

    {/* FOOTNOTE */}
    <p className="mt-20 text-center text-sm text-gray-500">
      Categories are curated based on real student needs and campus availability.
    </p>

  </div>
</section>


     {/* ================= HOW IT WORKS SECTION ================= */}
<section
  id="how"
  className="relative bg-white py-36"
>
  <div className="max-w-6xl mx-auto px-6">

    {/* HEADER */}
    <div className="max-w-3xl mx-auto text-center animate-fade-up">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
        How Hostel Hungry works
      </h2>

      <p className="mt-6 text-lg text-gray-600">
        A simple, reliable process designed around hostel and college life.
      </p>
    </div>

    {/* STEPS */}
    <div className="mt-28 grid md:grid-cols-3 gap-16">

      {/* STEP 1 */}
      <div className="p-10 rounded-3xl border border-gray-200 hover-lift">
        <div className="text-sm text-gray-400 font-medium mb-4">
          STEP 01
        </div>
        <h3 className="text-xl font-medium text-gray-900">
          Create your account
        </h3>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Sign up using your college and hostel location to unlock
          nearby vendors, services, and student-friendly options.
        </p>
      </div>

      {/* STEP 2 */}
      <div className="p-10 rounded-3xl border border-gray-200 hover-lift">
        <div className="text-sm text-gray-400 font-medium mb-4">
          STEP 02
        </div>
        <h3 className="text-xl font-medium text-gray-900">
          Browse & place orders
        </h3>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Explore food, essentials, stationery, and services.
          Compare options and place orders in just a few clicks.
        </p>
      </div>

      {/* STEP 3 */}
      <div className="p-10 rounded-3xl border border-gray-200 hover-lift">
        <div className="text-sm text-gray-400 font-medium mb-4">
          STEP 03
        </div>
        <h3 className="text-xl font-medium text-gray-900">
          Track & receive
        </h3>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Track your order or service in real time and receive
          it directly at your hostel without any hassle.
        </p>
      </div>

    </div>

    {/* SUPPORTING LINE */}
    <p className="mt-24 text-center text-sm text-gray-500">
      Built to save time, reduce effort, and simplify everyday student life.
    </p>

  </div>
</section>


{/* ================= TESTIMONIALS ================= */}
<section id="testimonials" className="bg-gray-50 py-24 sm:py-32">
  <div className="max-w-5xl mx-auto px-4 sm:px-6">

    {/* Heading */}
    <div className="mb-16 text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900">
        What students say about Hostel Hungry
      </h2>
      <p className="mt-4 text-sm sm:text-base text-gray-600">
        Real feedback from students using Hostel Hungry in their everyday hostel life
      </p>
    </div>

    {/* Testimonial Stack */}
    <div className="space-y-10">

      {/* Testimonial 1 */}
      <div
        className="group bg-white border border-gray-200 rounded-2xl
                   p-6 sm:p-8 transition-all duration-300
                   hover:-translate-y-1 hover:shadow-lg"
      >
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          Hostel Hungry has genuinely simplified my hostel life.
          I no longer need multiple apps for food, groceries, and daily essentials.
          Everything is organised in one place, which saves a lot of time every day.
        </p>

        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-gray-900">Aman Kumar</p>
            <p className="text-xs sm:text-sm text-gray-500">NIT Patna</p>
          </div>

          <span className="mt-2 sm:mt-0 text-xs text-gray-400 group-hover:text-gray-500 transition">
            Hostel Student
          </span>
        </div>
      </div>

      {/* Testimonial 2 */}
      <div
        className="group bg-white border border-gray-200 rounded-2xl
                   p-6 sm:p-8 transition-all duration-300
                   hover:-translate-y-1 hover:shadow-lg"
      >
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          The platform feels very clean and thoughtfully designed.
          It clearly understands student needs and hostel routines.
          Using Hostel Hungry daily has made managing essentials much easier.
        </p>

        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-gray-900">Riya Sharma</p>
            <p className="text-xs sm:text-sm text-gray-500">IIT BHU</p>
          </div>

          <span className="mt-2 sm:mt-0 text-xs text-gray-400 group-hover:text-gray-500 transition">
            Engineering Student
          </span>
        </div>
      </div>

      {/* Testimonial 3 */}
      <div
        className="group bg-white border border-gray-200 rounded-2xl
                   p-6 sm:p-8 transition-all duration-300
                   hover:-translate-y-1 hover:shadow-lg"
      >
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          Hostel Hungry feels more like a daily utility than just another app.
          Everything works smoothly and the experience is reliable.
          It fits perfectly into everyday hostel life.
        </p>

        <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-gray-900">Sahil Verma</p>
            <p className="text-xs sm:text-sm text-gray-500">NIT Trichy</p>
          </div>

          <span className="mt-2 sm:mt-0 text-xs text-gray-400 group-hover:text-gray-500 transition">
            Final Year Student
          </span>
        </div>
      </div>

    </div>

  </div>
</section>
{/* ======================================================
    FOOTER
   ====================================================== */}
<footer className="bg-white border-t border-gray-200">
  <div className="max-w-6xl mx-auto px-6 py-20">

    {/* TOP CONTENT */}
    <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 text-sm text-gray-600">

      {/* BRAND + SOCIAL */}
      <div>
      <div className="text-xl tracking-tight select-none">
      <span className="font-semibold text-black">Hostel</span>
      <span className="font-light text-black/80 ml-1">Hungry</span>
      </div>

        {/* SOCIAL LINKS */}
        <div className="mt-6 flex gap-4 text-xl">
          <a
            href="#"
            className="transition hover:scale-110"
            aria-label="Instagram"
          >
            📷
          </a>
          <a
            href="#"
            className="transition hover:scale-110"
            aria-label="LinkedIn"
          >
            🔗
          </a>
          <a
            href="#"
            className="transition hover:scale-110"
            aria-label="GitHub"
          >
            🧑‍💻
          </a>
          <a
            href="#"
            className="transition hover:scale-110"
            aria-label="Twitter"
          >
            ✖️
          </a>
        </div>
      </div>

      {/* PLATFORM */}
      <div>
        <h4 className="font-medium text-gray-900 mb-4">
          Platform
        </h4>
        <ul className="space-y-2">
          <li className="hover:text-gray-900 cursor-pointer">Food & Meals</li>
          <li className="hover:text-gray-900 cursor-pointer">Daily Essentials</li>
          <li className="hover:text-gray-900 cursor-pointer">Stationery</li>
          <li className="hover:text-gray-900 cursor-pointer">Hostel Services</li>
        </ul>
      </div>

      {/* COMPANY */}
      <div>
        <h4 className="font-medium text-gray-900 mb-4">
          Company
        </h4>
        <ul className="space-y-2">
          <li className="hover:text-gray-900 cursor-pointer">About</li>
          <li className="hover:text-gray-900 cursor-pointer">Careers</li>
          <li className="hover:text-gray-900 cursor-pointer">Contact</li>
          <li className="hover:text-gray-900 cursor-pointer">Support</li>
        </ul>
      </div>

      {/* LEGAL */}
      <div>
        <h4 className="font-medium text-gray-900 mb-4">
          Legal
        </h4>
        <ul className="space-y-2">
          <li className="hover:text-gray-900 cursor-pointer">Privacy Policy</li>
          <li className="hover:text-gray-900 cursor-pointer">Terms of Service</li>
          <li className="hover:text-gray-900 cursor-pointer">Refund Policy</li>
        </ul>
      </div>

    </div>

    {/* DIVIDER */}
    <div className="my-12 h-px bg-gray-200"></div>

    {/* BOTTOM BAR */}
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between text-xs text-gray-500">
      <p>© 2026 Hostel Hungry. All rights reserved.</p>
      <p>Built for students. Designed with care.</p>
    </div>

  </div>
</footer>



    </div>
  );
};

export default Landing;
