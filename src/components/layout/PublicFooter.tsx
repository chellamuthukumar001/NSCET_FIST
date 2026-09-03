import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="relative bg-[#101815] text-white/80 border-t border-white/10 overflow-hidden">
      {/* Background subtle campus image texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-luminosity">
        <img
          src="/assets/campus/academic-blocks-courtyard.jpg"
          alt="NSCET Quad"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Column 1: College & Logo */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#C49A55]/50 shadow-md">
                <img
                  src="/assets/campusiq-logo.png"
                  alt="CAMPUSIQ"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                  <span>CAMPUS</span>
                  <span className="text-[#6FA9C9]">IQ</span>
                </div>
                <div className="text-xs text-[#C49A55] font-medium tracking-wide">
                  Learn. Connect. Be Heard.
                </div>
              </div>
            </div>

            <p className="text-xs text-white/60 leading-relaxed">
              Nadar Saraswathi College of Engineering & Technology (NSCET), Theni. An intelligent institutional ecosystem connecting students, faculty, learning resources, and voice.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>AI Anonymity & PII Protected</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#C49A55] mb-4">
              Academic Hub
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/public-learning" className="hover:text-white transition-colors">
                  YouTube Learning Hub
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">
                  Anna University Regulations 2021
                </Link>
              </li>
              <li>
                <Link to="/departments" className="hover:text-white transition-colors">
                  Academic Departments (CSE, AI&DS, ECE)
                </Link>
              </li>
              <li>
                <Link to="/student/quiz" className="hover:text-white transition-colors">
                  AI Practice Quizzes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Student Voice & Support */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#C49A55] mb-4">
              Student Voice
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/student/feedback" className="hover:text-white transition-colors">
                  Anonymous Feedback Portal
                </Link>
              </li>
              <li>
                <Link to="/admin/closed-loop" className="hover:text-white transition-colors">
                  Closed-Loop Resolution Tracker
                </Link>
              </li>
              <li>
                <Link to="/student/assistant" className="hover:text-white transition-colors">
                  CampusIQ Multilingual Copilot
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Campus Facilities & Bus Routes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Campus Info */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#C49A55] mb-4">
              Campus Location
            </h4>
            <div className="flex items-start gap-2 text-xs text-white/70">
              <MapPin className="w-4 h-4 text-[#6FA9C9] shrink-0 mt-0.5" />
              <span>
                Vadapudupatti, Annanji (PO), Theni - 625 531, Tamil Nadu, India.
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Mail className="w-4 h-4 text-[#6FA9C9] shrink-0" />
              <span>principal@nscet.org / cse@nscet.org</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/70">
              <Phone className="w-4 h-4 text-[#6FA9C9] shrink-0" />
              <span>+91 4546 263900 / 901</span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40 gap-4">
          <div>
            © {new Date().getFullYear()} Nadar Saraswathi College of Engineering & Technology. Department of Computer Science & Engineering. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Security & RAG Safeguards</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Anna University Affiliated</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

