// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { 
//   FaArrowRight, FaPizzaSlice, FaBook, FaTruck, 
//   FaStar, FaPlus, FaMinus, FaStore, FaClock, FaCheckCircle, FaShieldAlt 
// } from "react-icons/fa";

// const Landing = () => {
//   const [activeFaq, setActiveFaq] = useState(null);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
    
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add("reveal-visible");
//         }
//       });
//     }, { threshold: 0.1 });

//     document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       observer.disconnect();
//     };
//   }, []);

//   return (
//     <div className="bg-white text-gray-900 selection:bg-black selection:text-white overflow-x-hidden">
      
//       {/* ================= 1. NAVIGATION ================= */}
//       <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
//         isScrolled ? "bg-white/90 backdrop-blur-md py-4 border-b border-gray-100" : "bg-transparent py-8"
//       }`}>
//         <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
//           {/* NEW TEXT-ONLY PREMIUM LOGO */}
//           <div className="flex flex-col leading-[0.85] cursor-pointer group">
//               <span className="font-black text-2xl tracking-tighter text-black">HOSTEL</span>
//               <span className="text-[11px] font-bold text-gray-400 tracking-[0.4em] uppercase ml-0.5 group-hover:text-black transition-colors">HUNGRY</span>
//           </div>

//           <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-widest text-gray-400">
//             {["Platform", "Categories", "How it Works", "Testimonials"].map((item) => (
//               <a key={item} href={`#${item.toLowerCase().replace(/\s/g, "")}`} className="hover:text-black transition-colors relative group">
//                 {item}
//                 <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover:w-full"></span>
//               </a>
//             ))}
//           </div>

//           <div className="flex items-center gap-6">
//             <Link to="/signin" className="hidden sm:block text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition">Log In</Link>
//             <Link to="/signup" className="px-7 py-3 bg-black text-white rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg shadow-black/10">
//               Get Started
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* ================= 2. HERO SECTION ================= */}
//       <section className="relative min-h-screen flex items-center pt-20 bg-[#fbfbfd]">
//         <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
//           <div className="reveal">
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white border border-gray-100 shadow-sm text-[10px] font-bold text-gray-400 uppercase tracking-widest">
//               <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
//               Serving 12+ Universities Nationwide
//             </div>
//             <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter leading-[0.85] mb-8 text-black">
//               Smart campus <br /> 
//               <span className="text-gray-300 italic font-medium">living.</span>
//             </h1>
//             <p className="text-xl text-gray-500 max-w-md mb-12 leading-relaxed font-light">
//               Stop compromising on your campus experience. From 2 AM cravings to last-minute assignment prints, we bridge the gap between your hostel and campus vendors.
//             </p>
//             <div className="flex flex-wrap gap-5">
//               <Link to="/signup" className="group px-10 py-5 bg-black text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-gray-800 transition-all duration-300">
//                 Start Your First Order <FaArrowRight className="group-hover:translate-x-2 transition-transform text-sm" />
//               </Link>
//             </div>
//           </div>

//           {/* Hero Visual */}
//           <div className="relative reveal hidden lg:block">
//             <div className="w-full aspect-[4/5] rounded-[3rem] bg-white shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-gray-100 p-12 flex flex-col justify-between hover-lift">
//               <div className="flex justify-between items-center border-b border-gray-50 pb-8">
//                 <div>
//                   <h4 className="font-black text-xl tracking-tighter">HOSTEL</h4>
//                   <p className="text-[10px] font-bold text-gray-300 tracking-[0.3em]">DASHBOARD</p>
//                 </div>
//                 <div className="px-4 py-2 bg-gray-50 rounded-full text-[10px] font-bold text-green-600">ONLINE</div>
//               </div>

