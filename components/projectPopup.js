import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTile, setIsActive } from "@/redux/popUpSlice";

export default function ProjectPopUp(props) {
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
        <div className="h-[100%] w-[100%] flex justify-center items-center">
          <div className="flex flex-col h-[100%] w-[25%] items-center justify-center">
            <div className="h-[60%] w-[100%] rounded-2xl border-[2px] border-[#7a7a7a] relative group">
              <Image
                src={props.img2}
                height={800}
                width={800}
                alt="Image1"
                className="h-[100%] w-[100%] rounded-2xl object-cover "
              />
              <div className="backdrop-filter bg-white-900/10 backdrop-blur-[10px] top-0 left-0 absolute group-hover:opacity-0 transition-opacity duration-500 h-[100%] w-[100%] rounded-2xl"></div>
            </div>
          </div>
          <div className="flex flex-col h-[100%] w-[45%] rounded-r-3xl items-center justify-center ml-24">
            <h1 className="font-[Narcost] text-[#000000] w-[90%] opacity-70 text-[4vw] text-left">
              {props.title}
            </h1>
            <h1 className="font-[Hella] text-[#000000] w-[90%] opacity-70 text-[1.5vw] mt-2 text-left">
              {props.body}
            </h1>
            <a
              href={props.link}
              className="font-[Hella] text-[#ae4cff] w-[90%] opacity-70 text-[1.5vw] mt-2 text-left"
            >
              Go to the repository
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
