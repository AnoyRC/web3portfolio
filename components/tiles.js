import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTile, setIsActive } from "@/redux/popUpSlice";

export default function Tiles(props) {
  const tile = useRef(null);
  const image = useRef(null);
  const popUp = useSelector((state) => state.popUp);
  const dispatch = useDispatch();
  const tl = gsap.timeline();

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!popUp.isActive) {
        tl.set(tile.current, { scale: 0 });
        tl.to(tile.current, { scale: 1, duration: 1 }, "+=1");
      } else {
        tl.set(tile.current, { scale: 1 });
        tl.to(tile.current, { scale: 0, duration: 1 });
      }

      tl.timeScale(1).then(() => {
        const SizeX = tile.current.offsetWidth * 1.05;
        const SizeY = tile.current.offsetHeight * 1.05;
        let animation = gsap.to(tile.current, {
          paused: true,
          width: SizeX,
          height: SizeY,
        });
        let animation2 = gsap.to(image.current, {
          paused: true,
          opacity: 1,
        });
        tile.current.addEventListener("mouseenter", () => {
          animation.play();
          animation2.play();
        });
        tile.current.addEventListener("mouseleave", () => {
          animation.reverse();
          animation2.reverse();
        });
      });
    }, tile);
    return () => ctx.revert();
  }, [popUp.isActive]);

  return (
    <div
      className={`scale-0 absolute rounded-2xl`}
      style={{
        backgroundColor: props.color,
        height: `${props.h}%`,
        width: `${props.w}%`,
        top: `${props.t}%`,
        left: `${props.l}%`,
        scale: 0,
      }}
      ref={tile}
      onClick={() => {
        dispatch(setIsActive(true));
      }}
    >
      <Image
        src={props.img}
        height={800}
        width={800}
        alt="ProfilePic"
        className="object-cover h-[100%] w-[100%] rounded-2xl opacity-0 scale-100"
        ref={image}
      ></Image>
    </div>
  );
}