//               <div className="space-y-6">
//                 <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 flex items-center gap-5 transition-all hover:bg-white hover:shadow-xl">
//                   <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center text-2xl">🍕</div>
//                   <div>
//                     <h5 className="font-bold text-sm">Spicy Paneer Maggi</h5>
//                     <p className="text-[10px] text-gray-400 font-medium">Coming from VC Canteen • 4 mins away</p>
//                   </div>
//                 </div>
//                 <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 flex items-center gap-5 transition-all hover:bg-white hover:shadow-xl opacity-60">
//                   <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center text-2xl">📑</div>
//                   <div>
//                     <h5 className="font-bold text-sm">Lab Report #4 (Printed)</h5>
//                     <p className="text-[10px] text-gray-400 font-medium">Ready at Central Library Hub</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="pt-8 border-t border-gray-50 flex justify-between items-center">
//                 <span className="text-xs font-bold text-gray-300">WALLET BALANCE</span>
//                 <span className="font-black text-xl">₹420.50</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ================= 3. HOW IT WORKS ================= */}
//       <section id="howitworks" className="py-40 bg-white">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="reveal flex flex-col items-center text-center mb-28">
//             <span className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-300 mb-4">The Process</span>
//             <h2 className="text-5xl font-extrabold tracking-tight text-black">Simple. Fast. Campus-Ready.</h2>
//           </div>
          
//           <div className="grid md:grid-cols-3 gap-20">
//             {[
//               { icon: <FaStore />, title: "Digital Menu", desc: "Browse every canteen, stationery shop, and pharmacy operating within your campus walls in real-time." },
//               { icon: <FaClock />, title: "Priority Delivery", desc: "Our student-runners know every shortcut, ensuring your order beats the rush and arrives in under 15 minutes." },
//               { icon: <FaShieldAlt />, title: "Secure Drop", desc: "Verified delivery to your specific hostel gate or common area with OTP-based secure handovers." }
//             ].map((step, i) => (
//               <div key={i} className="reveal group" style={{ transitionDelay: `${i * 150}ms` }}>
//                 <div className="text-5xl text-gray-100 font-black mb-4 group-hover:text-gray-200 transition-colors">0{i+1}</div>
//                 <h3 className="text-2xl font-bold mb-5 tracking-tight">{step.title}</h3>
//                 <p className="text-gray-500 text-sm leading-relaxed font-light">{step.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ================= 4. CATEGORIES ================= */}
//       <section id="categories" className="py-40 bg-black text-white rounded-[4rem] mx-4 mb-10">
//         <div className="max-w-7xl mx-auto px-10">
//           <div className="reveal mb-24 max-w-2xl">
//             <h2 className="text-6xl font-black tracking-tighter mb-8 leading-none">Built for the <br /> <span className="text-gray-600">Student Grind.</span></h2>
//             <p className="text-gray-400 text-lg font-light">Whether it's a 3 AM study session or a 9 AM lab class, we've got the essentials covered.</p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[
//               { title: "The Canteen", desc: "Everything from late-night Maggi to full meals.", tag: "FOOD" },
//               { title: "The Print Shop", desc: "Upload PDFs and get prints delivered to your room.", tag: "STUDY" },
//               { title: "The Mart", desc: "Sanitary pads, soaps, and room essentials.", tag: "DAILY" },
//             ].map((cat, i) => (
//               <div key={i} className="reveal p-12 rounded-[3rem] bg-[#111] border border-white/5 hover:border-white/20 transition-all cursor-pointer group">
//                 <span className="text-[10px] font-bold tracking-[0.3em] text-gray-500 group-hover:text-white transition-colors">{cat.tag}</span>
//                 <h3 className="text-3xl font-bold mt-4 mb-4">{cat.title}</h3>
//                 <p className="text-gray-500 text-sm font-light leading-relaxed">{cat.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
// {/* ================= 5. TESTIMONIALS (Premium Apple Card Style) ================= */}
//       <section id="testimonials" className="py-40 bg-white">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="reveal text-center mb-24">
//             <span className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-300 mb-4 block">Voices of the Campus</span>
//             <h2 className="text-5xl font-extrabold tracking-tight text-black">Trusted by the community.</h2>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               { 
//                 name: "Aman Sharma", 
//                 college: "NIT Patna", 
//                 text: "The midnight Maggi delivery is a total life-saver during end-sems. I don't have to worry about the canteen being closed anymore.",
//                 tag: "Fastest Delivery"
//               },
//               { 
//                 name: "Riya Kapoor", 
//                 college: "IIT Delhi", 
//                 text: "Printing lab manuals used to take an hour of standing in line. Now I just upload my PDF and it's at my hostel gate in minutes.",
//                 tag: "Game Changer"
//               },
//               { 
//                 name: "Sahil Varma", 
//                 college: "BITS Pilani", 
//                 text: "The unified payment system is so smooth. I can track my monthly expenses on food and stationery all in one dashboard.",
//                 tag: "Super Convenient"
//               }
//             ].map((t, i) => (
//               <div key={i} className="reveal group p-10 rounded-[2.5rem] bg-[#fbfbfd] border border-gray-100 flex flex-col justify-between hover:bg-white hover:shadow-[0_30px_60px_rgba(0,0,0,0.04)] transition-all duration-500" style={{ transitionDelay: `${i * 150}ms` }}>
//                 <div>
//                   <div className="flex gap-1 text-black mb-6">
//                     {[1, 2, 3, 4, 5].map(s => <FaStar key={s} size={10} />)}
//                   </div>
//                   <span className="inline-block px-3 py-1 rounded-full bg-white border border-gray-100 text-[9px] font-black uppercase tracking-widest text-gray-400 mb-6 group-hover:border-black group-hover:text-black transition-colors">
//                     {t.tag}
//                   </span>
//                   <p className="text-gray-600 text-lg font-light leading-relaxed mb-12">"{t.text}"</p>
//                 </div>
                
