import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../components/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

export default function simpledashboard() {
  const [tableData, setTableData] = useState([]);
  const [activeUserToday, setActiveUserToday] = useState(0);
  const [averageWeekly, setAverageWeekly] = useState("0");
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/dashboardData")
      .then(function (response) {
        let tableData = response.data.tableData;
        setTableData(tableData);
        let tmp = 0;
        for (let i = 0; i < tableData.length; i++) {
          const lastLoginDate = new Date(tableData[i].last_login);
          if (isToday(lastLoginDate)) {
            tmp += 1;
          }
        }
        setActiveUserToday(tmp);
        setAverageWeekly(response.data.averageWeekly);
      })
      .catch(function (error) {
        if (error.response?.status == 401) {
          alert(error.response?.data);
        }
      });
  }, []);

  return (
    <div>
      <div className="font-medium mb-5">User Dashboard</div>
      <div className="flex gap-10">
        <Card value={tableData.length} text="Total Users" />
        <Card value={activeUserToday} text="Active Users Today" />
        <Card value={averageWeekly} text="Average Active Users This Week" />
      </div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Total Login</TableCell>
            <TableCell>Last Login</TableCell>
            <TableCell>Last Logout</TableCell>
            <TableCell>Created at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, idx) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {idx + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.first_name}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.last_name}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.email}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.total_login}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.last_login}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.last_logout}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.created_at}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
