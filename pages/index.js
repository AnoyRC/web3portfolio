import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Tiles from "@/components/tiles";
import PopUp from "@/components/popUp";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTile, setIsActive } from "@/redux/popUpSlice";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const gallery = useRef(null);
  const popUp = useSelector((state) => state.popUp);
  const dispatch = useDispatch();
  const Bg = useRef(null);
  const didMountRef = useRef(false);

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
        gsap.to(".circle", {
          x: ratioX * 75 * -1,
          y: ratioY * 75 * -1,
          duration: 1.5,
        });
      };
    }, gallery);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (didMountRef.current) {
      let ctx = gsap.context(() => {
        const tl = gsap.timeline();
        if (!popUp.isActive) {
          tl.set(Bg.current, { backgroundColor: "#000000" });
          tl.set(".circle", { scale: 1, opacity: 1 });
          tl.to(Bg.current, {
            backgroundColor: "#fffdeb",
            duration: 1,
          });
          tl.to(".circle", { scale: 0, opacity: 0, duration: 1 });
        } else {
          tl.set(Bg.current, { backgroundColor: "#fffbeb" });
          tl.to(
            Bg.current,
            {
              backgroundColor: "#000000",
              duration: 1,
            },
            "+=1"
          );
          tl.to(".circle", { scale: 1, opacity: 1, duration: 1 });
        }
      }, Bg);
      return () => ctx.revert();
    }
    didMountRef.current = true;
  }, [popUp.isActive]);

  return (
    <>
      <div className="h-[100vh] w-[100vw] overflow-hidden">
        <div
          className="fixed w-[100vw] bg-[#fffdeb] h-[100vh] flex flex-col justify-center items-center"
          ref={Bg}
        >
          <h1 className="font-[Allison] text-[#000000] text-9xl opacity-[71%]">
            Anoy Roy Chowdhury
          </h1>
          <div
            className="absolute top-5 left-10 rounded-full h-[20vw] w-[20vw] scale-0 opacity-0 circle"
            style={{ backgroundColor: popUp.activeColor }}
          ></div>
          <div
            className="absolute top-[10%] left-[70%] rounded-full h-[45vw] w-[45vw] opacity-0 scale-0 circle"
            style={{ backgroundColor: popUp.activeColor }}
          ></div>
          <div
            className="absolute top-[75%] left-[15%] rounded-full h-[30vw] w-[30vw] opacity-0 scale-0 circle"
            style={{ backgroundColor: popUp.activeColor }}
          ></div>
        </div>
        <div className="h-[200vh] w-[200vw] relative z-20" ref={gallery}>
          <Tiles h={20} w={14} t={8} l={8} color="#d9f99d" id={1} />
          <Tiles h={28} w={14} t={20} l={35} color="#f1d3a1" id={2} />
          <Tiles h={18} w={16} t={50} l={14} color="#e3dbd9" id={3} />
          <Tiles
            h={35}
            w={15}
            t={45}
            l={54}
            color="#e6eff6"
            img="/ProfilePic.jpg"
            id={4}
          />
          <Tiles h={28} w={12} t={8} l={85} color="#89b4c4" id={5} />
          <Tiles h={20} w={14} t={5} l={60} color="#548999" id={6} />
          <Tiles h={20} w={14} t={78} l={28} color="#faaf92" id={7} />
          <Tiles h={20} w={23} t={70} l={73} color="#a27d60" id={8} />
        </div>
        <PopUp color="#d9f99d" id={1} />
        <PopUp color="#f1d3a1" id={2} />
        <PopUp color="#e3dbd9" id={3} />
        <PopUp color="#e6eff6" id={4} />
        <PopUp color="#89b4c4" id={5} />
        <PopUp color="#548999" id={6} />
        <PopUp color="#faaf92" id={7} />
        <PopUp color="#a27d60" id={8} />
      </div>
    </>
  );
}
