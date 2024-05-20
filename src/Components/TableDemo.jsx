import React from "react";
import DataTableComponent from "./GlobalComponents/DataTableComponent";
import dummyData from "./DB";
import { useNavigate } from "react-router-dom";

const TableDemo = () => {
  const navigate = useNavigate();

  const columns = [
    {
      name: "Sr. No",
      selector: row => row.id,
      searchKey: "id",
      sortable: true,
    },
    {
      name: "First Name",
      selector: row => row.first_name,
      searchKey: "first_name",
      sortable: true,
    },
    {
      name: "Last Name",
      selector: row => row.last_name,
      searchKey: "last_name",
      sortable: true,
    },
    {
      name: "Email",
      selector: row => row.email,
      searchKey: "email",
      sortable: true,
    },
    {
      name: "Mobile",
      selector: row => row.mobile,
      searchKey: "mobile",
      sortable: true,
    },
  ];

  return (
    <>
      <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="text-secondary fw-bold mb-0">Data Table!</h1>
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div>
        <DataTableComponent columns={columns} data={dummyData} />
      </div>
    </>
  );
};

export default TableDemo;
