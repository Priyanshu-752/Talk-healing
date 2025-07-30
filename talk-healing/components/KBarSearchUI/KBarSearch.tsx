'use client';

import {
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useMatches,
} from 'kbar';

const RenderResults = () => {
  const { results } = useMatches();
  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div className="text-xs text-gray-500 px-4 py-2">{item}</div>
        ) : (
          <div
            className={`px-4 py-2 cursor-pointer ${
              active ? 'bg-blue-500 text-white' : 'bg-white text-black'
            }`}
          >
            {item.name}
          </div>
        )
      }
    />
  );
};

export default function KBarSearchUI() {
  return (
    <KBarPortal>
      <KBarPositioner className="z-[1000] bg-black/50 backdrop-blur-sm">
        <KBarAnimator className="bg-white max-w-xl w-full rounded-xl overflow-hidden shadow-xl border border-gray-200">
          <KBarSearch className="w-full px-4 py-3 border-b text-sm outline-none" />
          <RenderResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
}
