'use client'
import { useEffect, useState } from "react";


const CursorBeam = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
  
    useEffect(() => {
      const updatePosition = (e:any) => {
        setPosition({ 
          x: e.clientX, 
          y: e.clientY + window.scrollY // Add scroll position to Y coordinate
        });
      };
  
      const updateScroll = () => {
        setScrollY(window.scrollY);
        // Update the beam position when scrolling without mouse movement
        setPosition(prev => ({
          x: prev.x,
          y: prev.y + (window.scrollY - scrollY)
        }));
      };
  
      window.addEventListener('mousemove', updatePosition);
      window.addEventListener('scroll', updateScroll);
  
      return () => {
        window.removeEventListener('mousemove', updatePosition);
        window.removeEventListener('scroll', updateScroll);
      };
    }, [scrollY]);
  
    return (
      <div
        className="pointer-events-none fixed inset-0 z-30 h-full"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y - scrollY}px, rgba(29, 78, 216, 0.15), transparent 40%)`,
          position: 'fixed',
          width: '100vw',
          height: '100vh'
        }}
      />
    );
  };

  export default CursorBeam;