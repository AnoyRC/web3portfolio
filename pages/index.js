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

  useEffect(() => {
    console.log(popUp);
    dispatch(setActiveTile(1));
  }, [popUp]);

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
        <div className="fixed w-[100vw] bg-amber-50 h-[100vh] flex flex-col justify-center items-center">
          <h1 className="font-[Hella] text-[#000000] text-6xl opacity-[71%]">
            Hi 👋, I'm Anoy{" "}
          </h1>
          <h1 className="font-[Hella] text-[#000000] text-2xl mt-2 opacity-[71%] text-center">
            A Engineering student by day, a passionate
            <br />
            full stack web3 developer by night
          </h1>
        </div>
        <div className="h-[200vh] w-[200vw] relative" ref={gallery}>
          <Tiles h={20} w={14} t={8} l={8} color="#d9f99d" />
          <Tiles h={28} w={14} t={20} l={35} color="#f1d3a1" />
          <Tiles h={18} w={16} t={50} l={14} color="#e3dbd9" />
          <Tiles
            h={35}
            w={15}
            t={45}
            l={54}
            color="#e6eff6"
            img="/ProfilePic.jpg"
          />
          <Tiles h={28} w={12} t={8} l={85} color="#89b4c4" />
          <Tiles h={20} w={14} t={5} l={60} color="#548999" />
          <Tiles h={20} w={14} t={78} l={28} color="#faaf92" />
          <Tiles h={20} w={23} t={70} l={73} color="#a27d60" />
        </div>
        <PopUp />
      </div>
    </>
  );
}
