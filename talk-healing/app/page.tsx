"use client"
import { useState } from 'react';
import LoginSection from './(auth)/login/page';
import HomeSection from './(dashboard)/home/page';
import Header from './componenets/Header';
import Footer from './componenets/footer';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  return (
    <div className="page-wrapper">
     <Footer activeSection={activeSection} setActiveSection={setActiveSection} />
    </div>
  );
}