//                 <div className="flex items-center gap-4 border-t border-gray-100 pt-8">
//                   <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-black/20">
//                     {t.name[0]}
//                   </div>
//                   <div>
//                     <h5 className="font-bold text-sm text-black">{t.name}</h5>
//                     <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mt-1">{t.college}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ================= 7. ENHANCED FOOTER ================= */}
//       <footer className="bg-[#fbfbfd] border-t border-gray-100 pt-32 pb-16">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
            
//             {/* Brand Column */}
//             <div className="md:col-span-5 flex flex-col items-start">
//               <div className="flex flex-col leading-[0.85] mb-8 group cursor-pointer">
//                   <span className="font-black text-3xl tracking-tighter text-black">HOSTEL</span>
//                   <span className="text-[12px] font-bold text-gray-400 tracking-[0.4em] uppercase ml-0.5 group-hover:text-black transition-colors">HUNGRY</span>
//               </div>
//               <p className="text-gray-400 text-sm font-light leading-relaxed max-w-sm">
//                 Redefining the campus experience by connecting students with local vendors. Fast, reliable, and built for the student lifestyle.
//               </p>
//             </div>

//             {/* Links Columns */}
//             <div className="md:col-span-2 flex flex-col gap-6 text-center md:text-left">
//               <span className="text-[11px] font-black uppercase tracking-[0.3em] text-black">Platform</span>
//               <div className="flex flex-col gap-4 text-sm font-medium text-gray-400">
//                 <a href="#" className="hover:text-black transition-colors">Order Food</a>
//                 <a href="#" className="hover:text-black transition-colors">Print Hub</a>
//                 <a href="#" className="hover:text-black transition-colors">Stationery</a>
//               </div>
//             </div>

//             <div className="md:col-span-2 flex flex-col gap-6 text-center md:text-left">
//               <span className="text-[11px] font-black uppercase tracking-[0.3em] text-black">Company</span>
//               <div className="flex flex-col gap-4 text-sm font-medium text-gray-400">
//                 <a href="#" className="hover:text-black transition-colors">About Us</a>
//                 <a href="#" className="hover:text-black transition-colors">Merchants</a>
//                 <a href="#" className="hover:text-black transition-colors">Support</a>
//               </div>
//             </div>

