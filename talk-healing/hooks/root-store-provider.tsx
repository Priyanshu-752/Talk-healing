"use client";

import { useEffect, useState } from "react";
import { RootStoreProvider } from "@/models/root-store/root-store-context";
import { setupRootStore } from "@/models/root-store/setup-root-store";
import { RootStore } from "@/models/root-store/root-store";

export const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-90 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4"></div>
    </div>
  );
};

export function RootStoreProviderWrapper({ children }: { children: React.ReactNode }) {
  const [rootStore, setRootStore] = useState<RootStore | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeStore = async () => {
      try {
        console.log('Starting root store initialization...');
        const store = await setupRootStore();
        console.log('Root store initialized successfully:', store);
        setRootStore(store);
      } catch (error) {
        console.error('Failed to initialize root store:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
      }
    };

    initializeStore();
  }, []);

  if (error) {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-90 z-50">
        <div className="text-red-600 text-center">
          <h2>Store Initialization Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!rootStore) {
    return <Loader />;
  }

  console.log('Root store provider rendering with store:', JSON.stringify(rootStore, null, 2));

  return <RootStoreProvider value={rootStore}>{children}</RootStoreProvider>;
} 