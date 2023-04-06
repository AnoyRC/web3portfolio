import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTile, setIsActive } from "@/redux/popUpSlice";

export default function PopUp(props) {
  const popUp = useSelector((state) => state.popUp);
  const dispatch = useDispatch();
  const window = useRef(null);
  const tl = gsap.timeline();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(window.current, { opacity: 1, duration: 1 }, "+=1");
      tl.set(window.current, { scale: 1 });
      tl.to(window.current, { scale: 0, duration: 1 });
    }, popUp);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (popUp.activeTile === props.id) {
        if (popUp.isActive) {
          tl.set(window.current, { scale: 0 });
          tl.to(window.current, { scale: 1, duration: 1 }, "+=1");
        }
        if (!popUp.isActive) {
          tl.set(window.current, { scale: 1 });
          tl.to(window.current, { scale: 0, duration: 1 });
        }
      }
    }, popUp);
    return () => ctx.revert();
  }, [popUp.isActive, popUp.activeTile]);

  return (
    <>
      <div
        className="fixed top-[7.5vh] left-[6.25vw] w-[87.5vw] h-[85vh] border-[2px] border-[#7a7a7a] flex justify-center rounded-[100px] items-center scale-0 backdrop-filter bg-white-900/20 backdrop-blur-[100px] opacity-0"
        style={{
          opacity: popUp.activeTile === props.id ? 1 : 0,
          zIndex: popUp.activeTile === props.id ? 100 : -1,
        }}
        ref={window}
        onClick={() => {
          dispatch(setIsActive(false));
        }}
      >
        {/* <div className="flex flex-col h-[100%] w-[40%] rounded-r-3xl">
          <h1 className="font-[Narcost] text-[#000000] w-[90%] mt-[45%] opacity-70 text-[4vw] text-right">
            Hi 👋, I'm Anoy
          </h1>
          <h1 className="font-[Hella] text-[#000000] w-[90%] opacity-70 text-[1.5vw] pl-20 mt-2 text-right">
            A passionate full stack developer and web3 enthusiast from India.
            Specializing in building exceptional websites, dApps, and everything
            in between. I'm currently working on a few personal projects and
            learning new technologies.
          </h1>
        </div> */}
      </div>
    </>
  );
}
