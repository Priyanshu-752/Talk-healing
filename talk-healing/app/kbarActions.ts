// app/kbarActions.ts
import type { Action } from 'kbar';

export const actions: Action[] = [
  {
    id: "home",
    name: "Go to Home",
    shortcut: ["h"],
    keywords: "go-home main",
    perform: () => (window.location.href = "/"),
  },
  {
    id: "research",
    name: "Research",
    shortcut: ["r"],
    keywords: "Latest Research",
    perform: () => (window.location.href = "/research"),
  },
  {
    id: "community",
    name: "Community",
    shortcut: ["c"],
    keywords: "communities",
    perform: () => (window.location.href = "/community"),
  },
  
];
