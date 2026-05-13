/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Video,
  Camera,
  Film,
  Terminal,
  Palette,
  Layout,
  Instagram,
  MessageCircle,
  Mail,
  Phone,
  ChevronRight,
  ExternalLink,
  Star,
  Award,
  Zap,
  CheckCircle2,
  Menu,
  X,
  ArrowUp
} from 'lucide-react';



// Types
interface Service {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  image: string;
}

interface Package {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}


type WorkCategory = 'All' | 'Video Editing' | 'Branding' | 'Web Development';

interface WorkItem {
  img: string;
  label: string;
  category: WorkCategory;
}

const WORKS: WorkItem[] = [
  { img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1000', label: 'Luxe Wedding Story', category: 'Video Editing' },
  { img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000', label: 'Wedding Cinematic', category: 'Video Editing' },
  { img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000', label: 'Cinematic Vlog', category: 'Video Editing' },
  { img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1000', label: 'Event Master', category: 'Video Editing' },
  { img: '/action_reel.png', label: 'Action Reel', category: 'Video Editing' },
  { img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=600', label: 'Brand Ad', category: 'Branding' },
  { img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600', label: 'Modern Logo', category: 'Branding' },
  { img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600', label: 'Travel App', category: 'Web Development' },
  { img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600', label: 'Tech Dashboard', category: 'Web Development' }
];

const SERVICES: Service[] = [
  {
    id: 'video',
    title: 'Video Production',
    description: 'Cinematic editing for Reels, YouTube, and Weddings. High-energy cuts that keep the "Aura" of the brand alive.',
    icon: Video,
    color: 'text-gold',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'branding',
    title: 'Brand Identity',
    description: 'We don\'t just edit; we brand. Custom logo design for YouTube channels, startups, and personal brands.',
    icon: Palette,
    color: 'text-gold',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'websites',
    title: 'Creator Websites',
    description: 'Get a professional home for your content. Building high-speed portfolio sites for influencers and businesses.',
    icon: Layout,
    color: 'text-electric',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'design',
    title: 'Invite & Banners',
    description: 'Digital invitation cards for weddings and high-end event banners designed to leave a lasting impression.',
    icon: Star,
    color: 'text-gold',
    image: '/invite_banner_bg.png'
  }
];


interface BrandingCase {
  id: string;
  title: string;
  client: string;
  description: string;
  image: string;
  tags: string[];
}

const REELS_DATA = [
  { img: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800', label: 'Cinematic Mini Vlog', views: '12K' },
  { img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=800', label: 'Street Travel Reel', views: '45K' },
  { img: '/night_event.png', label: 'Night Event Short', views: '28K' },
  { img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800', label: 'Studio Product Reel', views: '8K' }
];

const BRANDING_CASES: BrandingCase[] = [
  {
    id: 'cyber-vault',
    title: 'CyberVault Security',
    client: 'Tech Startup',
    description: 'A minimalist geometric logo representing unbreakable security and modern data architecture.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000',
    tags: ['Tech', 'Geometric', 'Blue']
  },
  {
    id: 'aura-fitness',
    title: 'Aura Athletics',
    client: 'Fitness Influencer',
    description: 'Dynamic typography paired with an abstract symbol representing peak performance and flow state.',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000',
    tags: ['Fitness', 'Dynamic', 'Gold']
  },
  {
    id: 'luxe-vlog',
    title: 'Luxe Moments',
    client: 'Lifestyle Creator',
    description: 'Elegant serif branding translated from digital to luxury packaging for a influencer merchandise line.',
    image: '/luxe_moments.png',
    tags: ['Luxury', 'Creator', 'Serif']
  }
];

const PACKAGES: Package[] = [
  {
    name: 'The Starter',
    price: 'Custom',
    features: ['Professional Video Edit', 'Viral Thumbnail Design', 'Color Grading', '1 Revision']
  },
  {
    name: 'The Professional',
    price: 'Most Popular',
    features: ['5 Viral Reels', '1 Custom Logo Design', 'Brand Consultation', 'Priority Support'],
    recommended: true
  },
  {
    name: 'The Executive',
    price: 'Premium',
    features: ['Full Branding Suite', 'Comprehensive Video Package', 'Custom Responsive Website', 'Dedicated Project Manager']
  }
];

// Logo Component
const Logo = () => (
  <div className="flex items-center gap-4 group cursor-pointer">
    <div className="relative w-12 h-12 flex items-center justify-center">
      {/* Outer Hexagon / Structural Frame */}
      <div className="absolute inset-0 border border-white/10 rounded-xl transform rotate-45 group-hover:bg-gold/5 group-hover:border-gold/30 transition-all duration-700" />

      {/* Middle Frame / Cinematic Lens */}
      <div className="absolute inset-2 border border-white/20 rounded-full group-hover:scale-110 group-hover:border-electric/30 transition-all duration-500" />

      {/* Central Prism / Brand Core */}
      <div className="relative z-10 overflow-hidden">
        <motion.div
          animate={{
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 15px rgba(233,195,73,0.5)",
              "0 0 25px rgba(233,195,73,0.8)",
              "0 0 15px rgba(233,195,73,0.5)"
            ]
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-4 h-4 bg-gradient-to-tr from-gold to-electric rounded-sm"
        />
      </div>

      {/* Subtle Scanline effect for logo */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1 w-full translate-y-12 group-hover:translate-y-[-48px] transition-transform duration-1000 opacity-0 group-hover:opacity-100" />
    </div>

    <div className="flex flex-col">
      <h1 className="font-epilogue font-black text-2xl tracking-[-0.05em] uppercase leading-none text-white group-hover:text-gold transition-colors duration-300 relative overflow-hidden">
        <motion.span
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] pointer-events-none"
        />
        Aura<span className="text-electric group-hover:text-white transition-colors duration-300">.</span>
      </h1>
      <div className="overflow-hidden h-3 flex">
        {"Creative Studios".split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: 15, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              y: { delay: 0.8 + i * 0.03, duration: 0.5, ease: "easeOut" },
              opacity: { delay: 0.8 + i * 0.03, duration: 0.5 }
            }}
            className="font-mono text-[9px] font-bold uppercase text-white/40 group-hover:text-electric transition-colors inline-block"
            style={{ letterSpacing: "0.5em", marginRight: char === " " ? "0.5em" : "0" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    </div>
  </div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMember, setActiveMember] = useState<'aditya' | 'ajit' | 'navnath' | null>(null);
  const [activeFilter, setActiveFilter] = useState<WorkCategory>('All');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedCase, setSelectedCase] = useState<BrandingCase | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    projectType: 'Video Editing & Post-Production'
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'name') {
      if (!value.trim()) error = 'Name is required';
      else if (value.length < 3) error = 'Minimum 3 characters';
    }
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) error = 'Email is required';
      else if (!emailRegex.test(value)) error = 'Invalid email address';
    }
    if (name === 'message') {
      if (!value.trim()) error = 'Your vision is required';
      else if (value.length < 10) error = 'Tell us a bit more (min 10 chars)';
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const filteredWorks = activeFilter === 'All'
    ? WORKS
    : WORKS.filter(work => work.category === activeFilter);

  return (
    <div className="relative min-h-screen bg-surface selection:bg-gold selection:text-black">
      {/* Background FX */}
      <div className="fixed inset-0 film-grain z-50 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(60,215,255,0.05)_0%,transparent_50%)] pointer-events-none" />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-surface/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />

          <div className="hidden md:flex items-center gap-8">
            {['Services', 'team', 'Work', 'Packages', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="font-epilogue text-xs tracking-widest font-bold text-white/60 hover:text-white transition-colors uppercase"
              >
                {item === 'team' ? 'The Team' : item}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-gold/10 border border-gold/30 px-6 py-2 rounded-sm font-epilogue text-xs font-bold text-gold hover:bg-gold hover:text-black transition-all"
            >
              BOOK A SESSION
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-surface pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {['Services', 'team', 'Work', 'Packages', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-epilogue text-3xl font-black uppercase text-white/50 hover:text-white"
                >
                  {item === 'team' ? 'The Team' : item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section: The Split Duo */}
        {/* Hero Section: The Split Trio */}
        <section className="relative min-h-[150vh] lg:h-screen flex flex-col lg:flex-row overflow-hidden border-b border-white/10">
          {/* Cinematic Background Video Overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-[0.15] brightness-[0.4] contrast-125 saturate-50 mix-blend-luminosity"
            >
              <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c97462ccd0bc227d870771cb21759656&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
            </video>
            {/* Cinematic Color Grading Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/80 to-surface/95" />
            <div className="absolute inset-0 bg-surface/40 backdrop-blur-[2px]" />
          </div>

          {/* Aditya Side (Left) */}
          <motion.div
            className="relative flex-1 min-h-[50vh] lg:min-h-0 group overflow-hidden bg-surface/50 text-left border-b lg:border-b-0 lg:border-r border-white/5"
            onHoverStart={() => setActiveMember('aditya')}
            onHoverEnd={() => setActiveMember(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-electric/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />
            <img
              src="/hero_adit.png"
              alt="Aditya"
              className="absolute inset-0 w-full h-screen object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000 origin-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-surface via-surface/80 to-transparent z-10" />

            {/* Top Typography Element */}
            <div className="absolute top-24 left-8 md:top-32 md:left-12 opacity-10 pointer-events-none z-10 transition-all duration-700 group-hover:opacity-30 group-hover:-translate-y-4">
              <span className="font-epilogue text-[120px] lg:text-[160px] font-black text-transparent leading-none" style={{ WebkitTextStroke: '2px white' }}>01</span>
              <p className="font-mono text-sm tracking-[0.3em] uppercase mt-2 text-electric">Post-Production</p>
            </div>

            <div className="relative z-20 h-full flex flex-col justify-end items-start p-8 pb-16 md:p-12 lg:p-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full"
              >
                <div className="inline-flex items-center gap-2 mb-4 glass-border-blue bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-electric/20 group-hover:border-electric/50 transition-colors">
                  <Video className="w-4 h-4 text-electric animate-pulse" />
                  <span className="font-mono text-electric tracking-[0.2em] uppercase text-[10px] md:text-xs font-bold">Video Master</span>
                </div>
                <h2 className="font-epilogue text-5xl lg:text-7xl font-black text-white mb-6 group-hover:text-electric group-hover:text-glow-blue transition-all duration-500 tracking-tighter">ADIT.</h2>
                <p className="font-mono text-white/70 group-hover:text-white/90 text-xs md:text-sm mb-6 max-w-[280px] lg:max-w-[340px] leading-relaxed border-l-2 border-electric/30 group-hover:border-electric pl-4 transition-colors duration-500">
                  Transforming raw footage into high-retention viral content that dominates the algorithm. Specialized in dynamic cuts, high-end color grading, and immersive sound design. We don't just edit; we engineer engagement.
                </p>
                <div className="flex flex-wrap gap-2 mb-8 max-w-[280px] lg:max-w-[340px] opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[10px] font-mono border border-electric/20 group-hover:border-electric/50 bg-electric/5 text-electric px-3 py-1 rounded-full backdrop-blur-sm transition-colors">Premiere Pro</span>
                  <span className="text-[10px] font-mono border border-electric/20 group-hover:border-electric/50 bg-electric/5 text-electric px-3 py-1 rounded-full backdrop-blur-sm transition-colors">After Effects</span>
                  <span className="text-[10px] font-mono border border-electric/20 group-hover:border-electric/50 bg-electric/5 text-electric px-3 py-1 rounded-full backdrop-blur-sm transition-colors">Color Grading</span>
                  <span className="text-[10px] font-mono border border-electric/20 group-hover:border-electric/50 bg-electric/5 text-electric px-3 py-1 rounded-full backdrop-blur-sm transition-colors">Sound Design</span>
                </div>
                <div className="flex gap-3 justify-start w-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <a href="https://www.instagram.com/adit_sing_999" target="_blank" rel="noreferrer" className="glass-border-blue bg-black/50 p-3 rounded-full hover:bg-electric hover:text-black transition-all group/icon">
                    <Instagram className="w-4 h-4 text-electric group-hover/icon:text-black" />
                  </a>
                  <a href="https://wa.me/917038990002" target="_blank" rel="noreferrer" className="glass-border-blue bg-black/50 p-3 rounded-full hover:bg-electric hover:text-black transition-all group/icon">
                    <MessageCircle className="w-4 h-4 text-electric group-hover/icon:text-black" />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Navnath Side (Middle) */}
          <motion.div
            className="relative flex-1 min-h-[50vh] lg:min-h-0 group overflow-hidden bg-surface/50 lg:text-center text-left border-b lg:border-b-0 lg:border-r border-white/5"
            onHoverStart={() => setActiveMember('navnath')}
            onHoverEnd={() => setActiveMember(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />
            <img
              src="/hero_nava.png"
              alt="Navnath"
              className="absolute inset-0 w-full h-screen object-cover opacity-40 grayscale group-hover:grayscale-[20%] group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000 origin-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent z-10" />

            {/* Top Typography Element */}
            <div className="absolute top-24 lg:left-1/2 lg:-translate-x-1/2 left-8 md:top-32 opacity-10 pointer-events-none z-10 transition-all duration-700 group-hover:opacity-30 group-hover:-translate-y-4 lg:text-center">
              <span className="font-epilogue text-[120px] lg:text-[160px] font-black text-transparent leading-none" style={{ WebkitTextStroke: '2px white' }}>02</span>
              <p className="font-mono text-sm tracking-[0.3em] uppercase mt-2 text-white">Photography</p>
            </div>

            <div className="relative z-20 h-full flex flex-col justify-end lg:items-center items-start p-8 pb-16 md:p-12 lg:p-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="flex flex-col lg:items-center items-start w-full"
              >
                <div className="inline-flex items-center gap-2 mb-4 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 group-hover:border-white/40 transition-colors">
                  <Camera className="w-4 h-4 text-white animate-pulse" />
                  <span className="font-mono text-white tracking-[0.2em] uppercase text-[10px] md:text-xs font-bold">Photo Master</span>
                </div>
                <h2 className="font-epilogue text-5xl lg:text-7xl font-black text-white mb-6 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all duration-500 tracking-tighter">NAVA.</h2>
                <p className="font-mono text-white/70 group-hover:text-white/90 text-xs md:text-sm mb-6 max-w-[280px] lg:max-w-[340px] leading-relaxed lg:text-center text-left border-l-2 lg:border-l-0 border-white/30 group-hover:border-white pl-4 lg:pl-0 transition-colors duration-500">
                  Capturing timeless moments that define your legacy with stunning cinematic precision. From high-fashion editorial shoots to authentic candid storytelling, every frame is meticulously crafted.
                </p>
                <div className="flex flex-wrap gap-2 mb-8 lg:justify-center justify-start max-w-[280px] lg:max-w-[340px] opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[10px] font-mono border border-white/20 group-hover:border-white/50 bg-white/5 text-white px-3 py-1 rounded-full backdrop-blur-sm transition-colors">Portraiture</span>
                  <span className="text-[10px] font-mono border border-white/20 group-hover:border-white/50 bg-white/5 text-white px-3 py-1 rounded-full backdrop-blur-sm transition-colors">Editorial</span>
                  <span className="text-[10px] font-mono border border-white/20 group-hover:border-white/50 bg-white/5 text-white px-3 py-1 rounded-full backdrop-blur-sm transition-colors">Lightroom</span>
                  <span className="text-[10px] font-mono border border-white/20 group-hover:border-white/50 bg-white/5 text-white px-3 py-1 rounded-full backdrop-blur-sm transition-colors">Retouching</span>
                </div>
                <div className="flex gap-3 lg:justify-center justify-start w-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <a href="https://www.instagram.com/navnath_kadam_photowaala_?igsh=aG0zbG41bzk1a21p" target="_blank" rel="noreferrer" className="border border-white/20 bg-black/50 p-3 rounded-full hover:bg-white hover:text-black transition-all group/icon">
                    <Instagram className="w-4 h-4 text-white group-hover/icon:text-black" />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Ajit Side (Right) */}
          <motion.div
            className="relative flex-1 min-h-[50vh] lg:min-h-0 group overflow-hidden bg-surface/50 lg:text-right text-left"
            onHoverStart={() => setActiveMember('ajit')}
            onHoverEnd={() => setActiveMember(null)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gold/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />
            <img
              src="/hero_ajit.png"
              alt="Ajit"
              className="absolute inset-0 w-full h-screen object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000 origin-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-surface via-surface/80 to-transparent z-10" />

            {/* Top Typography Element */}
            <div className="absolute top-24 lg:right-12 left-8 md:top-32 opacity-10 pointer-events-none z-10 transition-all duration-700 group-hover:opacity-30 group-hover:-translate-y-4 lg:text-right">
              <span className="font-epilogue text-[120px] lg:text-[160px] font-black text-transparent leading-none" style={{ WebkitTextStroke: '2px white' }}>03</span>
              <p className="font-mono text-sm tracking-[0.3em] uppercase mt-2 text-gold">Cinematography</p>
            </div>

            <div className="relative z-20 h-full flex flex-col justify-end lg:items-end items-start p-8 pb-16 md:p-12 lg:p-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="flex flex-col lg:items-end items-start w-full"
              >
                <div className="inline-flex items-center gap-2 mb-4 glass-border-gold bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-gold/20 group-hover:border-gold/50 transition-colors">
                  <Film className="w-4 h-4 text-gold animate-pulse" />
                  <span className="font-mono text-gold tracking-[0.2em] uppercase text-[10px] md:text-xs font-bold">Cinematic Master</span>
                </div>
                <h2 className="font-epilogue text-5xl lg:text-7xl font-black text-white mb-6 group-hover:text-gold group-hover:text-glow-gold transition-all duration-500 tracking-tighter">AJIT.</h2>
                <p className="font-mono text-white/70 group-hover:text-white/90 text-xs md:text-sm mb-6 max-w-[280px] lg:max-w-[340px] leading-relaxed lg:border-r-2 border-l-2 lg:border-l-0 border-gold/30 group-hover:border-gold lg:pr-4 pl-4 lg:text-right text-left transition-colors duration-500">
                  Crafting cinematic masterpieces and digital architectures that elevate your brand's narrative. Fusing cutting-edge web development with premium visual direction to create immersive experiences.
                </p>
                <div className="flex flex-wrap gap-2 mb-8 lg:justify-end justify-start max-w-[280px] lg:max-w-[340px] opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[10px] font-mono border border-gold/20 group-hover:border-gold/50 bg-gold/5 text-gold px-3 py-1 rounded-full backdrop-blur-sm transition-colors">Cinematography</span>
                  <span className="text-[10px] font-mono border border-gold/20 group-hover:border-gold/50 bg-gold/5 text-gold px-3 py-1 rounded-full backdrop-blur-sm transition-colors">React / Web</span>
                  <span className="text-[10px] font-mono border border-gold/20 group-hover:border-gold/50 bg-gold/5 text-gold px-3 py-1 rounded-full backdrop-blur-sm transition-colors">UI/UX Design</span>
                  <span className="text-[10px] font-mono border border-gold/20 group-hover:border-gold/50 bg-gold/5 text-gold px-3 py-1 rounded-full backdrop-blur-sm transition-colors">Direction</span>
                </div>
                <div className="flex gap-3 lg:justify-end justify-start w-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <a href="https://www.instagram.com/official_ajit_hake_07" target="_blank" rel="noreferrer" className="glass-border-gold bg-black/50 p-3 rounded-full hover:bg-gold hover:text-black transition-all group/icon">
                    <Instagram className="w-4 h-4 text-gold group-hover/icon:text-black" />
                  </a>
                  <a href="mailto:aditsing999@gmail.com" className="glass-border-gold bg-black/50 p-3 rounded-full hover:bg-gold hover:text-black transition-all group/icon">
                    <Mail className="w-4 h-4 text-gold group-hover/icon:text-black" />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Interactive Hero Features Bar */}
          <div className="absolute bottom-0 left-0 w-full z-30 bg-black/60 backdrop-blur-xl border-t border-white/10 py-4 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 transform transition-all hover:bg-black/80">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-gold animate-pulse" />
              <span className="font-epilogue font-bold text-white/90 uppercase tracking-widest text-xs md:text-sm text-center md:text-left">
                Together we make the best of the best for you.
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#showreel" className="group flex items-center gap-2 border border-white/20 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all">
                <Video className="w-4 h-4 text-electric group-hover:text-white transition-colors" />
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white/80 group-hover:text-white font-bold">Wedding Reel Fun</span>
              </a>

              <a href="tel:+917038990002" className="group flex items-center gap-2 bg-gold/10 hover:bg-gold/20 border border-gold/30 px-4 py-2 rounded-full transition-all shadow-[0_0_15px_rgba(233,195,73,0.15)] hover:shadow-[0_0_20px_rgba(233,195,73,0.3)]">
                <Phone className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-gold font-bold">Any doubt? Call us</span>
              </a>
            </div>
          </div>
        </section>

        {/* Wedding Content Creation Section */}
        <section id="wedding-content" className="py-32 px-6 bg-surface-bright/30 relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(233,195,73,0.05)_0%,transparent_50%)] pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 items-center">

              <div className="flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center gap-2 mb-6 glass-border-gold bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-gold/20">
                    <Star className="w-4 h-4 text-gold animate-pulse" />
                    <span className="font-mono text-gold tracking-[0.2em] uppercase text-[10px] md:text-xs font-bold">Premium Wedding Content</span>
                  </div>

                  <h2 className="font-epilogue text-4xl md:text-6xl font-black mb-6 leading-tight">
                    Wedding <span className="text-glow-gold italic text-gold">Reel Fun.</span>
                  </h2>

                  <div className="mb-8 border-l-2 border-gold pl-6">
                    <p className="font-epilogue text-xl text-white/90 italic font-medium">
                      "Capturing the magic of today, so you can relive the beautiful memories forever. Your love story deserves a cinematic masterpiece."
                    </p>
                  </div>

                  <p className="text-white/60 mb-10 text-lg">
                    We specialize in capturing your most beautiful moments in stunning high quality. From cinematic storytelling to fun, viral-worthy Instagram reels—all delivered professionally.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {[
                      'High-Quality Short Videos',
                      'Fun & Engaging Reels',
                      'Beautiful Moments Captured',
                      'Same-Day Instagram Upload'
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10">
                        <CheckCircle2 className="w-5 h-5 text-electric shrink-0" />
                        <span className="font-mono text-xs sm:text-sm text-white/90 font-bold">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a href="https://wa.me/917038990002" target="_blank" rel="noreferrer" className="bg-gold text-black px-8 py-4 rounded-full font-epilogue font-bold tracking-widest uppercase hover:bg-white transition-all transform hover:scale-105 flex items-center gap-2 shadow-[0_0_20px_rgba(233,195,73,0.3)]">
                      <MessageCircle className="w-5 h-5" />
                      Message Us
                    </a>
                    <a href="tel:+917038990002" className="glass-border-gold bg-black/40 px-8 py-4 rounded-full font-epilogue font-bold tracking-widest uppercase hover:bg-gold/20 text-gold transition-all flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      Any Doubt? Call
                    </a>
                  </div>
                </motion.div>
              </div>

              <div className="flex-1 w-full lg:w-auto relative">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Main Image */}
                  <div className="aspect-[4/5] md:aspect-[3/4] rounded-3xl overflow-hidden glass-border-gold group relative z-10 shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000"
                      alt="Wedding Cinematic Content"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                    <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="flex items-center gap-4 text-gold mb-2">
                        <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center backdrop-blur-md border border-gold/50">
                          <Video className="w-5 h-5" />
                        </div>
                        <span className="font-epilogue font-bold uppercase tracking-widest text-sm text-glow-gold">Play Reel</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -bottom-8 -left-8 bg-black/80 backdrop-blur-xl p-6 rounded-2xl glass-border-blue z-20 hidden md:block shadow-2xl transform hover:-translate-y-2 transition-transform">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-electric/20 flex items-center justify-center border border-electric/30">
                        <Instagram className="w-6 h-6 text-electric animate-pulse" />
                      </div>
                      <div>
                        <p className="font-epilogue font-bold text-white text-sm uppercase tracking-widest mb-1">Same Day Upload</p>
                        <p className="font-mono text-xs text-electric">Ready for Instagram Reels</p>
                      </div>
                    </div>
                  </div>

                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Logo Showcase Grid */}
        <section id="branding" className="py-32 px-6 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div>
                <h3 className="font-mono text-gold uppercase tracking-[0.3em] text-sm mb-6">Case Studies</h3>
                <h2 className="font-epilogue text-4xl md:text-6xl font-black leading-tight">Brand Identities</h2>
              </div>
              <p className="text-white/40 max-w-md">
                We believe a logo is more than just an image—it's the visual heartbeat of your brand's narrative.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {BRANDING_CASES.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedCase(item)}
                  className="group cursor-pointer rounded-3xl overflow-hidden glass-border-gold transition-all bg-white/5 p-4"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden mb-6 relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <div className="w-12 h-12 rounded-full bg-gold text-black flex items-center justify-center">
                        <ExternalLink className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  <div className="px-2">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-epilogue font-black text-xl text-white group-hover:text-gold transition-colors">{item.title}</h4>
                      <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">{item.client}</span>
                    </div>
                    <div className="flex gap-2 mb-4">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[9px] font-bold text-white/40 border border-white/10 px-2 py-0.5 rounded-full uppercase tracking-widest">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Case Modal Overlay */}
        <AnimatePresence>
          {selectedCase && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 sm:p-12">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCase(null)}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-5xl bg-surface-bright border border-white/10 rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-2xl"
              >
                <div className="md:w-1/2 h-64 md:h-auto relative">
                  <img src={selectedCase.image} alt={selectedCase.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-bright/80 via-transparent to-transparent md:hidden" />
                </div>
                <div className="md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all z-10"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <h3 className="font-mono text-gold uppercase tracking-[0.4em] text-xs mb-8">Case Study: {selectedCase.client}</h3>
                  <h2 className="font-epilogue text-4xl md:text-5xl font-black mb-8 leading-tight">{selectedCase.title}</h2>
                  <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed mb-12">
                    {selectedCase.description}
                  </p>

                  <div className="grid grid-cols-2 gap-8 mb-12 border-t border-white/10 pt-12">
                    <div>
                      <h5 className="font-epilogue font-bold text-sm uppercase tracking-widest text-white/40 mb-2">Category</h5>
                      <p className="text-white font-medium">Brand Identity / Logo</p>
                    </div>
                    <div>
                      <h5 className="font-epilogue font-bold text-sm uppercase tracking-widest text-white/40 mb-2">Service</h5>
                      <p className="text-white font-medium">Visual Strategy</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCase(null)}
                    className="w-full bg-gold text-black py-4 rounded-2xl font-epilogue font-bold tracking-widest uppercase hover:bg-white transition-all transform hover:scale-[1.02]"
                  >
                    Close Showcase
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* About Section */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="font-mono text-gold uppercase tracking-[0.3em] text-sm mb-6">Who we are</h3>
              <h2 className="font-epilogue text-4xl md:text-6xl font-black mb-8 leading-tight">
                Young creators dedicated to building the <span className="text-glow-gold italic">next generation</span> of digital brands.
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/60 font-medium text-lg leading-relaxed"
            >
              <p className="mb-6">
                From the first frame of a Viral Reel to the final line of code on a Professional Website, we handle it all. We specialize in Cinematic Video Editing, Modern Logo Design, and Full-Stack Web Development.
              </p>
              <p>
                Whether you are a YouTuber looking for a fresh logo or a couple wanting a cinematic wedding story, we bring your vision to life with precision and "Aura".
              </p>
            </motion.div>
          </div>
        </section>

        {/* Showreel Section */}
        <section id="showreel" className="py-20 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto relative group aspect-video rounded-3xl overflow-hidden glass-border-gold"
          >
            <img
              src="https://images.unsplash.com/photo-1601506521937-0121a7fc2a6b?auto=format&fit=crop&q=80&w=2000"
              alt="2024 Showreel"
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform cursor-pointer">
                <Video className="w-10 h-10 text-gold" />
              </div>
              <p className="mt-6 font-epilogue font-black text-2xl tracking-widest uppercase text-glow-gold"> MASTER SHOWREEL</p>
            </div>

            <div className="absolute bottom-8 left-8">
              <div className="flex gap-3">
                <span className="bg-gold/20 border border-gold/40 px-3 py-1 rounded-sm text-[10px] font-bold text-gold uppercase tracking-tighter tracking-widest font-mono">Cinematic</span>
                <span className="bg-electric/20 border border-electric/40 px-3 py-1 rounded-sm text-[10px] font-bold text-electric uppercase tracking-tighter tracking-widest font-mono">4K Ultra</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Tech-Video Blend Section */}
        <section className="py-32 px-6 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h3 className="font-mono text-electric uppercase tracking-[0.3em] text-sm mb-6">Case Study</h3>
              <h2 className="font-epilogue text-4xl md:text-6xl font-black mb-8 leading-tight">The Perfect Blend</h2>
              <p className="text-white/40 max-w-2xl mx-auto">See how we integrated a high-performance website with specialized cinematic content for "Aura Influencers".</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-video rounded-2xl overflow-hidden glass-border-blue"
              >
                <img
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000"
                  alt="High speed website"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-electric/20 backdrop-blur-[2px] opacity-0 hover:opacity-100 transition-all flex items-center justify-center">
                  <div className="bg-black/90 p-6 rounded-xl border border-electric/40 text-center">
                    <Layout className="w-8 h-8 text-electric mx-auto mb-4" />
                    <span className="font-epilogue font-bold text-sm uppercase tracking-widest">Custom Portfolio Site</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative aspect-video rounded-2xl overflow-hidden glass-border-gold"
              >
                <img
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1000"
                  alt="Cinematic content"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gold/20 backdrop-blur-[2px] opacity-0 hover:opacity-100 transition-all flex items-center justify-center">
                  <div className="bg-black/90 p-6 rounded-xl border border-gold/40 text-center">
                    <Video className="w-8 h-8 text-gold mx-auto mb-4" />
                    <span className="font-epilogue font-bold text-sm uppercase tracking-widest">Viral Reel Series</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="mt-16 p-8 glass-border-gold bg-white/5 rounded-xl text-center">
              <h4 className="font-epilogue text-xl font-bold mb-4">"They handled everything from the logo to the final deployment."</h4>
              <p className="font-mono text-gold text-xs uppercase tracking-widest">— Happy Influencer</p>
            </div>
          </div>
        </section>

        {/* Services Bento Grid */}
        <section id="services" className="py-32 px-6 bg-surface-bright/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-xl">
                <h3 className="font-mono text-electric uppercase tracking-[0.3em] text-sm mb-6">What We Do</h3>
                <h2 className="font-epilogue text-4xl md:text-5xl font-black">Our Creative Services</h2>
              </div>
              <div className="h-[1px] flex-1 bg-white/10 mx-10 hidden md:block" />
              <Zap className="text-gold w-10 h-10 animate-pulse" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">
              {/* Card 1: Video */}
              <motion.div
                whileHover={{ y: -10 }}
                className="md:col-span-8 group relative overflow-hidden rounded-xl glass-border-gold p-10 flex flex-col justify-end"
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img src={SERVICES[0].image} alt="Video" className="w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-1000" />
                </div>
                <div className="relative z-10">
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Video className="w-12 h-12 text-gold mb-6" />
                  </motion.div>
                  <h3 className="font-epilogue text-3xl font-black mb-4 uppercase tracking-tighter">{SERVICES[0].title}</h3>
                  <p className="text-white/60 max-w-md">{SERVICES[0].description}</p>
                </div>
              </motion.div>

              {/* Card 2: Branding */}
              <motion.div
                whileHover={{ y: -10 }}
                className="md:col-span-4 group relative overflow-hidden rounded-xl glass-border-gold p-10 flex flex-col justify-end"
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img src={SERVICES[1].image} alt="Branding" className="w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-1000" />
                </div>
                <div className="relative z-10">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Palette className="w-12 h-12 text-gold mb-6" />
                  </motion.div>
                  <h3 className="font-epilogue text-3xl font-black mb-4 uppercase tracking-tighter">{SERVICES[1].title}</h3>
                  <p className="text-white/60">{SERVICES[1].description}</p>
                </div>
              </motion.div>

              {/* Card 3: Web */}
              <motion.div
                whileHover={{ y: -10 }}
                className="md:col-span-5 group relative overflow-hidden rounded-xl glass-border-blue p-10 flex flex-col justify-end"
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img src={SERVICES[2].image} alt="Web" className="w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-1000" />
                </div>
                <div className="relative z-10">
                  <motion.div
                    animate={{
                      opacity: [0.7, 1, 0.7],
                      scale: [0.95, 1, 0.95]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Layout className="w-12 h-12 text-electric mb-6" />
                  </motion.div>
                  <h3 className="font-epilogue text-3xl font-black mb-4 uppercase tracking-tighter">{SERVICES[2].title}</h3>
                  <p className="text-white/60">{SERVICES[2].description}</p>
                </div>
              </motion.div>

              {/* Card 4: Invites */}
              <motion.div
                whileHover={{ y: -10 }}
                className="md:col-span-7 group relative overflow-hidden rounded-xl glass-border-gold p-10 flex flex-col justify-end"
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img src={SERVICES[3].image} alt="Invites" className="w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-1000" />
                </div>
                <div className="relative z-10">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      filter: ["drop-shadow(0 0 0px gold)", "drop-shadow(0 0 8px gold)", "drop-shadow(0 0 0px gold)"]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Star className="w-12 h-12 text-gold mb-6" />
                  </motion.div>
                  <h3 className="font-epilogue text-3xl font-black mb-4 uppercase tracking-tighter">{SERVICES[3].title}</h3>
                  <p className="text-white/60 max-w-md">{SERVICES[3].description}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Profile Overview Section */}
        <section id="team" className="py-32 px-6 bg-surface-bright/20 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 mb-6 glass-border-gold bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-gold/20"
              >
                <Award className="w-4 h-4 text-gold animate-pulse" />
                <span className="font-mono text-gold tracking-[0.2em] uppercase text-[10px] md:text-xs font-bold">Best of the Best Makers</span>
              </motion.div>
              <h2 className="font-epilogue text-4xl md:text-6xl font-black mb-8 leading-tight">Meet the Masters</h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
              {/* Aditya Detailed Profile */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="glass-border-blue p-8 md:p-10 xl:p-12 rounded-3xl bg-electric/5 relative group h-full flex flex-col"
              >
                <div className="absolute top-0 right-0 p-8">
                  <Video className="w-16 h-16 text-electric/10 group-hover:text-electric transition-colors duration-500" />
                </div>
                
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-epilogue text-3xl xl:text-4xl font-black mb-2 text-white group-hover:text-glow-blue transition-all"
                >
                  Aditya Sadewale
                </motion.h3>
                <p className="font-mono text-electric text-[10px] xl:text-xs uppercase tracking-widest mb-10">Technical Lead & Creative Editor</p>

                <div className="space-y-6 mb-12">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-4 group/item"
                  >
                    <div className="w-12 h-12 rounded-xl bg-electric/10 flex items-center justify-center border border-electric/20 group-hover/item:border-electric transition-colors shrink-0">
                      <Terminal className="w-5 h-5 text-electric" />
                    </div>
                    <div>
                      <h4 className="font-epilogue font-bold text-xs uppercase tracking-widest text-white/40">Tool Expertise</h4>
                      <p className="text-white text-sm font-medium mt-1">VN, Alight Motion, CapCut Pro</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-4 group/item"
                  >
                    <div className="w-12 h-12 rounded-xl bg-electric/10 flex items-center justify-center border border-electric/20 group-hover/item:border-electric transition-colors shrink-0">
                      <Zap className="w-5 h-5 text-electric" />
                    </div>
                    <div>
                      <h4 className="font-epilogue font-bold text-xs uppercase tracking-widest text-white/40">Core Skills</h4>
                      <p className="text-white text-sm font-medium mt-1">Vlog Editor, Cinematic Editor</p>
                    </div>
                  </motion.div>
                </div>

                <div className="flex gap-4 mt-auto pt-6 border-t border-white/5">
                  <a href="https://www.instagram.com/adit_sing_999" target="_blank" rel="noreferrer" className="w-full bg-electric/20 border border-electric/40 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-electric transition-all group/btn">
                    <Instagram className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    <span className="font-epilogue font-bold text-[10px] xl:text-xs uppercase tracking-widest">Visit adit_sing_999</span>
                  </a>
                </div>
              </motion.div>

              {/* Navnath Detailed Profile */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -10 }}
                className="glass-border-white p-8 md:p-10 xl:p-12 rounded-3xl bg-white/5 relative group h-full flex flex-col"
              >
                <div className="absolute top-0 right-0 p-8">
                  <Camera className="w-16 h-16 text-white/10 group-hover:text-white transition-colors duration-500" />
                </div>
                
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-epilogue text-3xl xl:text-4xl font-black mb-2 text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all"
                >
                  Navnath Kadam
                </motion.h3>
                <p className="font-mono text-white/60 text-[10px] xl:text-xs uppercase tracking-widest mb-10">Photographer & Cinematic Editor</p>

                <div className="space-y-6 mb-12">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-4 group/item"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/20 group-hover/item:border-white transition-colors shrink-0">
                      <Palette className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-epilogue font-bold text-xs uppercase tracking-widest text-white/40">Tool Expertise</h4>
                      <p className="text-white text-sm font-medium mt-1">Lightroom, Premiere Pro</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-4 group/item"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/20 group-hover/item:border-white transition-colors shrink-0">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-epilogue font-bold text-xs uppercase tracking-widest text-white/40">Core Skills</h4>
                      <p className="text-white text-sm font-medium mt-1">Photography, Grading, Events</p>
                    </div>
                  </motion.div>
                </div>

                <div className="flex gap-4 mt-auto pt-6 border-t border-white/5">
                  <a href="https://www.instagram.com/navnath_kadam_photowaala_?igsh=aG0zbG41bzk1a21p" target="_blank" rel="noreferrer" className="w-full bg-white/10 border border-white/20 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all group/btn">
                    <Instagram className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    <span className="font-epilogue font-bold text-[10px] xl:text-xs uppercase tracking-widest">Visit navnath_kadam</span>
                  </a>
                </div>
              </motion.div>

              {/* Ajit Detailed Profile */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -10 }}
                className="glass-border-gold p-8 md:p-10 xl:p-12 rounded-3xl bg-gold/5 relative group h-full flex flex-col"
              >
                <div className="absolute top-0 right-0 p-8">
                  <Film className="w-16 h-16 text-gold/10 group-hover:text-gold transition-colors duration-500" />
                </div>
                
                <motion.h3 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="font-epilogue text-3xl xl:text-4xl font-black mb-2 text-white group-hover:text-glow-gold transition-all"
                >
                  Ajit Hake
                </motion.h3>
                <p className="font-mono text-gold text-[10px] xl:text-xs uppercase tracking-widest mb-10">Lead Editor & Brand Architect</p>

                <div className="space-y-6 mb-12">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-4 group/item"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20 group-hover/item:border-gold transition-colors shrink-0">
                      <Layout className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-epilogue font-bold text-xs uppercase tracking-widest text-white/40">Tool Expertise</h4>
                      <p className="text-white text-sm font-medium mt-1">After Effects, CapCut, Alight</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center gap-4 group/item"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20 group-hover/item:border-gold transition-colors shrink-0">
                      <Star className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-epilogue font-bold text-xs uppercase tracking-widest text-white/40">Core Skills</h4>
                      <p className="text-white text-sm font-medium mt-1">Cinematic Wedding, Social Strategy</p>
                    </div>
                  </motion.div>
                </div>

                <div className="flex gap-4 mt-auto pt-6 border-t border-white/5">
                  <a href="https://www.instagram.com/official_ajit_hake_07" target="_blank" rel="noreferrer" className="w-full bg-gold/20 border border-gold/40 py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gold hover:text-black transition-all group/btn">
                    <Instagram className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                    <span className="font-epilogue font-bold text-[10px] xl:text-xs uppercase tracking-widest">Visit official_ajit_hake_07</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Work / Portfolio Section */}
        <section id="portfolio" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-xl text-left w-full">
                <h3 className="font-mono text-gold uppercase tracking-[0.3em] text-sm mb-6">Our Work</h3>
                <h2 className="font-epilogue text-4xl md:text-5xl font-black">Featured Showreels</h2>
                <p className="mt-4 text-white/40 font-medium">Click to view our latest viral content on Instagram.</p>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-3 mt-10">
                  {(['All', 'Video Editing', 'Branding', 'Web Development'] as WorkCategory[]).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-6 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest transition-all ${activeFilter === filter
                        ? 'bg-gold text-black border-gold shadow-[0_0_20px_rgba(233,195,73,0.3)]'
                        : 'bg-white/5 border border-white/10 text-white/60 hover:border-gold hover:text-white'
                        }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/adit_sing_999" target="_blank" rel="noreferrer" className="glass-border-blue px-6 py-3 rounded-full flex items-center gap-2 hover:bg-electric/10 transition-all font-mono text-[10px] uppercase font-bold tracking-widest text-electric">
                  <Instagram className="w-4 h-4" /> @adit_sing_999
                </a>
                <a href="https://www.instagram.com/official_ajit_hake_07" target="_blank" rel="noreferrer" className="glass-border-gold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gold/10 transition-all font-mono text-[10px] uppercase font-bold tracking-widest text-gold text-glow-gold">
                  <Instagram className="w-4 h-4" /> @ajit_hake_07
                </a>
              </div>
            </div>

            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredWorks.map((work, index) => (
                  <motion.a
                    layout
                    key={work.label}
                    href="https://www.instagram.com/adit_sing_999"
                    target="_blank"
                    initial={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)", rotate: -2 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      filter: "blur(0px)",
                      rotate: 0,
                      transition: {
                        delay: index * 0.08,
                        type: "spring",
                        stiffness: 120,
                        damping: 18,
                        mass: 1.2
                      }
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      y: -20,
                      filter: "blur(15px)",
                      rotate: 2,
                      transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] }
                    }}
                    whileHover={{
                      y: -12,
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                    className="group relative aspect-[9/16] rounded-xl overflow-hidden glass-border-gold block"
                  >
                    <img src={work.img} alt={work.label} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                      <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/40">
                        <ExternalLink className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6">
                      <span className="font-mono text-gold text-[10px] uppercase tracking-widest">{work.label}</span>
                      <div className="h-px w-0 group-hover:w-full bg-gold/50 transition-all duration-500 mt-1" />
                    </div>
                  </motion.a>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Short-Form Labs (Vertical Reels/Vlogs) */}
        <section className="py-32 px-6 bg-black relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 blur-[150px] -z-10" />
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h3 className="font-mono text-gold uppercase tracking-[0.4em] text-xs mb-6">Social Experiments</h3>
              <h2 className="font-epilogue text-4xl md:text-6xl font-black mb-8 leading-tight">Short-Form Labs</h2>
              <p className="text-white/40 max-w-xl mx-auto font-medium">Immersive mini-vlogs and viral shorts designed for the fast-paced digital era.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {REELS_DATA.map((reel, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative aspect-[9/16] rounded-3xl overflow-hidden glass-border-gold bg-white/5"
                >
                  {/* The Image Filling the Entire Box */}
                  <img
                    src={reel.img}
                    alt={reel.label}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />

                  {/* Immersive Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Labels and Stats */}
                  <div className="absolute inset-x-0 bottom-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                      <span className="font-mono text-[9px] font-bold text-white/50 uppercase tracking-widest">{reel.views} Views</span>
                    </div>
                    <h4 className="font-epilogue font-black text-lg text-white group-hover:text-gold transition-colors leading-tight">{reel.label}</h4>
                  </div>

                  {/* Play Indicator */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                    <Zap className="w-6 h-6 text-gold fill-gold" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages Section */}
        <section id="packages" className="py-32 px-6">
          <div className="max-w-7xl mx-auto text-center mb-20">
            <h3 className="font-mono text-gold uppercase tracking-[0.3em] text-sm mb-6">Pricing</h3>
            <h2 className="font-epilogue text-4xl md:text-6xl font-black mb-8 leading-tight">Service Packages</h2>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {PACKAGES.map((pkg, idx) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative p-10 rounded-xl flex flex-col ${pkg.recommended ? 'glass-border-gold bg-gold/5 scale-105 z-10 shadow-[0_0_50px_rgba(233,195,73,0.1)]' : 'glass-border-blue bg-white/5 opacity-80 hover:opacity-100 transition-opacity'}`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-black px-4 py-1 rounded-full text-xs font-bold font-mono uppercase">
                    Recommended
                  </div>
                )}
                <h4 className="font-epilogue text-2xl font-black mb-2 uppercase">{pkg.name}</h4>
                <p className="font-mono text-white/40 mb-8">{pkg.price}</p>

                {/* Visual Accent */}
                <div className="absolute top-10 right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  {idx === 0 ? <Video size={100} /> : idx === 1 ? <Zap size={100} /> : <Star size={100} />}
                </div>

                <div className="space-y-4 mb-10 flex-1">
                  {pkg.features.map(feat => (
                    <div key={feat} className="flex items-center gap-3">
                      <CheckCircle2 className={`w-5 h-5 ${pkg.recommended ? 'text-gold' : 'text-electric'}`} />
                      <span className="text-white/70 text-sm font-medium">{feat}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  className={`w-full py-4 text-center rounded-sm font-epilogue font-bold tracking-widest text-xs uppercase transition-all ${pkg.recommended ? 'bg-gold text-black hover:bg-white' : 'border border-electric text-electric hover:bg-electric hover:text-black'}`}
                >
                  Choose Plan
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6 relative overflow-hidden">
          {/* Cinematic Background Decoration */}
          <div className="absolute inset-0 w-full h-full z-0 opacity-100">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsOh688HmWCLKYu4x1XzkOMZi3DAMUTlCIHw&s"
              alt="Background Decoration"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-surface/50 via-transparent to-surface/80" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10 glass-border-gold rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] bg-black/80 backdrop-blur-xl">
            <div className="grid lg:grid-cols-2">
              <div className="p-12 lg:p-20 bg-gold/5 relative overflow-hidden">
                {/* Internal Cinematic Image Overlay */}
                <div className="absolute top-0 right-0 w-64 h-64 -mr-32 -mt-32 bg-gold/10 blur-[80px] rounded-full" />
                <h2 className="font-epilogue text-4xl md:text-6xl font-black mb-8">Let's build <br />your <span className="text-glow-gold italic italic">dream</span>.</h2>
                <div className="space-y-10">
                  <div className="flex gap-6 items-start">
                    <div className="glass-border-gold p-4 rounded-xl">
                      <Mail className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <p className="font-mono text-white/40 text-xs uppercase tracking-widest mb-1">Email Us</p>
                      <a href="mailto:aditsing999@gmail.com" className="font-epilogue text-xl font-bold hover:text-gold transition-colors">aditsing999@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="glass-border-gold p-4 rounded-xl">
                      <MessageCircle className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <p className="font-mono text-white/40 text-xs uppercase tracking-widest mb-1">Call / WhatsApp</p>
                      <a href="tel:7038990002" className="font-epilogue text-xl font-bold hover:text-gold transition-colors">+91 7038990002</a>
                    </div>
                  </div>
                </div>

                <div className="mt-20">
                  <p className="font-mono text-white/40 text-xs uppercase tracking-widest mb-6">Follow the movement</p>
                  <div className="flex gap-4">
                    <a href="https://www.instagram.com/adit_sing_999" target="_blank" rel="noreferrer" className="glass-border-gold p-4 rounded-full hover:bg-gold hover:text-black hover:scale-110 transition-all">
                      <Instagram />
                    </a>
                    <a href="https://www.instagram.com/official_ajit_hake_07" target="_blank" rel="noreferrer" className="glass-border-gold p-4 rounded-full hover:bg-gold hover:text-black hover:scale-110 transition-all">
                      <Instagram />
                    </a>
                    <a href="https://www.instagram.com/navnath_kadam_photowaala_?igsh=aG0zbG41bzk1a21p" target="_blank" rel="noreferrer" className="glass-border-gold p-4 rounded-full hover:bg-gold hover:text-black hover:scale-110 transition-all">
                      <Instagram />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-12 lg:p-20 bg-surface">
                <form className="space-y-8" onSubmit={(e) => {
                  e.preventDefault();
                  // Final check
                  const newErrors = {
                    name: validateField('name', formData.name),
                    email: validateField('email', formData.email),
                    message: validateField('message', formData.message)
                  };
                  setErrors(newErrors);
                  if (!newErrors.name && !newErrors.email && !newErrors.message) {
                    alert('Submission Successful! This is a demo.');
                  }
                }}>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <label className="font-mono text-xs uppercase text-white/40">Full Name</label>
                        {errors.name && <span className="text-[10px] text-red-500 font-mono uppercase tracking-tighter">{errors.name}</span>}
                      </div>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text"
                        className={`bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-sm p-4 focus:border-gold outline-none transition-all`}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <label className="font-mono text-xs uppercase text-white/40">Email Address</label>
                        {errors.email && <span className="text-[10px] text-red-500 font-mono uppercase tracking-tighter">{errors.email}</span>}
                      </div>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        className={`bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-sm p-4 focus:border-gold outline-none transition-all`}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs uppercase text-white/40">Project Type</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="bg-white/5 border border-white/10 rounded-sm p-4 focus:border-gold outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option>Video Editing & Post-Production</option>
                      <option>Brand Identity & Logo Design</option>
                      <option>Full-Stack Web Development</option>
                      <option>Digital Invites & Banners</option>
                      <option>Executive Branding Bundle</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label className="font-mono text-xs uppercase text-white/40">Your Vision</label>
                      {errors.message && <span className="text-[10px] text-red-500 font-mono uppercase tracking-tighter">{errors.message}</span>}
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={`bg-white/5 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-sm p-4 focus:border-gold outline-none transition-all resize-none`}
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                  <button
                    disabled={!!(errors.name || errors.email || errors.message)}
                    className={`w-full ${errors.name || errors.email || errors.message ? 'bg-white/10 text-white/20 cursor-not-allowed' : 'bg-gold text-black hover:bg-white hover:scale-[1.02] active:scale-[0.98]'} font-epilogue font-black py-4 uppercase tracking-[0.2em] transition-all`}
                  >
                    Send Inquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-10">
          <div className="flex flex-wrap justify-center gap-10">
            <a href="https://www.instagram.com/adit_sing_999" target="_blank" rel="noreferrer" className="font-mono text-xs text-white/40 hover:text-white hover:scale-105 uppercase transition-all">@adit_sing_999</a>
            <a href="https://www.instagram.com/official_ajit_hake_07" target="_blank" rel="noreferrer" className="font-mono text-xs text-white/40 hover:text-white hover:scale-105 uppercase transition-all">@official_ajit_hake_07</a>
            <a href="https://www.instagram.com/navnath_kadam_photowaala_?igsh=aG0zbG41bzk1a21p" target="_blank" rel="noreferrer" className="font-mono text-xs text-white/40 hover:text-white hover:scale-105 uppercase transition-all">@navnath_kadam</a>
            <a href="#" className="font-mono text-xs text-white/40 hover:text-white hover:scale-105 uppercase transition-all">Behance</a>
            <a href="#" className="font-mono text-xs text-white/40 hover:text-white hover:scale-105 uppercase transition-all">Vimeo</a>
          </div>

          <div className="text-center">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="w-6 h-6 bg-gradient-to-tr from-gold via-white to-electric rounded-lg" />
              <span className="font-epilogue font-black text-lg tracking-tighter uppercase">Aditya x Ajit x Navnath</span>
            </div>
            <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
              © 2024 Aditya & Ajit & Navnath. All rights reserved.
            </p>
            <p className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-4">
              Created with ❤️ by <span className="text-gold">Aditya Sadewale</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-10 right-10 z-[100] w-14 h-14 bg-gold text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(233,195,73,0.4)] hover:bg-white transition-colors group"
            title="Back up"
          >
            <ArrowUp className="w-6 h-6 transition-transform group-hover:-translate-y-1" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
