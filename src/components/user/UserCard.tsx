"use client";

import React, { useState } from "react";
import { IUser } from "../../type/type";
import { deleteUser } from "@/api/api";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UserProps {
  user: IUser[];
  onChange: any;
}

export default function UserCard({ user, onChange }: UserProps) {
  const [isHover, setIsHover] = useState<number>();
  const [isChange, setIsChange] = useState<boolean>(false);

  const handleDelete = async (e: any, id: number) => {
    e.preventDefault();
    await deleteUser(id);
    if (onChange) {
      onChange(id);
      toast.success(`User: ${id} berhasil dihapus`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        // theme: "dark",
      });
    } else {
      toast.error(`Terjadi Kesalahan`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
        // theme: "dark",
      });
    }
  };

  const handleEdit = async (
    e: any,
    id: number,
    name: string,
    email: string,
    gender: string,
    status: string,
    isEdit: boolean
  ) => {
    e.preventDefault();
    if (onChange) {
      onChange({
        id: id,
        name: name,
        email: email,
        gender: gender,
        status: status,
        isEdit: isEdit,
      });
    }
  };
  return (
    <div className="w-full flex flex-col gap-y-3">
      {user?.map((item: IUser) => {
        return (
          <div
            key={item.id + 1}
            className="flex w-full justify-between bg-white p-4 rounded-xl"
            onMouseEnter={() => setIsHover(item.id)}
            onMouseLeave={() => setIsHover(0)}
          >
            <p className="font-bold text-lg">{item.name}</p>
            <div className="flex gap-x-3">
              <div
                className={`${isHover === item.id ? " hidden " : " inline "} `}
              >
                {item.status === "active" ? (
                  <p className="text-green-500 font-bold text-md">Active</p>
                ) : (
                  <p className="text-gray-400 font-bold text-md">Inactive</p>
                )}
              </div>
              <div
                className={`flex gap-x-2 text-white text-xs ${
                  isHover === item.id ? "inline" : "hidden"
                } `}
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(e, item.id);
                  }}
                  className="bg-red-600 px-2 flex items-center rounded-md font-bold"
                >
                  <AiFillDelete />
                  Delete
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleEdit(
                      e,
                      item.id,
                      item.name,
                      item.email,
                      item.gender,
                      item.status,
                      true
                    );
                  }}
                  className="bg-yellow-600 px-2 flex items-center rounded-md font-bold"
                >
                  <AiFillEdit />
                  Edit
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
