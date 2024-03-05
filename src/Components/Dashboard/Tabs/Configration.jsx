import React, { useState, useEffect } from "react";
import { Container, Table, Pagination, Button } from "react-bootstrap";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";
import "./Table.css";

const Configration = () => {
  const rowsPerPage = 10;
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://159.203.84.231:5000/get_strategy_config_details"
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (clientId, strategy) => {
    try {
      await axios.delete(
        `http://159.203.84.231:5000/delete_strategy_config/${strategy}/${clientId}`
      );
      setDeleteStatus(true);
      fetchData();
    } catch (error) {
      console.error("Error deleting data:", error);
      setDeleteStatus(false);
    }
  };

  return (
    <Container fluid>
      <Table responsive className="table-responsive">
        <thead className="table-dark">
          <tr>
            <th>Client</th>
            <th>Strategy</th>
            <th>Take Profit %</th>
            <th>Order Quantity</th>
            <th>Trading SL</th>
            <th>SL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="custom-table-body">
          {Array.isArray(rows) &&
            rows.map((row) => (
              <tr key={row?.clientId}>
                <td>{row?.clientId}</td>
                <td>{row?.strategy}</td>
                <td>{row?.take_profit}</td>
                <td>{row?.orderQty}</td>
                <td>{row?.trailing ? "True" : "False"}</td>
                <td>{row?.stopLoss}</td>
                <td>
                  <Button className="edit-button pt-1">
                    <MdOutlineModeEditOutline color="white" />
                  </Button>
                  <Button
                    className="mx-2 delete-button pt-1"
                    onClick={() => handleDelete(row?.clientId, row?.strategy)}
                  >
                    <RiDeleteBinLine color="white" />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
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
    </Container>
  );
};

export default Configration;
