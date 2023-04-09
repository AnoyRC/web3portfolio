import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Tiles from "@/components/projectTiles";
import ProjectPopUp from "@/components/projectPopup";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTile, setIsActive } from "@/redux/popUpSlice";
import { content } from "../../data/project";
import Menu from "@/components/projectMenu";
import { artworkProject } from "@/data/artworks";
import Artwork from "@/components/artwork";

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
          tl.set(Bg.current, { backgroundColor: "#fffdeb" });
          tl.set(".circle", { scale: 1, opacity: 1 });
          tl.to(Bg.current, {
            backgroundColor: "#000000",
            duration: 1,
          });
          tl.to(".circle", { scale: 0, opacity: 0, duration: 1 });
        } else {
          tl.set(Bg.current, { backgroundColor: "#000000" });
          tl.to(
            Bg.current,
            {
              backgroundColor: "#fffbeb",
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
      <Head>
        <title>My Projects</title>
        <meta charSet="utf-8" />
      </Head>
      <div className="h-[100vh] w-[100vw] relative overflow-hidden">
        <div
          className="fixed w-[100vw] bg-[#000000] h-[100vh] flex flex-col justify-center items-center"
          ref={Bg}
        >
          <h1 className="font-[Henri] text-[#fffdeb] text-9xl">PROJECTS</h1>
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
          {artworkProject.map((item) => {
            return (
              <Artwork
                key={item.id}
                w={item.w}
                t={item.t}
                l={item.l}
                img={item.img}
                id={item.id}
              />
            );
          })}
          {content.map((item) => {
            return (
              <Tiles
                key={item.id}
                h={item.h}
                w={item.w}
                t={item.t}
                l={item.l}
                color={item.color}
                img={item.img}
                id={item.id}
              />
            );
          })}
        </div>
        {content.map((item) => {
          return (
            <ProjectPopUp
              color={item.color}
              id={item.id}
              key={item.id}
              img={item.img}
              img2={item.img2}
              title={item.title}
              body={item.body}
              link={item.link}
            />
          );
        })}
        <Menu />
      </div>
    </>
  );
}
