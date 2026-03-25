import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, MapPin, Star, Users, Phone, ChevronDown, Sparkles } from 'lucide-react';
import { THEMES, VENUES, DECOR_STYLES, FAQS } from './constants';
import IntakeForm from './components/IntakeForm';
import { cn } from './lib/utils';

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#fdf6f3] text-[#4b1248] font-sans selection:bg-[#fad6d6]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#fdf6f3]/80 backdrop-blur-md border-b border-[#fad6d6]/30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter flex items-center">
            <span className="text-[#4b1248]">Shaadi</span>
            <span className="text-[#ff5757]">Me</span>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="px-6 py-2.5 bg-[#ff5757] text-white rounded-full font-medium hover:bg-[#ff5757]/90 transition-all shadow-md shadow-[#ff5757]/20"
          >
            Start Planning
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1920" 
            alt="Wedding Hero"
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#fdf6f3] via-transparent to-[#fdf6f3]" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-serif leading-tight mb-8">
              Come to your wedding <br />
              <span className="italic text-[#ff5757]">as a guest.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
              We handle the vendors, the quotes, and the chaos. You handle the celebration.
            </p>
            <button 
              onClick={() => setShowForm(true)}
              className="px-12 py-5 bg-[#ff5757] text-white rounded-full text-xl font-medium hover:scale-105 transition-all shadow-xl shadow-[#ff5757]/30 flex items-center mx-auto"
            >
              Start Planning Your Dream Day
              <Sparkles className="ml-3 w-6 h-6" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Wedding Themes */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-serif mb-4">Wedding Themes</h2>
          <p className="text-gray-500">Inspirational aesthetics tailored to your story.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {THEMES.map((theme, i) => (
            <motion.div 
              key={theme.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
            >
              <img 
                src={theme.image} 
                alt={theme.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4b1248]/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-8">
                <h3 className="text-2xl font-serif text-white mb-2">{theme.name}</h3>
                <p className="text-white/70 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {theme.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Types of Venues */}
      <section className="py-24 bg-[#4b1248] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-serif mb-4">Types of Venues</h2>
            <p className="text-white/60">From historic palaces to modern ballrooms.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {VENUES.map((venue, i) => (
              <motion.div 
                key={venue.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-6"
              >
                <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                  <img 
                    src={venue.image} 
                    alt={venue.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-serif mb-2">{venue.name}</h3>
                  <p className="text-white/60">{venue.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Decoration Styles */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-serif mb-4">Decoration Styles</h2>
          <p className="text-gray-500">Visual mood boards for your celebration.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {DECOR_STYLES.map((style, i) => (
            <motion.div 
              key={style.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative rounded-2xl overflow-hidden",
                i % 3 === 0 ? "col-span-2 row-span-2 h-[600px]" : "h-[292px]"
              )}
            >
              <img 
                src={style.image} 
                alt={style.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-colors" />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                {style.name}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why ShaadiMe */}
      <section className="py-24 bg-[#fad6d6]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif mb-4">Why ShaadiMe?</h2>
            <p className="text-gray-500">The promise of a stress-free journey.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { icon: Heart, title: 'Complete Convenience', desc: 'You plan once. We handle the rest. No follow-ups, no panic.' },
              { icon: Star, title: 'Personalised to You', desc: 'From 50 to 1000 guests, we tailor everything to your vision.' },
              { icon: Phone, title: 'One Point of Contact', desc: 'One planner for everything. No juggling 15 different numbers.' },
              { icon: Users, title: 'Made for Indian Weddings', desc: 'We understand the rituals, the scale, and the emotions.' },
              { icon: Sparkles, title: 'You are the Guest', desc: 'Come to your own wedding without a to-do list.' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-[#ff5757]/10 rounded-2xl flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-[#ff5757]" />
                </div>
                <h3 className="text-lg font-serif mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Launch Cities */}
      <section className="py-24 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-serif mb-16">Now Launching In</h2>
        <div className="flex flex-wrap justify-center gap-12 md:gap-24">
          {['Bengaluru', 'Chennai', 'Hyderabad'].map((city, i) => (
            <motion.div 
              key={city}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-default"
            >
              <div className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:shadow-xl transition-all border border-[#fad6d6]/30">
                <MapPin className="w-12 h-12 text-[#ff5757]" />
              </div>
              <h3 className="text-2xl font-serif">{city}</h3>
              <p className="text-[#ff5757] text-sm font-medium mt-2">We are here.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-serif mb-12 text-center">Common Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <div key={i} className="border-b border-gray-100">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full py-6 flex items-center justify-between text-left group"
                >
                  <span className="text-lg font-medium group-hover:text-[#ff5757] transition-colors">{faq.question}</span>
                  <ChevronDown className={cn("w-5 h-5 transition-transform", openFaq === i && "rotate-180")} />
                </button>
                <motion.div 
                  initial={false}
                  animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-gray-500 leading-relaxed">{faq.answer}</p>
                </motion.div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-6">Still have questions?</p>
            <button 
              onClick={() => setShowForm(true)}
              className="px-8 py-3 bg-[#4b1248] text-white rounded-full hover:bg-[#4b1248]/90 transition-all"
            >
              Start planning and we will sort everything out
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100 text-center text-gray-400 text-sm">
        <div className="text-xl font-bold tracking-tighter flex items-center justify-center mb-4">
          <span className="text-[#4b1248]">Shaadi</span>
          <span className="text-[#ff5757]">Me</span>
        </div>
        <p>© 2026 ShaadiMe. All rights reserved. | Confidential</p>
      </footer>

      {/* Intake Form Modal */}
      {showForm && <IntakeForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
