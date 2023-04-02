import Image from "next/image";

export default function Tiles(props) {
  return (
    <div
      className={`absolute rounded-2xl group hover:scale-105 trasition-all duration-500 ease-in-out`}
      style={{
        backgroundColor: props.color,
        height: `${props.h}%`,
        width: `${props.w}%`,
        top: `${props.t}%`,
        left: `${props.l}%`,
      }}
    >
      <Image
        src="/ProfilePic.jpg"
        height={800}
        width={800}
        alt="ProfilePic"
        className="object-cover h-[100%] w-[100%] rounded-2xl opacity-0 scale-100 group-hover:opacity-100 transition-all duration-500 ease-in-out"
      ></Image>
    </div>
  );
}
