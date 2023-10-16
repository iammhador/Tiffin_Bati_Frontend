// "use client";

// import { SearchOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
// import React, { useRef, useState } from "react";
// import Highlighter from "react-highlight-words";
// import type { InputRef } from "antd";
// import { Button, Input, Space, Table, message, Modal } from "antd";
// import type { ColumnType, ColumnsType } from "antd/es/table";
// import type { FilterConfirmProps } from "antd/es/table/interface";

// interface DataType {
//   key: string;
//   name: string;
//   age: number;
//   address: string;
// }

// type reusableTable = {
//   data: any;
// };

// type DataIndex = keyof DataType;

// const ReusableTable = ({ data }: reusableTable) => {
//   const [searchText, setSearchText] = useState("");
//   const [searchedColumn, setSearchedColumn] = useState("");
//   const searchInput = useRef<InputRef>(null);

//   const handleDelete = (record: DataType) => {
//     // Your delete logic here
//     console.log("Deleting record", record);
//   };

//   const handleSearch = (
//     selectedKeys: string[],
//     confirm: (param?: FilterConfirmProps) => void,
//     dataIndex: DataIndex
//   ) => {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//   };

//   const handleReset = (clearFilters: () => void) => {
//     clearFilters();
//     setSearchText("");
//   };

//   const getColumnSearchProps = (
//     dataIndex: DataIndex
//   ): ColumnType<DataType> => ({
//     filterDropdown: ({
//       setSelectedKeys,
//       selectedKeys,
//       confirm,
//       clearFilters,
//       close,
//     }) => (
//       <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
//         <Input
//           ref={searchInput}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) =>
//             setSelectedKeys(e.target.value ? [e.target.value] : [])
//           }
//           onPressEnter={() =>
//             handleSearch(selectedKeys as string[], confirm, dataIndex)
//           }
//           style={{ marginBottom: 8, display: "block" }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             onClick={() =>
//               handleSearch(selectedKeys as string[], confirm, dataIndex)
//             }
//             icon={<SearchOutlined />}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => clearFilters && handleReset(clearFilters)}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Reset
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               confirm({ closeDropdown: false });
//               setSearchText((selectedKeys as string[])[0]);
//               setSearchedColumn(dataIndex);
//             }}
//           >
//             Filter
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               close();
//             }}
//           >
//             close
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered: boolean) => (
//       <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
//     ),
//     onFilter: (value, record) =>
//       record[dataIndex]
//         .toString()
//         .toLowerCase()
//         .includes((value as string).toLowerCase()),
//     onFilterDropdownOpenChange: (visible) => {
//       if (visible) {
//         setTimeout(() => searchInput.current?.select(), 100);
//       }
//     },
//     render: (text) =>
//       searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
//           searchWords={[searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ""}
//         />
//       ) : (
//         text
//       ),
//   });

//   let initialData: DataType[] = [];
//   if (data && Array.isArray(data)) {
//     initialData = data;
//   }

//   const columns: ColumnsType<DataType> = [
//     {
//       title: "Title",
//       dataIndex: "title",
//       key: "title",
//       width: "30%",
//       ...getColumnSearchProps("name"),
//     },
//     {
//       title: "Category",
//       dataIndex: "category",
//       key: "category",
//       width: "20%",
//       ...getColumnSearchProps("age"),
//     },
//     {
//       title: "CreatedAt",
//       dataIndex: "createdAt",
//       key: "createdAt",
//       ...getColumnSearchProps("address"),
//       sorter: (a, b) => a.address.length - b.address.length,
//       sortDirections: ["descend", "ascend"],
//     },
//     {
//       title: "Action",
//       dataIndex: data,
//       key: "action",
//       render: (_, record) => (
//         <Space size="middle">
//           <a onClick={() => console.log(`Editing record ${record.key}`)}>
//             Edit
//           </a>
//           <a
//             onClick={() => {
//               Modal.confirm({
//                 title: "Confirm",
//                 icon: <ExclamationCircleOutlined />,
//                 content: "Are you sure you want to delete this record?",
//                 okText: "Delete",
//                 cancelText: "Cancel",
//                 onOk: () => handleDelete(record),
//               });
//             }}
//           >
//             Delete
//           </a>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <div style={{ margin: "0 4%" }}>
//       <Table columns={columns} dataSource={initialData} />
//     </div>
//   );
// };

// export default ReusableTable;