//             <div className="md:col-span-3 flex flex-col gap-6">
//               <span className="text-[11px] font-black uppercase tracking-[0.3em] text-black">Newsletter</span>
//               <div className="relative">
//                 <input 
//                   type="email" 
//                   placeholder="Campus Email" 
//                   className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-xs outline-none focus:border-black transition-all"
//                 />
//                 <button className="absolute right-2 top-1.5 p-1.5 bg-black text-white rounded-lg hover:bg-gray-800 transition">
//                   <FaArrowRight size={12} />
//                 </button>
//               </div>
//             </div>
//           </div>
          
//           {/* Bottom Bar */}
//           <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
//             <div className="flex flex-wrap justify-center md:justify-start gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">
//               <span className="text-black italic">EST. 2026</span>
//               <a href="#" className="hover:text-black transition">Privacy</a>
//               <a href="#" className="hover:text-black transition">Terms</a>
//             </div>
//             <p className="text-[10px] font-bold text-gray-300 tracking-[0.3em] uppercase">
//               Designed for the next generation of students.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }; // <--- THIS WAS MISSING

// export default Landing;


//shamoel code 
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaArrowRight, FaStar, FaStore, FaClock, FaShieldAlt, FaBars, FaTimes 
} from "react-icons/fa";

const Landing = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-white text-gray-900 selection:bg-black selection:text-white overflow-x-hidden">
      
      {/* ================= NAVIGATION ================= */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled || isMenuOpen ? "bg-white/95 backdrop-blur-md py-4 border-b border-gray-100" : "bg-transparent py-6 lg:py-8"
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          <div className="flex flex-col leading-[0.85] cursor-pointer group z-[110]">
              <span className="font-black text-xl lg:text-2xl tracking-tighter text-black">HOSTEL</span>
              <span className="text-[9px] lg:text-[11px] font-bold text-gray-400 tracking-[0.4em] uppercase ml-0.5 group-hover:text-black transition-colors">HUNGRY</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-widest text-gray-400">
            {["Platform", "Categories", "How it Works", "Testimonials"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s/g, "")}`} className="hover:text-black transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <Link to="/signin" className="hidden sm:block text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-black transition">Log In</Link>
            <Link to="/signup" className="px-5 lg:px-7 py-2.5 lg:py-3 bg-black text-white rounded-full text-[10px] lg:text-[11px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg shadow-black/10">
              Get Started
            </Link>
            {/* Mobile Toggle */}
            <button className="md:hidden text-black z-[110]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center gap-8 transition-transform duration-500 md:hidden ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}>
            {["Platform", "Categories", "How it Works", "Testimonials"].map((item) => (
              <a key={item} onClick={() => setIsMenuOpen(false)} href={`#${item.toLowerCase().replace(/\s/g, "")}`} className="text-2xl font-black tracking-tighter uppercase">
                {item}
              </a>
            ))}
            <Link to="/signin" onClick={() => setIsMenuOpen(false)} className="text-gray-400 font-bold tracking-widest uppercase text-sm">Log In</Link>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      {/* ================= 2. HERO SECTION ================= */}
