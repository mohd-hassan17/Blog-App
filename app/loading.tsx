'use client'

import React, { useState, useEffect } from 'react';

const DashboardLoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing');

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    const textInterval = setInterval(() => {
      const texts = ['Initializing', 'Loading modules', 'Preparing dashboard', 'Almost ready'];
      setLoadingText(texts[Math.floor(Math.random() * texts.length)]);
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  // Generate floating particles
  const particles = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 4}s`,
        animationDuration: `${3 + Math.random() * 4}s`
      }}
    />
  ));

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            <div className="w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Main loading content */}
      <div className="relative z-10 text-center flex flex-col items-center">
        {/* Layered spinning rings */}
        <div className="relative mb-8">
          {/* Outer ring */}
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-r-4 border-transparent border-t-cyan-400 border-r-purple-400"></div>
          
          {/* Middle ring */}
          <div className="absolute top-2 left-2 animate-spin rounded-full h-28 w-28 border-b-4 border-l-4 border-transparent border-b-pink-400 border-l-indigo-400" style={{ animationDirection: 'reverse', animationDuration: '2s' }}></div>
          
          {/* Inner ring */}
          <div className="absolute top-4 left-4 animate-spin rounded-full h-24 w-24 border-t-2 border-r-2 border-transparent border-t-yellow-400 border-r-green-400" style={{ animationDuration: '1.5s' }}></div>
          
          {/* Center pulse */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-500/50"></div>
          </div>
        </div>

        {/* Animated loading text */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            {loadingText}
          </h1>
          
          {/* Progress bar */}
          <div className="w-80 h-2 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full transition-all duration-300 ease-out shadow-lg shadow-purple-500/30"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          
          {/* Progress percentage */}
          <p className="text-gray-300 text-lg font-medium">
            {Math.round(Math.min(progress, 100))}%
          </p>
          
          {/* Subtitle with typing animation */}
          <p className="text-gray-400 mt-4 text-lg">
            <span className="inline-block animate-pulse">✨</span>
            {' '}Crafting your perfect experience
            <span className="inline-block animate-bounce ml-1">...</span>
          </p>
        </div>

        {/* Floating icons */}
        <div className="absolute -top-20 -left-20 text-4xl animate-bounce text-purple-400/50" style={{ animationDelay: '0.5s' }}>
          ⚡
        </div>
        <div className="absolute -top-16 -right-16 text-3xl animate-bounce text-cyan-400/50" style={{ animationDelay: '1s' }}>
          🚀
        </div>
        <div className="absolute -bottom-12 -left-16 text-3xl animate-bounce text-pink-400/50" style={{ animationDelay: '1.5s' }}>
          ✨
        </div>
        <div className="absolute -bottom-16 -right-12 text-4xl animate-bounce text-indigo-400/50" style={{ animationDelay: '2s' }}>
          💫
        </div>
      </div>

      {/* Animated border glow */}
      <div className="absolute inset-4 rounded-3xl border border-purple-400/30 animate-pulse"></div>
      <div className="absolute inset-8 rounded-2xl border border-cyan-400/20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
    </div>
  );
};

export default DashboardLoadingScreen;