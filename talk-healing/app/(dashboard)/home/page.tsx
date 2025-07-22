import React from 'react';
import Link from 'next/link';

const HomeSection: React.FC = () => {
  return (
    <section className="bg-slate-50 py-20 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <div className="flex flex-col items-center">
          
          {/* Pulsing Heart Icon */}
          <div className="mb-6">
            <div className="relative w-24 h-24 flex items-center justify-center">
              {/* The pulse animation is applied via the 'animate-pulse-shadow' class */}
              <div className="absolute inline-flex h-full w-full rounded-full bg-red-100 animate-pulse-shadow"></div>
              <svg className="relative w-12 h-12 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900">
            <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
              Talk-Healing
            </span>
          </h1>
          
          <p className="mt-4 text-2xl font-semibold text-slate-700">Healing</p>
          
          <p className="mt-6 max-w-3xl text-lg text-slate-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/get-started" className="inline-block px-8 py-3 rounded-full bg-red-500 text-white font-semibold text-lg transition-transform hover:scale-105 shadow-md hover:shadow-lg">
              Lorem
            </Link>
            <button className="inline-block px-8 py-3 rounded-full bg-white border-2 border-slate-300 text-slate-700 font-semibold text-lg transition-transform hover:scale-105 hover:bg-slate-50">
              Learn More
            </button>
          </div>

          {/* Features Grid */}
          <div className="mt-20 grid w-full max-w-6xl grid-cols-1 gap-8 text-left md:grid-cols-3">
            {/* Feature Card 1 */}
            <div className="transform rounded-xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-800">Share Your Experience and Offer Support</h3>
              <p className="text-slate-600">Share your own experiences, stories, or insights related to your health journey. Support others by offering guidance, encouragement, or sharing resources.</p>
            </div>

            {/* Feature Card 2 */}
            <div className="transform rounded-xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-800">Explore Communities and Connect with Others</h3>
              <p className="text-slate-600">Browse through various communities related to specific health conditions. Join communities and connect with fellow patients who share similar health experiences.</p>
            </div>

            {/* Feature Card 3 */}
            <div className="transform rounded-xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                <svg className="h-8 w-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-800">Stay Informed and Seek Advice</h3>
              <p className="text-slate-600">Receive updates, news, and valuable information about your health condition and the latest research findings. Feel free to ask questions or seek advice from the community.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;