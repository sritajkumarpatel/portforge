import React, { useState } from "react";
import { Sun, Moon, Palette, Home, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function Nav({ activeSection, scrollToSection, config, scrollProgress }) {
  const { theme, toggleMode, setPreset, presets, mounted } = useTheme();
  const [showPresets, setShowPresets] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const enabledSections = (config.sections || []).filter((s) => s.enabled !== false);
  const navItems = [
    { id: "hero", label: "Home", icon: Home },
    ...enabledSections.map((s) => ({ id: s.id, label: s.navLabel || s.label })),
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return (
      <nav className="nav-bg fixed top-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-extrabold" style={{ color: "var(--color-primary)" }}>
            {config.personal.name}
          </h1>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav className="nav-bg fixed top-0 w-full z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg font-extrabold cursor-pointer"
            style={{ color: "var(--color-primary)" }}
            onClick={() => scrollToSection("hero")}
          >
            {config.personal.name}
          </motion.h1>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeSection === item.id
                      ? ""
                      : "hover:opacity-80"
                  }`}
                  style={{
                    color: activeSection === item.id ? "var(--color-primary)" : "var(--color-text-muted)",
                    backgroundColor: activeSection === item.id ? "rgba(var(--color-primary-rgb), 0.1)" : "transparent",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.icon && <item.icon size={12} className="inline mr-1" />}
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                      style={{ backgroundColor: "var(--color-primary)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            <div className="flex items-center gap-1 ml-2">
              <AnimatePresence>
                {showPresets && (
                  <motion.div
                    initial={{ opacity: 0, x: 20, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: "auto" }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    className="glass-card rounded-xl p-3 min-w-[180px] z-50"
                    style={{ position: "absolute", right: "80px", top: "60px" }}
                  >
                    <p className="text-xs mb-2 px-2" style={{ color: "var(--color-text-muted)" }}>
                      Color Presets
                    </p>
                    {Object.entries(presets).map(([key, preset]) => (
                      <button
                        key={key}
                        onClick={() => setPreset(key)}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all"
                        style={{
                          color: theme.primary === preset.primary ? "var(--color-primary)" : "var(--color-text-secondary)",
                          backgroundColor: theme.primary === preset.primary ? "rgba(var(--color-primary-rgb), 0.1)" : "transparent",
                        }}
                      >
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{
                            background: `linear-gradient(135deg, ${presets[key].primary === "frost" ? "#38bdf8" : presets[key].primary === "blue" ? "#2563eb" : presets[key].primary === "purple" ? "#8f3be7" : presets[key].primary}, ${presets[key].accent === "cyan" ? "#06b6d4" : presets[key].accent === "pink" ? "#ec4899" : presets[key].accent})`,
                          }}
                        />
                        {key.replace("-", " / ")}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                onClick={() => setShowPresets(!showPresets)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 rounded-lg transition-colors"
                style={{
                  backgroundColor: "rgba(var(--color-primary-rgb), 0.1)",
                  color: "var(--color-primary)",
                }}
                aria-label="Color presets"
              >
                <Palette size={16} />
              </motion.button>

              <motion.button
                onClick={toggleMode}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                className="p-1.5 rounded-lg transition-colors"
                style={{
                  backgroundColor: "rgba(var(--color-primary-rgb), 0.1)",
                  color: "var(--color-primary)",
                }}
                aria-label={theme.mode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme.mode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </motion.button>
            </div>
          </div>
        </div>

        <motion.div
          className="h-0.5"
          style={{
            background: `linear-gradient(to right, var(--color-primary), var(--color-accent))`,
            width: `${scrollProgress}%`,
          }}
          transition={{ duration: 0.1 }}
        />
      </nav>

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => scrollToSection("hero")}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-bg-primary)",
            }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
