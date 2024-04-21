"use client";

import React, { useState } from "react";
import { Pagination } from "antd";

interface DataPaginationProps {
  onChangePagination: (page: number, pageSize: number) => void;
  totalData: number;
}

const DataPagination: React.FC<DataPaginationProps> = ({
  onChangePagination,
  totalData,
}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const handleChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
    setTotalPages(totalPages);
    onChangePagination(page, pageSize);
  };
  return (
    <div>
      <Pagination
        defaultCurrent={1}
        onChange={handleChange}
        total={totalData}
      />
    </div>
  );
};

export default DataPagination;
