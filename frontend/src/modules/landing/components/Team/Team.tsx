"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
} from "react-icons/fa6";

interface TeamMember {
  name: string;
  role: string;
  image: any;
  socials: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export default function TeamSection({
  badge,
  title,
  members,
}: {
  badge: string;
  title: string;
  members: TeamMember[];
}) {
  return (
    <section className="py-24 bg-white" aria-labelledby="team-heading">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Header */}
        <div className="mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 bg-[#923CF9]/10 text-[#923CF9] text-xs font-bold uppercase tracking-widest rounded-full">
            {badge}
          </span>
          <h2
            id="team-heading"
            className="text-4xl md:text-5xl font-extrabold text-slate-900"
          >
            {title}
          </h2>
        </div>

        {/* Members Grid - Centered for 3 people */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 justify-center">
          {members.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }} // "Lift" effect
              className="group"
            >
              {/* Image Container with Shadow */}
              <div className="relative aspect-[4/5] mb-6 rounded-[32px] overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <Image
                  src={member.image}
                  alt={`Portrait of ${member.name}`} // WAI-ARIA alt text
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Info */}
              <h3 className="text-2xl font-bold text-slate-900">
                {member.name}
              </h3>
              <p className="text-[#923CF9] font-medium mb-4">{member.role}</p>

              {/* Social Icons with WAI-ARIA labels */}
              <div className="flex justify-center gap-4">
                {Object.entries(member.socials).map(([platform, url]) => {
                  const Icon = {
                    facebook: FaFacebookF,
                    instagram: FaInstagram,
                    linkedin: FaLinkedin,
                    twitter: FaXTwitter,
                  }[platform as keyof typeof member.socials];
                  return (
                    url && (
                      <a
                        key={platform}
                        href={url}
                        className="p-2 text-slate-400 hover:text-[#923CF9] transition-colors"
                        aria-label={`Visit ${member.name}'s ${platform} profile`}
                      >
                        {Icon && <Icon size={20} />}
                      </a>
                    )
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
