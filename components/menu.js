import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsActive } from "@/redux/popUpSlice";

export default function Menu(props) {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const menu = useRef(null);
  const dispatch = useDispatch();
  const button = useRef(null);
  useEffect(() => {
    if (isMenuActive) {
      gsap.to(menu.current, {
        y: -menu.current.offsetHeight,
        duration: 0.3,
        ease: "linear",
      });
      gsap.to(button.current, {
        y: -menu.current.offsetHeight,
        duration: 0.3,
        ease: "linear",
      });
    } else {
      gsap.to(menu.current, {
        y: 0,
        duration: 0.3,
        ease: "linear",
      });
      gsap.to(button.current, {
        y: 0,
        duration: 0.3,
        ease: "linear",
      });
    }
  }, [isMenuActive]);

  return (
    <>
      <div
        className="absolute border-[#7a7a7a] flex justify-center items-center backdrop-filter bg-stone-300/20 backdrop-blur-[30px] h-[5%] w-[10%] bottom-0 left-[45%] z-30 rounded-t-3xl hover:bg-stone-500/20 transition-colors duration-300 hover:cursor-pointer"
        onClick={() => setIsMenuActive(!isMenuActive)}
        ref={button}
      >
        <h1 className="text-[#000000] font-[Henri] text-2xl">Menu</h1>
      </div>
      <div
        className="absolute border-[#7a7a7a] flex justify-center items-center backdrop-filter bg-stone-300/20 backdrop-blur-[30px] h-[9%] w-[40%] -bottom-[9%] left-[30%] z-30 rounded-t-3xl"
        ref={menu}
      >
        <div
          className="w-1/3 bg-transparent hover:bg-stone-300/20 h-[100%] flex justify-center items-center transition-all duration-300 rounded-tl-3xl hover:cursor-pointer"
          onClick={() => {
            dispatch(setIsActive(false));
            window.location.href = "/";
          }}
        >
          <h1 className="text-[#000000] font-[Henri] text-5xl">Home</h1>
        </div>
        <div
          className="w-1/3 bg-transparent hover:bg-stone-300/20 h-[100%] flex justify-center items-center transition-all duration-300 hover:cursor-pointer"
          onClick={() => {
            dispatch(setIsActive(false));
            window.location.href = "/projects";
          }}
        >
          <h1 className="text-[#000000] font-[Henri] text-5xl">Projects</h1>
        </div>
        <div
          className="w-1/3 bg-transparent hover:bg-stone-300/20 h-[100%] flex justify-center items-center transition-all duration-300 rounded-tr-3xl hover:cursor-pointer"
          onClick={() => {
            dispatch(setIsActive(false));
            window.location.href = "/skills";
          }}
        >
          <h1 className="text-[#000000] font-[Henri] text-5xl">Skills</h1>
        </div>
      </div>
    </>
  );
}
