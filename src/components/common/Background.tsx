'use client'
import React from 'react';

export default function AuroraBackground(): JSX.Element {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 transform-gpu">
        <div className="aurora-core" />
        <div className="particles" />
        <div className="shapes-container">
          <div className="wave-wave wave-1" />
          <div className="wave-wave wave-2" />
          <div className="wave-wave wave-3" />
          <div className="wave-wave wave-4" />
          <div className="wave-wave wave-5" />
          <div className="wave-wave wave-6" />
        </div>
      </div>

      <style jsx>{`
        .aurora-core {
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(120deg, #050008, #190012, #2e001f, #190012, #050008);
          background-size: 400% 400%;
          animation: gradient-pulse 20s ease infinite;
        }

        .particles {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 100%),
            repeating-linear-gradient(
              45deg,
              transparent 0px,
              transparent 2px,
              rgba(84, 0, 43, 0.05) 2px,
              rgba(46, 0, 31, 0.03) 4px
            );
          filter: blur(1px);
        }

        .shapes-container {
          position: absolute;
          inset: 0;
          filter: blur(32px) contrast(120%);
          mix-blend-mode: screen;
        }

        .wave-wave {
          position: absolute;
          background: rgba(84, 0, 43, 0.1);
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          transform-origin: center;
          opacity: 0.7;
        }

        .wave-1 {
          width: 800px;
          height: 800px;
          top: -20%;
          left: -10%;
          animation: wave-flow 25s infinite linear;
          background: linear-gradient(45deg, rgba(84, 0, 43, 0.1), rgba(46, 0, 31, 0.05));
        }

        .wave-2 {
          width: 600px;
          height: 600px;
          bottom: -15%;
          right: -10%;
          animation: wave-flow 30s infinite linear reverse;
          background: linear-gradient(-45deg, rgba(84, 0, 43, 0.08), rgba(46, 0, 31, 0.03));
        }

        .wave-3 {
          width: 400px;
          height: 400px;
          top: 40%;
          left: 25%;
          animation: wave-pulse 18s infinite ease-in-out;
          border-radius: 50% 40% 60% 40% / 60% 40% 60% 40%;
          background: linear-gradient(90deg, rgba(84, 0, 43, 0.06), rgba(46, 0, 31, 0.02));
        }

        .wave-4 {
          width: 500px;
          height: 500px;
          top: 30%;
          right: 20%;
          animation: wave-spin 22s infinite linear;
          background: linear-gradient(180deg, rgba(84, 0, 43, 0.07), rgba(46, 0, 31, 0.03));
        }

        .wave-5 {
          width: 300px;
          height: 300px;
          bottom: 20%;
          left: 20%;
          animation: wave-float 16s infinite ease-in-out;
          border-radius: 35% 65% 45% 55% / 55% 45% 55% 45%;
          background: linear-gradient(135deg, rgba(84, 0, 43, 0.05), rgba(46, 0, 31, 0.02));
        }

        .wave-6 {
          width: 250px;
          height: 250px;
          top: 15%;
          right: 30%;
          animation: wave-spin 19s infinite reverse linear;
          background: linear-gradient(-135deg, rgba(84, 0, 43, 0.04), rgba(46, 0, 31, 0.01));
        }

        @keyframes gradient-pulse {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes wave-flow {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          }
          33% {
            transform: translate(100px, 50px) rotate(120deg) scale(1.2);
            border-radius: 60% 40% 30% 70% / 50% 60% 40% 50%;
          }
          66% {
            transform: translate(-80px, -30px) rotate(240deg) scale(0.9);
            border-radius: 30% 70% 60% 40% / 60% 30% 70% 40%;
          }
          100% {
            transform: translate(0, 0) rotate(360deg) scale(1);
          }
        }

        @keyframes wave-spin {
          0% {
            transform: rotate(0deg) scale(1);
          }
          100% {
            transform: rotate(360deg) scale(1.1);
          }
        }

        @keyframes wave-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.9;
          }
        }

        @keyframes wave-float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-40px) rotate(10deg);
          }
        }
      `}</style>
    </div>
  );
}