import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  isDarkMode: boolean;
}

export const ContactPage: React.FC<ContactPageProps> = ({ isDarkMode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSent(true);
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0f0f12] text-white' : 'bg-[#fcf9f8] text-[#1c1b1b]'
    }`}>
      <div className="text-center mb-10">
        <span className="text-xs font-montserrat font-bold uppercase tracking-[0.3em] text-[#92003a] dark:text-pink-400">
          3 LUNAS BOUTIQUE
        </span>
        <h1 className="font-serif-chic font-bold text-3xl sm:text-4xl mt-1">
          3 Lunas Contact Page
        </h1>
      </div>

      <div className={`p-6 sm:p-10 rounded-2xl border shadow-2xl ${
        isDarkMode ? 'bg-[#141418] border-neutral-800' : 'bg-white border-neutral-200'
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Form */}
          <div className="space-y-6">
            <h2 className="font-serif-chic font-bold text-2xl border-b border-neutral-800 pb-2">
              Envíanos un mensaje
            </h2>

            {sent ? (
              <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="font-serif-chic font-bold text-lg text-emerald-300">¡Mensaje enviado con éxito!</h3>
                <p className="text-xs text-neutral-300">Erika o su equipo te responderán a la brevedad.</p>
                <button
                  onClick={() => setSent(false)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded text-xs font-bold uppercase mt-2 cursor-pointer"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans-body">
                <div>
                  <label className="block text-xs font-montserrat font-semibold text-neutral-400 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-700/80 text-white placeholder-neutral-500 focus:outline-none focus:border-[#B87333] text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-montserrat font-semibold text-neutral-400 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-700/80 text-white placeholder-neutral-500 focus:outline-none focus:border-[#B87333] text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-montserrat font-semibold text-neutral-400 mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-neutral-900 border border-neutral-700/80 text-white placeholder-neutral-500 focus:outline-none focus:border-[#B87333] text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-copper-gradient text-white font-montserrat font-bold text-xs uppercase tracking-widest transition-all shadow-copper-glow hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* Right Map Canvas & Details */}
          <div className="space-y-6">
            {/* Map Canvas Representation matching Image 11 */}
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-neutral-800 bg-[#1e232a] shadow-inner group">
              {/* Map grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a303c_1px,transparent_1px),linear-gradient(to_bottom,#2a303c_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />

              {/* Coastline visual simulation */}
              <div className="absolute inset-y-0 right-0 w-2/5 bg-[#121720] border-l border-[#3a4454]/40" />

              {/* Pin marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
                <div className="p-2 rounded-full bg-[#B87333] text-white shadow-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 rounded bg-black/80 text-white font-montserrat font-bold text-[10px] mt-1 shadow border border-neutral-700">
                  Cambrils
                </span>
              </div>
            </div>

            {/* Address & Contacts */}
            <div className="space-y-4 font-sans-body text-xs text-neutral-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#B87333] shrink-0 mt-0.5" />
                <p>Carrer de les Tres Llunes, 12, 43850 Cambrils, Tarragona, Spain</p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#B87333] shrink-0" />
                <p>+34 977 123 456</p>
              </div>

              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <p>+34 600 123 456</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
