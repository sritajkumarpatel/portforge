import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, ChevronRight } from 'lucide-react';
import Section from './Section';

const cardVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function Experience({ experience }) {
  return (
    <Section>
      <div className="flex items-center gap-3 mb-8">
        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
          <Briefcase style={{ color: 'var(--color-primary)' }} size={32} />
        </motion.div>
        <h3 className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
          <span style={{ color: 'var(--color-accent)', fontSize: '0.75em', marginRight: '0.5rem' }}>
            02
          </span>
          Experience
        </h3>
      </div>

      {/* Career Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-xl p-6 mb-8"
      >
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
              2015 → 2026
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Career Span
            </p>
          </div>
          <div
            className="w-px h-10 hidden md:block"
            style={{ backgroundColor: 'var(--color-border)' }}
          />
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--color-accent)' }}>
              4 Companies
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Organizations
            </p>
          </div>
          <div
            className="w-px h-10 hidden md:block"
            style={{ backgroundColor: 'var(--color-border)' }}
          />
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
              QE → Architect
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Career Growth
            </p>
          </div>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div
          className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5"
          style={{
            background:
              'linear-gradient(to bottom, var(--color-primary), var(--color-accent), var(--color-primary))',
          }}
        />

        <div className="space-y-8">
          {experience.map((exp, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative pl-12 md:pl-20"
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute left-2 md:left-6 w-5 h-5 rounded-full border-2"
                style={{
                  borderColor: 'var(--color-primary)',
                  backgroundColor: exp.current ? 'var(--color-primary)' : 'var(--color-bg-primary)',
                  top: '1.5rem',
                }}
                whileHover={{ scale: 1.5 }}
              >
                {exp.current && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>

              <motion.div whileHover={{ y: -5 }} className="glass-card rounded-xl p-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                  <div>
                    <h4
                      className="text-xl md:text-2xl font-bold"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {exp.company}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <span
                        className="flex items-center gap-1 text-sm"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        <Calendar size={14} />
                        {exp.duration}
                      </span>
                      <span
                        className="flex items-center gap-1 text-sm"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                  {exp.current && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="px-3 py-1 rounded-full text-sm font-semibold self-start"
                      style={{
                        backgroundColor: 'rgba(16, 185, 129, 0.2)',
                        color: '#6ee7b7',
                      }}
                    >
                      Current
                    </motion.span>
                  )}
                </div>

                {/* Roles */}
                <div className="mb-4">
                  {exp.roles.map((role, roleIndex) => (
                    <motion.div
                      key={roleIndex}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 py-2"
                    >
                      <ChevronRight size={16} style={{ color: 'var(--color-accent)' }} />
                      <span
                        className="font-semibold"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {role.title}
                      </span>
                      <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                        ({role.period})
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Responsibilities */}
                {exp.currentRolesAndResponsibilities &&
                  exp.currentRolesAndResponsibilities.length > 0 && (
                    <div className="mb-4">
                      <h5
                        className="text-sm font-semibold mb-2"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        Roles & Responsibilities
                      </h5>
                      <ul className="space-y-1">
                        {exp.currentRolesAndResponsibilities.slice(0, 5).map((item, iIndex) => (
                          <li
                            key={iIndex}
                            className="text-sm flex items-start gap-2"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            <span style={{ color: 'var(--color-accent)' }}>•</span>
                            <span>{typeof item === 'string' ? item : item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* Highlights */}
                {(!exp.currentRolesAndResponsibilities ||
                  exp.currentRolesAndResponsibilities.length === 0) &&
                  exp.highlights &&
                  exp.highlights.length > 0 && (
                    <div className="mb-4">
                      <h5
                        className="text-sm font-semibold mb-2"
                        style={{ color: 'var(--color-primary)' }}
                      >
                        Highlights
                      </h5>
                      <ul className="space-y-1">
                        {exp.highlights.slice(0, 4).map((highlight, hIndex) => (
                          <li
                            key={hIndex}
                            className="text-sm flex items-start gap-2"
                            style={{ color: 'var(--color-text-secondary)' }}
                          >
                            <span style={{ color: 'var(--color-accent)' }}>•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* Awards */}
                {exp.awards && exp.awards.length > 0 && (
                  <div className="pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
                    <h5
                      className="text-sm font-semibold mb-2 flex items-center gap-2"
                      style={{ color: '#fcd34d' }}
                    >
                      Awards
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {exp.awards.map((award, aIndex) => (
                        <motion.span
                          key={aIndex}
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: 'rgba(234, 179, 8, 0.1)',
                            color: '#fcd34d',
                            border: '1px solid rgba(234, 179, 8, 0.2)',
                          }}
                        >
                          {award.name || award}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
