"use client";

import React, { useEffect, useState } from "react";
import { preload } from "react-dom";
import { ActivityCalendar, type Activity } from "react-activity-calendar";
import "react-activity-calendar/tooltips.css";
import { useTheme } from "@/context/ThemeContext";
import { useLoader } from "@/context/LoaderContext";

interface GithubContributionsProps {
  username?: string;
  className?: string;
}

export default function GithubContributions({
  username = "rangelkoli",
  className = "",
}: GithubContributionsProps) {
  const url = `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last&client=react-github-calendar`;
  preload(url, { as: "fetch", crossOrigin: "anonymous" });

  const { theme } = useTheme();
  const { holdLoader } = useLoader();
  const [data, setData] = useState<Activity[] | null>(null);
  const [failed, setFailed] = useState(false);

  // Fetch here instead of via <GitHubCalendar> so the page loader can wait on it.
  useEffect(() => {
    const release = holdLoader();
    const controller = new AbortController();

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`GitHub contributions: ${response.status}`);
        return response.json();
      })
      .then((json: { contributions: Activity[] }) => setData(json.contributions))
      .catch((error) => {
        if (error.name !== "AbortError") setFailed(true);
      })
      .finally(release);

    return () => {
      controller.abort();
      release();
    };
  }, [url, holdLoader]);

  return (
    <div
      data-loader-box="activity"
      className={`w-full mt-6 md:mt-8 ${className}`}
    >
      {/* Calendar */}
      <div className="w-full overflow-x-auto scrollbar-none py-1">
        {failed ? (
          <div className="h-[140px] w-full flex items-center justify-center text-sm text-[#888888]">
            Couldn&apos;t load GitHub contributions.
          </div>
        ) : (
          <div className="w-full min-w-[640px]">
            <ActivityCalendar
              data={data ?? []}
              loading={!data}
              maxLevel={4}
              colorScheme={theme === "dark" ? "dark" : "light"}
              blockSize={12}
              blockMargin={4}
              blockRadius={4}
              fontSize={13}
              theme={{
                light: ["#ebedf0", "#c0ddfd", "#79b4f2", "#3584e4", "#1c5fb8"],
                dark: ["#222222", "#0e2a4d", "#174e8d", "#2f7fc9", "#79b8ff"],
              }}
              labels={{
                totalCount: "{{count}} contributions in the last year",
              }}
              tooltips={{
                activity: {
                  text: (activity) =>
                    `${activity.count} contributions on ${activity.date}`,
                  hoverRestMs: 0,
                },
              }}
            />
          </div>
        )}
      </div>

      <style jsx global>{`
        .react-activity-calendar {
          width: 100%;
        }
        .react-activity-calendar svg {
          width: 100%;
          height: auto;
          display: block;
        }
        .react-activity-calendar rect[data-level="0"] {
          stroke: #d6e2f2;
          stroke-width: 1px;
        }
        :is(.dark, [data-theme="dark"]) .react-activity-calendar rect[data-level="0"] {
          stroke: #333333;
          stroke-width: 1px;
        }
        .react-activity-calendar rect {
          transition: opacity 0.15s ease-in-out;
        }
        .react-activity-calendar rect:hover {
          opacity: 0.85;
        }
        .react-activity-calendar__month,
        .react-activity-calendar__weekday {
          fill: #6b7280;
          font-weight: 500;
        }
        :is(.dark, [data-theme="dark"]) .react-activity-calendar__month,
        :is(.dark, [data-theme="dark"]) .react-activity-calendar__weekday {
          fill: #9ca3af;
        }
        .react-activity-calendar__count,
        .react-activity-calendar__legend-colors {
          color: #6b7280;
        }
        :is(.dark, [data-theme="dark"]) .react-activity-calendar__count,
        :is(.dark, [data-theme="dark"]) .react-activity-calendar__legend-colors {
          color: #9ca3af;
        }
        .react-activity-calendar__tooltip {
          width: max-content;
          max-width: calc(100vw - 20px);
          padding: 0.35rem 0.65rem;
          border-radius: 0.375rem;
          background-color: #0b305f !important;
          color: #ffffff !important;
          font-size: 12px !important;
          font-weight: 500;
          box-shadow: 0 4px 14px rgba(11, 48, 95, 0.35);
          z-index: 9999;
        }
        :is(.dark, [data-theme="dark"]) .react-activity-calendar__tooltip {
          background-color: #dbeafe !important;
          color: #0b305f !important;
        }
      `}</style>
    </div>
  );
}
