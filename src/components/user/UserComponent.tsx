"use client";

import { useEffect, useState } from "react";
import { editUser, getAllUser, postUser } from "../../api/api";
import { IUser } from "@/type/type";
import { ToastContainer, toast } from "react-toastify";
import { Radio } from "antd";
import DataPagination from "@/components/DataPagination";
import UserCard from "@/components/user/UserCard";
import Navbar from "@/components/Navbar";

const RadioGroup = Radio.Group;

export default function UserComponent() {
  const [dataUser, setDataUser] = useState<IUser[] | any>();
  const [query, setQuery] = useState<string>("");
  const [pageData, setPageData] = useState<number>(1);
  const [pageSizeData, setPageSizeData] = useState<number>(10);
  const [pagesTotal, setPagesTotal] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [id, setId] = useState<number | any>();
  const [name, setName] = useState<string | undefined | any>();
  const [email, setEmail] = useState<string | any>();
  const [gender, setGender] = useState<"male" | "female" | "" | any>();
  const [status, setStatus] = useState<"active" | "inactive" | "" | any>();
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [addUser, setAddUser] = useState<boolean>(false);
  const [isChange, setIsChange] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const [totalPages, data] = await getAllUser(
        pageSizeData,
        pageData,
        query
      );
      const dataUser: IUser[] = data as unknown as IUser[];
      const dataTotalPages: number = totalPages as unknown as number;
      const total = dataTotalPages * pageSizeData;
      setDataUser(dataUser);
      setTotalData(total);
    };
    fetchData();
  }, [pageData, pageSizeData, query, isChange]);

  const handleClearInput = () => {
    setName("");
    setEmail("");
    setGender("");
    setStatus("");
  };

  useEffect(() => {
    if (name && email && gender && status) {
      setIsComplete(true);
    } else setIsComplete(false);
  }, [name, email, gender, status]);

  const handlePost = async () => {
    const response = await postUser(name, email, gender, status);
    console.log(response);
    setIsChange(!isChange);
    if (response.id) {
      toast.success(`User: ${response.id} berhasil dibuat`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
      });
    } else {
      setIsChange(!isChange);
      toast.error(`${response[0].field}: ${response[0].message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: true,
      });
    }
    handleClearInput();
  };

  const handleEdit = async () => {
    const res = await editUser(id, name, email, gender, status);
    console.log(res);
    setIsChange(!isChange);
    handleClearInput();
    setAddUser(false);
  };

  const handlePaginationChange = async (page: number, pageSize: number) => {
    setPageData(page);
    setPageSizeData(pageSize);
    console.log({ pageData, pageSizeData });
  };
  const handleDataChange = async (dataChange: any) => {
    console.log(dataChange);
    setIsChange(!isChange);
    setIsEdit(dataChange.isEdit);
    setAddUser(dataChange.isEdit ? true : false);
    setId(dataChange.id);
    setName(dataChange.name);
    setEmail(dataChange.email);
    setGender(dataChange.gender);
    setStatus(dataChange.status);
  };
  return (
    <div className="w-full flex flex-col justify-center items-center py-8">
      <Navbar select="user" />
      <ToastContainer />
      <div className="max-w-[800px] mt-20 flex flex-col justify-center items-center ">
        <div></div>
        {/* <p className="font-bold text-3xl my-8">Users</p> */}
        <div className="w-full text-white ">
          <button
            onClick={() => {
              setAddUser(!addUser);
              handleClearInput();
              setIsEdit(false);
            }}
            className={`${
              addUser ? "bg-red-700" : " bg-blue-800"
            } p-3 rounded-xl mb-3 font-bold`}
          >
            {addUser ? "Close" : "Add User"}
          </button>
          <div
            className={`grid grid-cols-4 gap-y-3 p-4 rounded-xl my-3 bg-slate-900 ${
              addUser ? "" : "hidden"
            }`}
          >
            <p>Name</p>
            <input
              placeholder="Name"
              className="col-span-3 text-black p-2"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            {/* <p className={`isnamefull? "hidden": "inline" hidden`}>  </p> */}
            <p>Email</p>
            <input
              placeholder="Email"
              className="col-span-3 text-black p-2"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <p>Gender</p>
            <div className="col-span-3 ">
              <RadioGroup
                onChange={(e) => setGender(e.target.value)}
                value={gender}
              >
                <Radio value="" defaultChecked className="hidden"></Radio>
                <Radio value="male" className="text-white">
                  Male
                </Radio>
                <Radio value="female" className="text-white">
                  Female
                </Radio>
              </RadioGroup>
            </div>
            <p>Status</p>
            <div className="col-span-3">
              <RadioGroup
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <Radio value="active" className="text-white">
                  Active
                </Radio>
                <Radio value="inactive" className="text-white">
                  Inactive
                </Radio>
              </RadioGroup>
            </div>
            <button
              className={`col-span-4 mt-5 py-2 font-bold ${
                isComplete ? "bg-blue-800" : "bg-gray-500"
              } ${isEdit ? " hidden " : "inline"}`}
              onClick={() => handlePost()}
              disabled={!isComplete}
            >
              Create
            </button>
            <button
              className={`col-span-4 mt-5 py-2 font-bold ${
                isComplete ? "bg-yellow-600" : "bg-gray-500"
              } ${isEdit ? " inline " : " hidden "} `}
              onClick={() => handleEdit()}
              disabled={!isComplete}
            >
              EDIT
            </button>
          </div>
        </div>
        <input
          className="text-black p-2 w-full mb-4"
          placeholder="Search User"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <UserCard user={dataUser} onChange={handleDataChange} />
        <div className="w-full flex justify-center bg-white p-1 mt-5">
          <DataPagination
            onChangePagination={handlePaginationChange}
            totalData={totalData}
          />
        </div>
      </div>
    </div>
  );
}
