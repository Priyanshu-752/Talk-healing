"use client"
import { useEffect } from 'react';
import { useState } from 'react';
import HomeSection from './(dashboard)/home/page';
import LandingPage from './(dashboard)/landingpage/page';
import TopicsCard from './componenets/topics';


export default function page(main) {
  const [activeSection, setActiveSection] = useState('home');
  return (
    <div className="page-wrapper">
     <HomeSection activeSection={activeSection} setActiveSection={setActiveSection} />
    </div>
  );
}