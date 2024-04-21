"use client";

import { IPost, IUser } from "@/type/type";
import { getAllPost, getAllUser } from "../../api/api";
import { useEffect, useState } from "react";
import DataPagination from "@/components/DataPagination";
import { Pagination } from "antd";
import PostCard from "@/components/post/PostCard";
import Navbar from "@/components/Navbar";

export default function PagePostComponent() {
  const [dataPost, setDataPost] = useState<IPost[]>([]);
  const [pageData, setPageData] = useState<number>(1);
  const [pageSizeData, setPageSizeData] = useState<number>(10);
  const [pagesTotal, setPagesTotal] = useState<number>(0);
  const [totalData, setTotalData] = useState<number>(0);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const [totalPages, data] = await getAllPost(
        pageSizeData,
        pageData,
        query
      );
      const dataPost: IPost[] = data as unknown as IPost[];
      const dataTotalPages: number = totalPages as unknown as number;
      const total = dataTotalPages * pageSizeData;
      setDataPost(dataPost);
      setPagesTotal(dataTotalPages);
      setTotalData(total);
    };
    fetchData();
  }, [pageData, pageSizeData, query, pagesTotal]);

  const handlePaginationChange = async (page: number, pageSize: number) => {
    setPageData(page);
    setPageSizeData(pageSize);
  };
  return (
    <div className="w-full flex flex-col justify-center items-center py-8">
      <Navbar select="post" />
      <div className="max-w-[800px] mt-20 flex flex-col justify-center items-center ">
        <input
          className="text-black p-2 w-full mb-4"
          placeholder="Search Post"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {dataPost.map((post_item) => {
          return (
            <div key={post_item.id}>
              <PostCard post={post_item} />
            </div>
          );
        })}
        <div className="w-full flex justify-center bg-white p-1">
          <DataPagination
            onChangePagination={handlePaginationChange}
            totalData={totalData}
          />
        </div>
      </div>
    </div>
  );
}
