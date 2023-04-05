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
        className="fixed top-[2.5vh] left-[1.25vw] w-[97.5vw] h-[95vh] flex justify-center rounded-3xl items-center scale-0 opacity-0"
        style={{
          backgroundColor: props.color,
          opacity: popUp.activeTile === props.id ? 1 : 0,
          zIndex: popUp.activeTile === props.id ? 100 : -1,
        }}
        ref={window}
        onClick={() => {
          dispatch(setIsActive(false));
        }}
      >
        <div className="flex h-[100%] w-[60%] rounded-l-3xl">
          <div className="rounded-2xl mt-20 ml-20 h-[30%] w-[35%] bg-[#c5c5c5] hover:scale-105 transition-transform"></div>
          <div className="rounded-2xl mt-20 ml-10 h-[82%] w-[35%] bg-[#c5c5c5] hover:scale-105 transition-transform"></div>
          <div className="rounded-2xl mt-20 ml-10 h-[82%] w-[35%] bg-transparent flex flex-col justify-end">
            <div className="rounded-2xl h-[60%] w-[100%] bg-[#c5c5c5] hover:scale-105 transition-transform"></div>
          </div>
        </div>
        <div className="flex flex-col h-[100%] w-[40%] rounded-r-3xl">
          <h1 className="font-[Hella] text-[#000000] w-[90%] mt-[51%] opacity-70 text-[4vw] text-right">
            Hi, I'm Anoy
          </h1>
          <h1 className="font-[Hella] text-[#000000] w-[90%] opacity-70 text-[1.5vw] pl-12 mt-2 text-right">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </h1>
        </div>
      </div>
    </>
  );
}
