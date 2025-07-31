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
  },{
    id: "community",
    name: "Communities",
    shortcut: [""],
    keywords: "communities",
    perform: () => (window.location.href = "/community"),
  },
 
   {
    id: "communityhome",
    name: "Community Home Page",
    shortcut: [""],
    keywords: "communities",
    perform: () => (window.location.href = "/communityhome"),
  },
  {
    id: "login",
    name: "Login ",
    shortcut: [""],
    keywords: "login",
    perform: () => (window.location.href = "/login"),
  },
  {
    id: "signup",
    name: "Sign Up",
    shortcut: [""],
    keywords: "signup",
    perform: () => (window.location.href = "/signup"),
  },
  
];
