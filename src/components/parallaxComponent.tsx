"use client";

import React, { useEffect, useRef, useState } from "react";
import layer1 from "../../public/Images/parallax/layer1.png";
import layer2 from "../../public/Images/parallax/layer2.png";
import layer3 from "../../public/Images/parallax/layer3.png";
import layer4 from "../../public/Images/parallax/layer4.png";
import layer5 from "../../public/Images/parallax/layer5.png";
import Image from "next/image";
import { FiChevronsDown } from "react-icons/fi";
import Link from "next/link";

export default function ParallaxComponent() {
  const [scrollY, setScrollY] = useState<number>(0);
  const layerRef1 = useRef<HTMLDivElement | null>(null);
  const layerRef2 = useRef<HTMLDivElement | null>(null);
  const layerRef3 = useRef<HTMLDivElement | null>(null);
  const layerRef4 = useRef<HTMLDivElement | null>(null);
  const layerRef5 = useRef<HTMLDivElement | null>(null);
  const parallaxText = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (
      layerRef1.current &&
      layerRef2.current &&
      layerRef3.current &&
      layerRef4.current &&
      layerRef5.current &&
      parallaxText.current
    ) {
      const screenWidth = window.innerWidth;
      if (screenWidth > 780) {
        layerRef1.current.classList.remove("disabled-parallax");
        layerRef2.current.classList.remove("disabled-parallax");
        layerRef3.current.classList.remove("disabled-parallax");
        layerRef4.current.classList.remove("disabled-parallax");
        layerRef5.current.classList.remove("disabled-parallax");
        parallaxText.current.classList.remove("disabled-parallax");

        layerRef1.current.style.transform = `translateY(+${scrollY * 0.3}px)`;
        layerRef2.current.style.transform = `translateY(+${scrollY * 0.8}px)`;
        layerRef3.current.style.transform = `translateY(+${scrollY * 0.5}px)`;
        layerRef4.current.style.transform = `translateY(+${scrollY * 0.3}px)`;
        layerRef5.current.style.transform = `translateY(+${scrollY * 0}px)`;
        parallaxText.current.style.transform = `translateY(+${
          scrollY * 0.5
        }px)`;
      } else {
        layerRef1.current.classList.add("disabled-parallax");
        layerRef2.current.classList.add("disabled-parallax");
        layerRef3.current.classList.add("disabled-parallax");
        layerRef4.current.classList.add("disabled-parallax");
        layerRef5.current.classList.add("disabled-parallax");
        parallaxText.current.classList.add("disabled-parallax");
      }
    }
  }, [scrollY]);

  const scrollToSection = () => {
    const target = document.getElementById(`description`);
    window.scrollTo({
      top: target?.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <main>
      <section className="h-screen relative overflow-hidden">
        <div ref={layerRef4} className="absolute w-full h-full">
          <Image src={layer1} alt="layer1" className="w-full" />
        </div>
        <div ref={layerRef3} className="absolute w-full md:bottom-0">
          <Image src={layer2} alt="layer2" className="w-full" />
        </div>

        <div ref={layerRef2} className="absolute w-full md:bottom-0">
          <Image src={layer3} alt="layer3" className="w-full" />
        </div>

        <div ref={layerRef1} className="absolute w-full md:bottom-0">
          <Image src={layer4} alt="layer4" className="w-full" />
        </div>
        <div
          ref={parallaxText}
          className="absolute w-full h-screen flex justify-center top-[-20%] "
        >
          <div className="font-roboto font-black text-center text-white [text-shadow:0px_4px_4px_var(--tw-shadow-color)] shadow-black text-3xl md:text-6xl relative top-[45%]">
            Front End Developer <br /> Challenge<br></br>
          </div>
        </div>
        <div ref={layerRef5} className="absolute w-full md:bottom-0 ">
          <Image src={layer5} alt="layer4" className="w-full" />
        </div>
        <button
          className="absolute text-white bottom-5 left-[50%] right-[50%] animate-bounce"
          onClick={scrollToSection}
        >
          <FiChevronsDown size={40} />
        </button>
      </section>
      <section id="description" className="w-full h-screen">
        <div className="flex flex-col items-center justify-center h-full gap-y-7">
          <p className="max-w-[500px] text-center">
            Website ini dibuat untuk memenuhi Frontend Developer Challenge
            Synapsis. Dalam pengembangannya, website ini menggunakan API dari
            Gorest dan menggunakan assets dari freepik
          </p>
          <Link
            href={"/post"}
            className="bg-blue-700 px-3 py-1 rounded-lg text-white font-semibold"
          >
            Explore
          </Link>
        </div>
      </section>
    </main>
  );
}
