import React from "react";
import { motion } from "framer-motion";
import { Star, Github, ExternalLink, ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project, onOpenModal }) {
  const isFeatured = project.featured === true;
  const isLink = isFeatured || (project.link && project.link.startsWith("http"));

  const technologies = project.technologies || [];
  const keyFeatures = project.keyFeatures || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group glass-card rounded-xl overflow-hidden cursor-pointer"
      style={
        isFeatured
          ? {
              background: "linear-gradient(135deg, rgba(var(--color-accent-rgb), 0.08), rgba(var(--color-primary-rgb), 0.05))",
              border: "1px solid rgba(var(--color-accent-rgb), 0.2)",
            }
          : {}
      }
      onClick={() => onOpenModal?.(project)}
    >
      {/* Project Header with Gradient */}
      <div
        className="relative h-32 flex items-end p-4"
        style={{
          background: isFeatured
            ? "linear-gradient(135deg, var(--color-primary), var(--color-accent))"
            : "linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.2), rgba(var(--color-accent-rgb), 0.1))",
        }}
      >
        {isFeatured && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "white",
            }}
          >
            <Star size={12} />
            Featured
          </motion.div>
        )}

        {/* Project Icon/Placeholder */}
        <div className="absolute top-3 left-3">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              color: "white",
            }}
          >
            {project.title.charAt(0)}
          </div>
        </div>

        {/* View Button */}
        <motion.div
          className="absolute top-3 right-3 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: "white",
          }}
          whileHover={{ scale: 1.1 }}
        >
          <ArrowUpRight size={16} />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h4
          className={`font-bold mb-2 ${isFeatured ? "text-lg" : "text-base"}`}
          style={{ color: "var(--color-accent)" }}
        >
          {project.title}
        </h4>

        <p className="text-sm mb-3 leading-relaxed line-clamp-2" style={{ color: "var(--color-text-secondary)" }}>
          {project.description}
        </p>

        {/* Key Features */}
        {keyFeatures.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold mb-1.5" style={{ color: "var(--color-text-muted)" }}>
              Key Features
            </p>
            <div className="flex flex-wrap gap-1.5">
              {keyFeatures.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: "rgba(var(--color-primary-rgb), 0.08)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {typeof feature === "string" ? feature : feature.label || feature.text}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold mb-1.5" style={{ color: "var(--color-text-muted)" }}>
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {technologies.slice(0, 4).map((tech, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    backgroundColor: "rgba(var(--color-accent-rgb), 0.1)",
                    color: "var(--color-accent)",
                    border: "1px solid rgba(var(--color-accent-rgb), 0.2)",
                  }}
                >
                  {tech}
                </span>
              ))}
              {technologies.length > 4 && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "rgba(var(--color-text-muted), 0.1)",
                    color: "var(--color-text-muted)",
                  }}
                >
                  +{technologies.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2" style={{ borderTop: "1px solid var(--color-border)" }}>
          {project.github && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{
                backgroundColor: "rgba(var(--color-accent-rgb), 0.1)",
                color: "var(--color-accent)",
              }}
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.github, "_blank");
              }}
            >
              <Github size={12} />
              Code
            </motion.button>
          )}
          {isLink && project.link && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{
                backgroundColor: "rgba(var(--color-primary-rgb), 0.1)",
                color: "var(--color-primary)",
              }}
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.link, "_blank");
              }}
            >
              <ExternalLink size={12} />
              Live Demo
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
