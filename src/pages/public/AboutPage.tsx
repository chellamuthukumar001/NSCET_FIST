import React from 'react';
import { ShieldCheck, Award, MapPin, Bus, Cpu, Trophy, CheckCircle } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-[#173B2F] text-white p-8 sm:p-14 shadow-2xl">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src="/assets/campus/campus-driveway-hills.jpg"
            alt="Campus Driveway"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-[#C49A55] uppercase tracking-wider">
            <span>Institutional Heritage</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Nadar Saraswathi College of Engineering & Technology
          </h1>
          <p className="text-sm sm:text-base text-[#DCE7E1] leading-relaxed">
            Theni District, Tamil Nadu. Approved by AICTE, New Delhi and affiliated to Anna University, Chennai. An autonomous institutional campus dedicated to engineering excellence, technological research, and ethical leadership.
          </p>
        </div>
      </div>

      {/* College Visual Gallery Grid using Uploaded Photos */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C49A55]">
              Campus Photography
            </span>
            <h2 className="text-2xl font-black text-[#17201C] tracking-tight">
              Our Physical Academic Ecosystem
            </h2>
          </div>
          <span className="text-xs text-[#66736C]">Theni, Tamil Nadu</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm group bg-white">
            <div className="aspect-video overflow-hidden">
              <img
                src="/assets/campus/nscet-entrance-gate.jpg"
                alt="Main Entrance Arch"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h4 className="text-sm font-bold text-[#17201C]">Main Entrance Boulevard</h4>
              <p className="text-xs text-[#66736C] mt-1">
                Official grand entrance archway greeting students and visitors with scenic Western Ghats foothills backdrop.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm group bg-white">
            <div className="aspect-video overflow-hidden">
              <img
                src="/assets/campus/academic-blocks-courtyard.jpg"
                alt="Academic Quad"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h4 className="text-sm font-bold text-[#17201C]">Central Academic Quadrangle</h4>
              <p className="text-xs text-[#66736C] mt-1">
                Multi-storey lecture halls, computing facilities, smart seminar auditoriums, and open study courtyards.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm group bg-white">
            <div className="aspect-video overflow-hidden">
              <img
                src="/assets/campus/campus-sports-quad.jpg"
                alt="Sports and Bus Fleet"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h4 className="text-sm font-bold text-[#17201C]">Sports Complex & Bus Transit</h4>
              <p className="text-xs text-[#66736C] mt-1">
                International-standard basketball arena and transit convoy connecting all major towns in Theni and Dindigul.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vision, Mission, CSE Fraternity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
          <div className="w-10 h-10 rounded-xl bg-[#173B2F]/10 text-[#173B2F] flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-[#17201C]">Institutional Vision</h3>
          <p className="text-xs sm:text-sm text-[#66736C] leading-relaxed">
            To emerge as a premier institution of technological education and research, imparting global competence, ethical leadership, and creative innovation to engineers from rural and semi-urban backgrounds.
          </p>
          <ul className="space-y-2 text-xs text-[#17201C] pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Accredited Anna University Regulation 2021 curriculum</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full institutional scholarship support for first-generation graduates</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Industry co-developed labs with Zoho, TCS, and AWS</span>
            </li>
          </ul>
        </div>

        {/* CSE Department Emblem Spotlight */}
        <div className="p-8 rounded-3xl bg-[#101815] text-white border border-white/10 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[#C49A55] shadow-md">
                <img src="/assets/campusiq-logo.png" alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-[#C49A55] uppercase tracking-wider block">
                  Department of CSE
                </span>
                <h3 className="text-lg font-bold text-white">
                  Fraternity of Immortal Software Technocrats
                </h3>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              The official association powering CAMPUSIQ. Built with a commitment to open digital learning, anonymous student feedback channels, and cutting-edge artificial intelligence.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-[#A2B6AC]">
            <span className="font-semibold text-white">CampusIQ Motto:</span> "Learn. Connect. Be Heard."
          </div>
        </div>
      </div>

    </div>
  );
};

