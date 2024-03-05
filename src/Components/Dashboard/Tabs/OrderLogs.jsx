import React, { useState, useEffect } from "react";
import { Container, Table, Pagination } from "react-bootstrap";
import { MdEdit, MdDelete } from "react-icons/md";
import axios from "axios";
import "./Table.css";
import moment from "moment";

const WebhookLog = () => {
  const rowsPerPage = 10;
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://159.203.84.231:5000/get_order_logs"
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

  return (
    <Container fluid>
      <Table responsive className="table-responsive">
        <thead className="table-dark">
          <tr>
            <th>Client Id</th>
            <th>Strategy</th>
            <th>Symbol</th>
            <th>Time</th>
            <th>Side</th>
            <th>Order Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody className="custom-table-body">
          {Array.isArray(rows) &&
            rows.map(
              (row) =>
                Array.isArray(row?.order_details) &&
                row?.order_details.length > 0 &&
                row?.order_details.map((orderDetail, index) => (
                  <tr key={index}>
                    <td>{row?.user_order_data?.clientId}</td>
                    <td>{row?.strategy}</td>
                    <td>{row?.user_order_data?.symbol}</td>
                    <td>
                      {moment(row?.timestamp).format("YYYY-MM-DD HH:mm:ss")}
                    </td>

                    <td>{row?.user_order_data?.action}</td>

                    <td>{row?.user_order_data?.orderType}</td>
                    <td>{orderDetail?.price}</td>
                  </tr>
                ))
            )}
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

export default WebhookLog;
