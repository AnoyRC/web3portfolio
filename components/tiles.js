import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Tiles(props) {
  const tile = useRef(null);
  const image = useRef(null);
  const tl = gsap.timeline();

  useEffect(() => {
    let ctx = gsap.context(() => {
      tl.to(tile.current, { scale: 1, duration: 2 });
      tl.delay(1);

      tl.timeScale(1).then(() => {
        let animation = gsap.to(tile.current, {
          paused: true,
          scale: 1.05,
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
  }, []);

  return (
    <div
      className={`scale-0 absolute rounded-2xl`}
      style={{
        backgroundColor: props.color,
        height: `${props.h}%`,
        width: `${props.w}%`,
        top: `${props.t}%`,
        left: `${props.l}%`,
      }}
      ref={tile}
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
