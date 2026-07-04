import React from "react";
import { motion } from "framer-motion";
import { Code2, Briefcase, Zap, Clock, Monitor, Cpu } from "lucide-react";
import {
  SiJavascript, SiAnthropic, SiGithub, SiGithubactions
} from "react-icons/si";

const bentoItems = [
  {
    icon: Code2,
    label: "What I Build",
    value: "AI + Automation",
    description: "Intelligent workflows and test frameworks",
    color: "#8b5cf6",
  },
  {
    icon: Briefcase,
    label: "What I Do",
    value: "Architect & Automate",
    description: "Build systems, lead teams, ship quality",
    color: "#10b981",
  },
  {
    icon: Clock,
    label: "Experience",
    value: "11+ Years",
    description: "QA Engineer to Automation Architect",
    color: "#f59e0b",
  },
  {
    icon: Zap,
    label: "Focus",
    value: "QE + Agentic AI",
    description: "Quality engineering meets AI",
    color: "#ec4899",
  },
];

const tools = [
  { name: "Playwright", icon: Monitor, color: "#2ead33" },
  { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
  { name: "MCPs", icon: Cpu, color: "#8b5cf6" },
  { name: "Claude", icon: SiAnthropic, color: "#d4a574" },
  { name: "GitHub", icon: SiGithub, color: "#ffffff" },
  { name: "GitHub Actions", icon: SiGithubactions, color: "#2088ff" },
];

export default function BentoGrid() {
  return (
    <section className="py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* 4 equal cards — no spanning */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {bentoItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                <div
                  className="p-2 rounded-lg flex-shrink-0"
                  style={{ backgroundColor: `${item.color}18` }}
                >
                  <item.icon size={18} style={{ color: item.color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-wider mb-0.5" style={{ color: "var(--color-text-muted)" }}>
                    {item.label}
                  </p>
                  <p className="font-semibold text-sm leading-tight" style={{ color: "var(--color-text-primary)" }}>
                    {item.value}
                  </p>
                  <p className="text-[11px] mt-0.5 leading-snug" style={{ color: "var(--color-text-muted)" }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Daily Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="mt-3 glass-card rounded-xl p-3"
        >
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
              Daily Tools
            </p>
            <div className="flex items-center gap-4">
              {tools.map((tool) => (
                <motion.div
                  key={tool.name}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="flex items-center gap-1.5 cursor-default"
                >
                  <tool.icon size={15} style={{ color: tool.color }} />
                  <span className="text-xs font-medium hidden sm:inline" style={{ color: "var(--color-text-secondary)" }}>
                    {tool.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
