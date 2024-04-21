"use client";

import Link from "next/link";
import { AiFillHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { MdLocalPostOffice } from "react-icons/md";

type NavbarProps = {
  select: string;
};

export default function Navbar({ select }: NavbarProps) {
  return (
    <div className="fixed px-10 w-full top-0 py-4 bg-white">
      <div className="flex justify-between">
        <div></div>
        <div className="flex gap-x-5">
          <Link
            href={"/"}
            className={`text-black font-bold px-3 py-1 rounded-xl text-center flex flex-col items-center`}
          >
            <AiFillHome size={25} />
            Home
          </Link>
          <Link
            href={"/post"}
            className={`${
              select === "post" ? "text-blue-800" : "text-black"
            }  font-bold px-3 py-1 rounded-xl text-center flex flex-col items-center `}
          >
            <MdLocalPostOffice size={25} />
            POST
          </Link>
          <Link
            href={"/user"}
            className={`${
              select === "user" ? "text-blue-800" : "text-black"
            }  font-bold px-3 py-1 rounded-xl flex flex-col items-center `}
          >
            <FaUser size={25} />
            USER
          </Link>
        </div>
      </div>
    </div>
  );
}
