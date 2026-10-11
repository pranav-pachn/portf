'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function HeroArtwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Responsive scale tracker based on 1076x728 natural coordinates
  useEffect(() => {
    if (!containerRef.current) return;

    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0) {
          setScale(width / 1076);
        }
      }
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(containerRef.current);

    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none"
    >
      {/* Slower, restrained reveal with subtle scale settling from 1.02 to 1.0. Stationary post-entry. */}
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.1,
          delay: 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative w-full cursor-default"
      >
        {/* Sculpture Artwork Canvas - Subtle tonal blend along the left edge only */}
        <div
          className="relative z-10 w-full aspect-[1076/728] overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 6%, rgba(0,0,0,0.85) 15%, black 22%, black 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 6%, rgba(0,0,0,0.85) 15%, black 22%, black 100%)',
          }}
        >
          {/* Base Artwork: Space Grey laptop on brutalist travertine stone with sphere and cobalt monolith */}
          <Image
            src="/hero-laptop-focused.jpg"
            alt="Photorealistic systems engineering laptop on sculptural stone with cobalt blue monolith"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 56vw"
            className="object-cover object-center select-none"
          />

          {/* Crisp Vector System Architecture Diagram Overlay */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 origin-top-left pointer-events-none"
            style={{
              width: 1076,
              height: 728,
              transform: `scale(${scale})`,
            }}
          >
            <div
              className="absolute top-0 left-0"
              style={{
                width: 440,
                height: 280,
                transformOrigin: '0 0',
                transform:
                  'matrix3d(0.509125, -0.103322, 0, -0.000282, -0.172029, 0.887703, 0, -0.000131, 0, 0, 1, 0, 525, 183, 0, 1)',
                borderRadius: 5,
                overflow: 'hidden',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.95)',
              }}
            >
              <svg
                className="w-full h-full block"
                viewBox="0 0 440 280"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Screen Dark Canvas */}
                <rect width="440" height="280" fill="#0C0C0E" />

                {/* Subtitle / Header */}
                <text
                  x="24"
                  y="32"
                  fill="#77736B"
                  fontFamily="monospace"
                  fontSize="8.5"
                  fontWeight="600"
                  letterSpacing="0.16em"
                >
                  SYSTEM ARCHITECTURE
                </text>
                <text
                  x="416"
                  y="32"
                  textAnchor="end"
                  fill="#55514B"
                  fontFamily="monospace"
                  fontSize="8.5"
                >
                  / 01
                </text>

                {/* Vector Connectors */}
                <path
                  d="M 96 136 L 152 136"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="1.2"
                />
                <path
                  d="M 232 136 C 265 136, 275 80, 304 80"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="1.2"
                  fill="none"
                />
                <path
                  d="M 232 136 L 304 136"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="1.2"
                />
                <path
                  d="M 232 136 C 265 136, 275 192, 304 192"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="1.2"
                  fill="none"
                />

                {/* Pulse Data Signals along connectors */}
                <circle r="2" fill="#3B82F6">
                  <animateMotion
                    path="M 96 136 L 152 136"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r="2" fill="#3B82F6">
                  <animateMotion
                    path="M 232 136 C 265 136, 275 80, 304 80"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r="2" fill="#3B82F6">
                  <animateMotion
                    path="M 232 136 L 304 136"
                    dur="3.4s"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle r="2" fill="#3B82F6">
                  <animateMotion
                    path="M 232 136 C 265 136, 275 192, 304 192"
                    dur="3.8s"
                    repeatCount="indefinite"
                  />
                </circle>

                {/* Node: USER */}
                <rect
                  x="36"
                  y="112"
                  width="60"
                  height="48"
                  rx="7"
                  fill="rgba(255,255,255,0.03)"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1.2"
                />
                <circle cx="66" cy="128" r="5" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
                <path
                  d="M 58 143 C 58 137, 74 137, 74 143"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  fill="none"
                />
                <text
                  x="66"
                  y="153"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontFamily="monospace"
                  fontSize="8"
                  fontWeight="600"
                  letterSpacing="0.1em"
                >
                  USER
                </text>

                {/* Node: CORE */}
                <rect
                  x="152"
                  y="104"
                  width="80"
                  height="64"
                  rx="8"
                  fill="rgba(255,255,255,0.05)"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.4"
                />
                <text
                  x="192"
                  y="132"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontFamily="'General Sans', sans-serif"
                  fontSize="11"
                  fontWeight="600"
                  letterSpacing="0.08em"
                >
                  CORE
                </text>
                <text
                  x="192"
                  y="146"
                  textAnchor="middle"
                  fill="#88847C"
                  fontFamily="monospace"
                  fontSize="7.5"
                >
                  Products Logic
                </text>

                {/* Node: AI */}
                <rect
                  x="304"
                  y="58"
                  width="104"
                  height="44"
                  rx="7"
                  fill="rgba(255,255,255,0.03)"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1.2"
                />
                {/* AI Sparkle / Radial Icon */}
                <circle cx="324" cy="80" r="4.5" stroke="#3B82F6" strokeWidth="1.2" fill="none" />
                <path d="M 324 73 L 324 75 M 324 85 L 324 87 M 317 80 L 319 80 M 329 80 L 331 80" stroke="#3B82F6" strokeWidth="1" />
                <text
                  x="342"
                  y="77"
                  fill="#FFFFFF"
                  fontFamily="'General Sans', sans-serif"
                  fontSize="9"
                  fontWeight="600"
                >
                  AI
                </text>
                <text
                  x="342"
                  y="88"
                  fill="#88847C"
                  fontFamily="monospace"
                  fontSize="7"
                >
                  Models Services
                </text>

                {/* Node: DATA */}
                <rect
                  x="304"
                  y="114"
                  width="104"
                  height="44"
                  rx="7"
                  fill="rgba(255,255,255,0.03)"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1.2"
                />
                {/* Cylinder Icon */}
                <ellipse cx="324" cy="131" rx="5" ry="2.2" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
                <path
                  d="M 319 131 L 319 139 C 319 141.2, 329 141.2, 329 139 L 329 131"
                  stroke="#FFFFFF"
                  strokeWidth="1.2"
                  fill="none"
                />
                <text
                  x="342"
                  y="133"
                  fill="#FFFFFF"
                  fontFamily="'General Sans', sans-serif"
                  fontSize="9"
                  fontWeight="600"
                >
                  DATA
                </text>
                <text
                  x="342"
                  y="144"
                  fill="#88847C"
                  fontFamily="monospace"
                  fontSize="7"
                >
                  Processing Storage
                </text>

                {/* Node: APIs */}
                <rect
                  x="304"
                  y="170"
                  width="104"
                  height="44"
                  rx="7"
                  fill="rgba(255,255,255,0.03)"
                  stroke="rgba(255,255,255,0.18)"
                  strokeWidth="1.2"
                />
                <text
                  x="324"
                  y="194"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontFamily="monospace"
                  fontSize="8.5"
                  fontWeight="600"
                >
                  &lt;/&gt;
                </text>
                <text
                  x="342"
                  y="189"
                  fill="#FFFFFF"
                  fontFamily="'General Sans', sans-serif"
                  fontSize="9"
                  fontWeight="600"
                >
                  APIs
                </text>
                <text
                  x="342"
                  y="200"
                  fill="#88847C"
                  fontFamily="monospace"
                  fontSize="7"
                >
                  External Integrations
                </text>

                {/* Architecture Attributes Footer */}
                <text
                  x="24"
                  y="244"
                  fill="#66625C"
                  fontFamily="monospace"
                  fontSize="7"
                  letterSpacing="0.1em"
                >
                  SCALABLE
                </text>
                <text
                  x="24"
                  y="254"
                  fill="#66625C"
                  fontFamily="monospace"
                  fontSize="7"
                  letterSpacing="0.1em"
                >
                  RELIABLE
                </text>
                <text
                  x="24"
                  y="264"
                  fill="#66625C"
                  fontFamily="monospace"
                  fontSize="7"
                  letterSpacing="0.1em"
                >
                  HUMAN-CENTRED
                </text>
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
