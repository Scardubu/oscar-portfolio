"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Skill } from "@/app/lib/constants";
import { SKILLS } from "@/app/lib/constants";
import { TechGraph } from "./TechGraph";
import { SkillCloud } from "./SkillCloud";
import { CategoryFilters } from "./CategoryFilters";
import { Certifications } from "./Certifications";
import { SkillModal } from "./SkillModal";

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<
    Skill["category"] | "all"
  >("all");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // PRD: Mobile detection for graph/grid toggle (<768px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Filter skills by category
  const filteredSkills =
    activeCategory === "all"
      ? SKILLS
      : SKILLS.filter((skill) => skill.category === activeCategory);

  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(skill);
  };

  const handleCloseModal = () => {
    setSelectedSkill(null);
  };

  return (
    <section
      id="skills"
      aria-label="Skills and expertise"
      className="relative min-h-screen w-full bg-linear-to-b from-bg-primary via-bg-secondary to-bg-primary px-6 py-20 lg:px-12 lg:py-32"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-16 max-w-7xl text-center"
      >
        <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-white lg:text-5xl xl:text-6xl">
          Technical <span className="text-gradient-accent">Stack</span>
        </h2>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300 lg:text-xl xl:text-2xl">
          The tools I use to ship ML products&mdash;from model training to
          production APIs. Click any node to explore how I&apos;ve applied it.
        </p>
      </motion.div>

      {/* Category filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto max-w-7xl"
      >
        <CategoryFilters
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </motion.div>

      {/* Visualization: TechGraph (desktop) or SkillCloud (mobile) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mx-auto max-w-7xl"
      >
        {isMobile ? (
          <SkillCloud skills={filteredSkills} onSkillClick={handleSkillClick} />
        ) : (
          <TechGraph skills={filteredSkills} onSkillClick={handleSkillClick} />
        )}
      </motion.div>

      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Certifications />
      </motion.div>

      {/* Skill Modal (PRD Skill-003: Tech Stack Explorer) */}
      <AnimatePresence>
        {selectedSkill && (
          <SkillModal
            skill={selectedSkill}
            onClose={handleCloseModal}
            onSkillClick={handleSkillClick}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
