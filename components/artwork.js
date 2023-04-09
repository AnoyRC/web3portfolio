import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useSelector } from "react-redux";

export default function Artwork(props) {
  const popUp = useSelector((state) => state.popUp);
  const tl = gsap.timeline();
  const artwork = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!popUp.isActive) {
        tl.set(artwork.current, { opacity: 0 });
        tl.to(artwork.current, { opacity: 1, duration: 2 }, "+=3");
      } else {
        tl.set(artwork.current, { opacity: 1 });
        tl.to(artwork.current, { opacity: 0, duration: 1 });
      }
    }, artwork.current);
    return () => ctx.revert();
  }, [popUp.isActive]);

  return (
    <Image
      src={props.img}
      height={200}
      width={500}
      alt="Artwork"
      className="absolute opacity-0"
      style={{ top: `${props.t}%`, left: `${props.l}%`, width: `${props.w}vw` }}
      ref={artwork}
    ></Image>
  );
}
