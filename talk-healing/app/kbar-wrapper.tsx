'use client';

import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useMatches,
} from 'kbar';
import { ReactNode } from 'react';
import { actions } from './kbarActions';

const RenderResults = () => {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div className="px-4 py-2 text-xs uppercase text-gray-400">
            {item}
          </div>
        ) : (
          <div
            className={`px-4 py-2 cursor-pointer ${
              active ? 'bg-gray-100' : 'bg-white'
            }`}
          >
            {item.name}
          </div>
        )
      }
    />
  );
};

export default function KBarWrapper({ children }: { children: ReactNode }) {
  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className="z-[9999] bg-black/30 backdrop-blur-sm">
          <KBarAnimator className="bg-white w-full max-w-xl rounded-xl overflow-hidden shadow-2xl">
            <KBarSearch
              className="w-full px-4 py-3 text-sm outline-none border-b border-gray-200"
              placeholder="search…"
            />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  );
}
