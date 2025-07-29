'use client';

import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarSearch,
  KBarResults,
  useMatches,
} from 'kbar';

function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div className="px-3 py-1 text-xs text-gray-400">{item}</div>
        ) : (
          <div className={`p-2 px-4 rounded-lg ${active ? 'bg-gray-100' : ''}`}>
            {item.name}
          </div>
        )
      }
    />
  );
}

export default function KbarUI() {
  return (
    <KBarPortal>
      <KBarPositioner className="z-50 fixed inset-0 bg-black/20 backdrop-blur-sm">
        <KBarAnimator className="bg-white w-full max-w-xl p-4 rounded-xl shadow-xl border mx-auto mt-[15vh]">
          <KBarSearch className="w-full p-2 px-3 border rounded mb-4 outline-none" />
          <RenderResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  );
}
