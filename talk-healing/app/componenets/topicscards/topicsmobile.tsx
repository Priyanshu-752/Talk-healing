"use client";

import React, { useCallback, useMemo, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

type TopicsMobileProps = {
  topics?: string[];
  defaultSelected?: string[];
  onChange?: (selected: string[]) => void;
  className?: string;
};

export default function TopicsMobile({
  topics: topicsProp,
  defaultSelected = [],
  onChange,
  className = "",
}: TopicsMobileProps) {
  // Source of truth for topics
  const topics = useMemo(
    () =>
      topicsProp && topicsProp.length > 0
        ? topicsProp
        : [
            "Hypertension (High Blood Pressure)",
            "Coronary Artery Disease",
            "Stroke",
            "Cancer",
            "Asthma",
            "Alzheimer's Disease",
            "Chronic Obstructive Pulmonary Disease",
            "Arthritis",
          ],
    [topicsProp]
  );

  // Selected state
  const [selected, setSelected] = useState<string[]>(() => {
    // Filter to ensure only valid topics are preselected
    const valid = new Set(topics);
    return defaultSelected.filter((t) => valid.has(t));
  });

  // Toggle selection
  const toggleTopic = useCallback(
    (topic: string) => {
      setSelected((prev) => {
        const exists = prev.includes(topic);
        const next = exists ? prev.filter((t) => t !== topic) : [...prev, topic];
        onChange?.(next);
        return next;
      });
    },
    [onChange]
  );

  // Remove one selected topic
  const removeSelected = useCallback(
    (topic: string) => {
      setSelected((prev) => {
        const next = prev.filter((t) => t !== topic);
        onChange?.(next);
        return next;
      });
    },
    [onChange]
  );

  // Clear all
  const clearAll = useCallback(() => {
    setSelected([]);
    onChange?.([]);
  }, [onChange]);

  // Helpers
  const isSelected = useCallback(
    (topic: string) => selected.includes(topic),
    [selected]
  );

  return (
    <div className={`relative w-full max-w-full px-2 ${className}`}>
      <Carousel className="relative w-full">
        {/* Carousel Buttons */}
        <CarouselPrevious
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
          aria-label="Previous topics"
        />
        <CarouselNext
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
          aria-label="Next topics"
        />

        <CarouselContent className="flex gap-3 px-12">
          {topics.map((topic, index) => {
            const active = isSelected(topic);
            return (
              <CarouselItem key={index} className="w-auto">
                <Button
                  type="button"
                  onClick={() => toggleTopic(topic)}
                  aria-pressed={active}
                  aria-label={`${active ? "Deselect" : "Select"} ${topic}`}
                  className={[
                    "px-4 py-2 rounded-lg font-medium transition whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    active
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-neutral-200 hover:bg-neutral-300 text-neutral-900 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700",
                  ].join(" ")}
                >
                  {topic}
                </Button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {/* Selected badges and actions */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {selected.length > 0 ? (
          <>
            {selected.map((topic) => (
              <span
                key={topic}
                className="inline-flex items-center gap-2 rounded-full bg-green-100 text-green-800 px-3 py-1 text-sm dark:bg-green-900/30 dark:text-green-300 border border-green-300 dark:border-green-700"
              >
                {topic}
                <button
                  type="button"
                  onClick={() => removeSelected(topic)}
                  aria-label={`Remove ${topic}`}
                  className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-transparent text-green-700 hover:bg-green-200 dark:text-green-300 dark:hover:bg-green-800"
                  title="Remove"
                >
                  ×
                </button>
              </span>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={clearAll}
              className="ml-2 bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-800"
              aria-label="Clear all selected topics"
            >
              Clear all
            </Button>
          </>
        ) : (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No topics selected. Tap a topic to select it.
          </p>
        )}
      </div>
    </div>
  );
}