<section className="relative min-h-screen flex items-center pt-20 bg-[#fbfbfd]">
  <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
    <div className="reveal">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white border border-gray-100 shadow-sm text-[10px] font-bold text-gray-400 uppercase tracking-widest">
        <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
        Serving 12+ Universities Nationwide
      </div>
      <h1 className="text-7xl md:text-9xl font-extrabold tracking-tighter leading-[0.85] mb-8 text-black">
        Smart campus <br /> 
        <span className="text-gray-300 italic font-medium">living.</span>
      </h1>
      <p className="text-xl text-gray-500 max-w-md mb-12 leading-relaxed font-light">
        Stop compromising on your campus experience. From 2 AM cravings to last-minute assignment prints, we bridge the gap between your hostel and campus vendors.
      </p>
      <div className="flex flex-wrap gap-5">
        <Link to="/signup" className="group px-10 py-5 bg-black text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-gray-800 transition-all duration-300">
          Start Your First Order <FaArrowRight className="group-hover:translate-x-2 transition-transform text-sm" />
        </Link>
      </div>
    </div>

    {/* Hero Visual - Optimized Hover Container */}
    <div className="relative reveal hidden lg:block z-10 group">
      <div className="w-full aspect-[4/5] rounded-[3rem] bg-white shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-gray-100 p-12 flex flex-col justify-between hover-lift transition-all duration-500 ease-out">
        
        <div className="flex justify-between items-center border-b border-gray-50 pb-8">
          <div>
            <h4 className="font-black text-xl tracking-tighter">HOSTEL</h4>
            <p className="text-[10px] font-bold text-gray-300 tracking-[0.3em]">DASHBOARD</p>
          </div>
          <div className="px-4 py-2 bg-gray-50 rounded-full text-[10px] font-bold text-green-600 flex items-center gap-2">
             <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
             ONLINE
          </div>
        </div>

        <div className="space-y-6">
          {/* Item 1 */}
          <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 flex items-center gap-5 transition-all duration-300 hover:bg-white hover:shadow-xl group/item">
            <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center text-2xl group-hover/item:scale-110 transition-transform">🍕</div>
            <div>
              <h5 className="font-bold text-sm">Spicy Paneer Maggi</h5>
              <p className="text-[10px] text-gray-400 font-medium">Coming from VC Canteen • 4 mins away</p>
            </div>
          </div>
          
          {/* Item 2 */}
          <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 flex items-center gap-5 transition-all duration-300 hover:bg-white hover:shadow-xl opacity-60 hover:opacity-100 group/item">
            <div className="w-14 h-14 bg-white shadow-sm rounded-2xl flex items-center justify-center text-2xl group-hover/item:scale-110 transition-transform">📑</div>
            <div>
              <h5 className="font-bold text-sm">Lab Report #4 (Printed)</h5>
              <p className="text-[10px] text-gray-400 font-medium">Ready at Central Library Hub</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-50 flex justify-between items-center">
          <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">Wallet Balance</span>
          <span className="font-black text-2xl text-black">₹420.50</span>
        </div>
      </div>
      
      {/* Decorative Background Glow for Hover Effect */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-black/5 to-transparent blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  </div>
</section>

     v
      {/* ================= CATEGORIES ================= */}
      <section id="categories" className="py-20 lg:py-40 bg-black text-white rounded-[2.5rem] lg:rounded-[4rem] mx-4 mb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="reveal mb-16 lg:mb-24 max-w-2xl">
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter mb-6 leading-none">Built for the <br /> <span className="text-gray-600">Student Grind.</span></h2>
            <p className="text-gray-400 text-base lg:text-lg font-light">Whether it's a 3 AM study session or a 9 AM lab class, we've got you covered.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "The Canteen", desc: "Everything from late-night Maggi to full meals.", tag: "FOOD" },
              { title: "The Print Shop", desc: "Upload PDFs and get prints delivered to your room.", tag: "STUDY" },
              { title: "The Mart", desc: "Sanitary pads, soaps, and room essentials.", tag: "DAILY" },
            ].map((cat, i) => (
              <div key={i} className="reveal p-8 lg:p-12 rounded-[2rem] lg:rounded-[3rem] bg-[#111] border border-white/5 hover:border-white/20 transition-all cursor-pointer group">
                <span className="text-[10px] font-bold tracking-[0.3em] text-gray-500 group-hover:text-white transition-colors">{cat.tag}</span>
                <h3 className="text-2xl lg:text-3xl font-bold mt-4 mb-4">{cat.title}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section id="testimonials" className="py-24 lg:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal text-center mb-16 lg:mb-24">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300 mb-4 block">Voices of the Campus</span>
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-black">Trusted by the community.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { name: "Aman Sharma", college: "NIT Patna", text: "The midnight Maggi delivery is a total life-saver during end-sems.", tag: "Fastest Delivery" },
              { name: "Riya Kapoor", college: "IIT Delhi", text: "Printing lab manuals used to take an hour. Now it's at my hostel gate.", tag: "Game Changer" },
              { name: "Sahil Varma", college: "BITS Pilani", text: "Unified payment system is so smooth. I can track all my expenses.", tag: "Super Convenient" }
            ].map((t, i) => (
              <div key={i} className="reveal p-8 lg:p-10 rounded-[2rem] lg:rounded-[2.5rem] bg-[#fbfbfd] border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-black mb-4 lg:mb-6">
                    {[1, 2, 3, 4, 5].map(s => <FaStar key={s} size={10} />)}
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-white border border-gray-100 text-[8px] font-black uppercase tracking-widest text-gray-400 mb-6 uppercase">
                    {t.tag}
                  </span>
                  <p className="text-gray-600 text-base lg:text-lg font-light leading-relaxed mb-8 lg:mb-12">"{t.text}"</p>
                </div>
                <div className="flex items-center gap-4 border-t border-gray-100 pt-6 lg:pt-8">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-black flex items-center justify-center text-white text-xs font-bold">
                    {t.name[0]}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-black">{t.name}</h5>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em]">{t.college}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-[#fbfbfd] border-t border-gray-100 pt-20 lg:pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-20">
            <div className="md:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex flex-col leading-[0.85] mb-8 group cursor-pointer">
                  <span className="font-black text-2xl lg:text-3xl tracking-tighter text-black">HOSTEL</span>
                  <span className="text-[11px] lg:text-[12px] font-bold text-gray-400 tracking-[0.4em] uppercase ml-0.5 group-hover:text-black transition-colors">HUNGRY</span>
              </div>
              <p className="text-gray-400 text-sm font-light leading-relaxed max-w-sm">
                Redefining the campus experience. Fast, reliable, and built for students.
              </p>
            </div>

            <div className="md:col-span-4 grid grid-cols-2 gap-8 text-center md:text-left">
              <div className="flex flex-col gap-5">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Platform</span>
                <div className="flex flex-col gap-3 text-xs font-medium text-gray-400">
                  <a href="#" className="hover:text-black transition">Order Food</a>
                  <a href="#" className="hover:text-black transition">Print Hub</a>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Company</span>
                <div className="flex flex-col gap-3 text-xs font-medium text-gray-400">
                  <a href="#" className="hover:text-black transition">About Us</a>
                  <a href="#" className="hover:text-black transition">Support</a>
                </div>
              </div>
            </div>

            <div className="md:col-span-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black block mb-5 text-center lg:text-left">Newsletter</span>
              <div className="relative max-w-xs mx-auto lg:mx-0">
                <input 
                  type="email" 
                  placeholder="Campus Email" 
                  className="w-full bg-white border border-gray-100 rounded-xl px-4 py-3 text-xs outline-none focus:border-black transition-all"
                />
                <button className="absolute right-2 top-1.5 p-1.5 bg-black text-white rounded-lg">
                  <FaArrowRight size={10} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-10 border-t border-gray-100 flex flex-col lg:row justify-between items-center gap-6 text-center">
            <div className="flex flex-wrap justify-center gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-gray-300">
              <span className="text-black italic">EST. 2026</span>
              <a href="#" className="hover:text-black transition">Privacy</a>
              <a href="#" className="hover:text-black transition">Terms</a>
            </div>
            <p className="text-[9px] font-bold text-gray-300 tracking-[0.3em] uppercase">
              Designed for the next generation of students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
