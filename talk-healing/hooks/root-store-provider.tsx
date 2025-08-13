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

  useEffect(() => {
    const initializeStore = async () => {
      const store = await setupRootStore();
      setRootStore(store);
    };

    initializeStore();
  }, []);

  if (!rootStore) {
    return <Loader />;
  }
console.log(JSON.stringify(rootStore,null,4),'0000000000000000000000000')

  return <RootStoreProvider value={rootStore}>{children}</RootStoreProvider>;
} 