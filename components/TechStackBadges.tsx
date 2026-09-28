import React from "react";

export default function TechStackBadges({
  technologies,
  className = "",
}: {
  technologies: string[];
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {technologies.map((tech, index) => (
        <span
          key={index}
          className="px-4 py-2 bg-gray-50 rounded-full text-sm font-medium text-gray-800 border border-gray-200"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}
