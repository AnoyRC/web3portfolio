import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const gallery = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      window.onmousemove = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const ratioX = mouseX / window.innerWidth;
        const ratioY = mouseY / window.innerHeight;

        const maxPanX = gallery.current.offsetWidth - window.innerWidth;
        const maxPanY = gallery.current.offsetHeight - window.innerHeight;

        const panX = ratioX * maxPanX * -1;
        const panY = ratioY * maxPanY * -1;

        gsap.to(gallery.current, {
          x: panX,
          y: panY,
          duration: 1.5,
        });
      };
    }, gallery);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="h-[100vh] w-[100vw] overflow-hidden">
        <div className="h-[200vh] w-[200vw] bg-amber-50 relative" ref={gallery}>
          <div className="absolute h-[20%] w-[14%] top-[8%] left-[8%] bg-lime-200 rounded-2xl"></div>
          <div className="absolute h-[28%] w-[14%] top-[20%] left-[35%] bg-lime-200 rounded-2xl"></div>
          <div className="absolute h-[18%] w-[16%] top-[50%] left-[14%] bg-lime-200 rounded-2xl"></div>
          <div className="absolute h-[35%] w-[15%] top-[45%] left-[54%] bg-lime-200 rounded-2xl"></div>
          <div className="absolute h-[28%] w-[12%] top-[8%] left-[85%] bg-lime-200 rounded-2xl"></div>
          <div className="absolute h-[20%] w-[14%] top-[5%] left-[60%] bg-lime-200 rounded-2xl"></div>
          <div className="absolute h-[20%] w-[14%] top-[78%] left-[28%] bg-lime-200 rounded-2xl"></div>
          <div className="absolute h-[20%] w-[23%] top-[70%] left-[73%] bg-lime-200 rounded-2xl"></div>
        </div>
      </div>
    </>
  );
}
