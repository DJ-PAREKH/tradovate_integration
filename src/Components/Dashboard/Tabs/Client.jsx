import React, { useState, useEffect } from "react";
import { Container, Table, Pagination, Button } from "react-bootstrap";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";
import "./Table.css";
import ToastMessage from "../CommonComponents/ToastMessage";

const Client = () => {
  const rowsPerPage = 10;
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState([]);

  const [deleteStatus, setDeleteStatus] = useState(null);

  useEffect(() => {
    fetchData();
  }, [currentPage, deleteStatus]);
  useEffect(() => {
    if (deleteStatus !== null) {
      showToast(
        deleteStatus
          ? "User deleted successfully"
          : "Error deleting user. Please try again",
        deleteStatus ? "success" : "error"
      );
    }
  }, [deleteStatus]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://159.203.84.231:5000/get_client_details"
      );

      const data = response.data;
      setTotalRows(data.length);
      setTotalPages(Math.ceil(data.length / rowsPerPage));
      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = currentPage * rowsPerPage;
      setRows(data.slice(startIndex, endIndex));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDeleteClient = async (clientId) => {
    try {
      await axios.delete(
        `http://159.203.84.231:5000/delete_client/${clientId}`
      );
      setDeleteStatus(true);
      console.log(clientId, "clientId");
      showToast("User deleted successfully", "success");
      fetchData();
    } catch (error) {
      console.error("Error deleting client:", error);
      setDeleteStatus(false);
      showToast("Error deleting user. Please try again", "error");
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const showToast = (message, type) => {
    // Display the toast message here
    console.log(message, type);
  };
  return (
    <Container fluid>
      <Table responsive className="table-responsive">
        <thead className="table-dark">
          <tr>
            <th>ClientId</th>
            <th>Name</th>
            <th>Tradable</th>
            <th>MaxLoss</th>
            <th>Account Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="custom-table-body">
          {Array?.isArray(rows) &&
            rows?.map((row) => (
              <tr key={row?.name}>
                <td>{row?.clientId}</td>
                <td>{row?.name}</td>
                <td>{row?.tradeable ? "True" : "False"}</td>
                <td>{row?.maxLoss}</td>
                <td>{row?.live ? "Live" : "Demo"}</td>
                <td>
                  <Button className="edit-button pt-1">
                    <MdOutlineModeEditOutline color="white" />
                  </Button>
                  <Button
                    className="mx-2 delete-button pt-1"
                    onClick={() => handleDeleteClient(row?.clientId)}
                  >
                    <RiDeleteBinLine color="white" />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ToastMessage />
      <Pagination className="d-flex justify-content-end custom-pagination">
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
      <ToastMessage />
    </Container>
  );
};

export default Client;
