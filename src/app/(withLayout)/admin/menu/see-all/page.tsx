"use client";

import { SearchOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import type { InputRef } from "antd";
import { Button, Input, Space, Table, message, Modal } from "antd";
import type { ColumnType, ColumnsType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Loading from "@/app/loading";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

type DataIndex = keyof DataType;

const SeeAllMenuAndOperation = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  //@ Fetch All Menu =>
  const {
    isLoading,
    error,
    data: menuData,
    refetch,
  } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios.get("http://localhost:5000/api/v1/menu").then((res) => res.data),
  });

  if (isLoading) return <Loading />;
  if (error) {
    return message.error("An error has occurred: " + error);
  }

  const handleDelete = async (menu: DataType) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/menu/${menu.key}`
      );
      if (response) {
        message.success("Menu deleted successfully", response.data);
      }
      refetch();
    } catch (error) {
      message.error("Error deleting menu" + error);
    }
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const getMenuKey = (record: any, index: number) => {
    if (record.id) {
      return record.id.toString();
    } else {
      return index.toString();
    }
  };

  const getMenuName = (record: any, index: number) => {
    if (record.title) {
      return record.title;
    } else {
      return "this record";
    }
  };

  const dataSource = menuData.data.data.map((record: any, index: number) => {
    return {
      ...record,
      key: getMenuKey(record, index),
      name: getMenuName(record, index),
    };
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "20%",
      ...getColumnSearchProps("age"),
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link href={`/admin/menu/edit/${record.key}`}>Edit</Link>
          <a
            onClick={() => {
              Modal.confirm({
                title: "Confirm",
                icon: <ExclamationCircleOutlined />,
                content: `Are you sure you want to delete " ${record.name} " ?`,
                okText: "Delete",
                cancelText: "Cancel",
                onOk: () => handleDelete(record),
              });
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ margin: "0 4%" }}>
      <h3
        style={{
          textAlign: "center",
          fontSize: "1.5em",
          color: "#545EE1",
          margin: "3% 0",
        }}
      >
        ALL MENU
      </h3>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};

const queryClient = new QueryClient();

const MenuPageWithQueryClient = () => (
  <QueryClientProvider client={queryClient}>
    <SeeAllMenuAndOperation />
  </QueryClientProvider>
);

export default MenuPageWithQueryClient;
