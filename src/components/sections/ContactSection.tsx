import { motion } from 'motion/react';
import { Mail, MapPin, Github, ArrowRight } from 'lucide-react';
import { OWNER, CERTIFICATIONS } from '../../data/portfolio';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="hero-section-panel section-4 relative z-20 flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-6 py-24 md:px-24"
    >
      {/* HUD Background Rings */}
      <div data-speed="0.8" className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="hero-hud-ring-1 absolute h-[300px] w-[300px] rounded-full border md:h-[600px] md:w-[600px]" />
        <div className="hero-hud-ring-2 absolute h-[450px] w-[450px] rounded-full border md:h-[900px] md:w-[900px]" />
        <div className="hero-hud-ring-3 absolute h-[150px] w-[150px] rounded-full border md:h-[300px] md:w-[300px]" />
        <div className="hero-hud-crosshair absolute h-[1px] w-full" />
        <div className="hero-hud-crosshair absolute h-full w-[1px]" />
        <div className="hero-hud-center absolute h-4 w-4 rounded-full border" />
      </div>

      <div className="w-full flex flex-col md:flex-row gap-12 justify-between items-center relative z-30">
        
        {/* Left Column Content (Takes 55% width, holds both items) */}
        <div className="w-full md:w-[55%] flex flex-col gap-12">
          {/* Section Header */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="status-dot-cyan animate-pulse" />
              <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-[color:var(--accent-cyan)]">
                // 04 / LET'S CONNECT
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase leading-[0.9] tracking-tighter text-[color:var(--text-primary)] flex flex-col mt-2">
              <span className="motion-mask overflow-hidden">
                <span className="motion-line inline-block text-transparent [-webkit-text-stroke:1.5px_rgba(248,250,252,0.2)]" data-reveal-title>
                  GET IN
                </span>
              </span>
              <span className="motion-mask overflow-hidden">
                <span className="motion-line inline-block text-[color:var(--text-primary)] drop-shadow-[0_0_30px_rgba(255,255,255,0.06)]" data-reveal-title>
                  TOUCH
                </span>
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Certifications */}
            <div className="flex flex-col gap-6" data-reveal-certifications>
              <motion.div
                className="group relative rounded-[2rem] border border-[color:var(--border-glass)] bg-[color:var(--surface-card)] p-1 transition-all duration-300 h-full"
                whileHover={{
                  y: -5,
                  borderColor: 'var(--accent-cyan)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div className="flex flex-col gap-6 rounded-[calc(2rem-4px)] bg-[color:var(--surface-glass)] backdrop-blur-md p-7 shadow-[var(--shadow-glass)] h-full">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[color:var(--text-muted)] font-mono">
                      Credentials
                    </span>
                    <div className="flex items-center gap-6">
                      <div className="h-16 w-[2px] bg-[color:var(--accent-cyan)]" />
                      <div className="flex flex-col">
                        <span className="font-display text-3xl font-black text-[color:var(--text-primary)]">
                          CERTIFICATIONS
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[color:var(--text-muted)] font-mono">
                          Verified Achievements
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-6 mt-4 pl-6 border-l border-[color:var(--border-subtle)]">
                    {CERTIFICATIONS.map((c) => (
                      <div key={c.name} className="flex flex-col gap-1 transition-all duration-300 hover:translate-x-2">
                        <span className="text-base font-bold text-[color:var(--text-primary)]">{c.name}</span>
                        <span className="text-xs text-[color:var(--text-secondary)] font-mono">{c.issuer} · {c.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-6" data-reveal-contact>
              <motion.div
                className="group relative rounded-[2rem] border border-[color:var(--border-glass)] bg-[color:var(--surface-card)] p-1 transition-all duration-300 h-full"
                whileHover={{
                  y: -5,
                  borderColor: 'var(--accent-orange)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <div className="flex flex-col gap-6 rounded-[calc(2rem-4px)] bg-[color:var(--surface-glass)] backdrop-blur-md p-7 shadow-[var(--shadow-glass)] h-full justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col items-start gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[color:var(--text-muted)] font-mono">
                        Info
                      </span>
                      <div className="flex items-center gap-6">
                        <div className="h-16 w-[2px] bg-[color:var(--accent-orange)]" />
                        <div className="flex flex-col items-start">
                          <span className="font-display text-3xl font-black text-[color:var(--text-primary)]">
                            CONTACT DETAILS
                          </span>
                        </div>
                      </div>
                    </div>
                  
                  <div className="flex flex-col items-start gap-4 mt-4">
                    <a
                      href={`mailto:${OWNER.email}`}
                      className="group flex items-center gap-3 text-sm font-bold text-[color:var(--text-primary)] transition-colors hover:text-[color:var(--accent-orange)] font-mono"
                    >
                      <Mail size={16} />
                      {OWNER.email}
                    </a>
                    <p className="text-sm text-[color:var(--text-secondary)] font-mono">{OWNER.phone}</p>
                    <p className="flex items-center gap-2 text-sm text-[color:var(--text-secondary)] font-mono">
                      <MapPin size={14} />
                      {OWNER.location}
                    </p>
                    <a
                      href={`https://${OWNER.github}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-[color:var(--text-secondary)] transition-colors hover:text-[color:var(--accent-cyan)] font-mono"
                    >
                      <Github size={16} />
                      {OWNER.github}
                    </a>
                  </div>
                </div>

                <motion.a
                  href={`mailto:${OWNER.email}`}
                  className="group relative inline-flex items-center justify-between gap-6 cursor-pointer rounded-full bg-gradient-to-r from-[color:var(--accent-orange)] to-[color:var(--accent-orange-hover)] pl-8 pr-3 py-3 text-xs font-extrabold uppercase tracking-widest text-white shadow-[var(--shadow-orange)] mt-6 self-start"
                  data-motion="magnetic"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <span>SEND EMAIL</span>
                  <motion.span 
                    className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center"
                    whileHover={{ x: 4, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                  >
                    <ArrowRight size={14} />
                  </motion.span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

        {/* Right Column Spacer for 3D Model (Takes 40% width) */}
        <div className="w-full md:w-[40%] h-[300px] md:h-[400px] pointer-events-none" />
      </div>
    </section>
  );
}
