import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import edit from "../img/edit.svg";
import trash from "../img/trash.svg";
import plus from "../img/plus.svg";
import details from "../img/details.svg";
import Modal from "./Modal";
import AddForm from "./AddForm";

const columns = [
  {
    id: "serialNumber",
    label: "Serial Number",
    minWidth: 170,
    align: "center",
  },
  { id: "humanName", label: "Human Name", minWidth: 170, align: "center" },
  {
    id: "ip",
    label: "IP",
    minWidth: 170,
    align: "center",
  },
  {
    id: "manage",
    label: "Manage",
    minWidth: 170,
    align: "center",
  },
];

function createData(serialN, humanN, ip, manage) {
  return { serialN, humanN, ip, manage };
}

export default function GatewayTable({ dbGateway, createGateway, setToUpdating, toUpdating, updateGateway, deleteGateway }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [addState, setAddState] = React.useState(false)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickAdd = () => {
    setAddState(true);
  }

  return (
    <section className="gatewayTable">
      <h2 className="sectionTitle">Gateways</h2>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dbGateway
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.idGateway}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return value ? (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        ) : (
                          <TableCell key={column.id} align={column.align}>
                            <img src={edit} alt="" title="Edit" onClick={() => { setToUpdating(row); setAddState(true); }} setToUpdating={row} />
                            <img src={trash} alt="" title="Delete" onClick={() => deleteGateway(row.idGateway)} />
                            <img src={details} alt="" title="Details" />
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="addNewGat" onClick={handleClickAdd}>
            <img title="New Gateway" src={plus} alt="" />
          </div>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={dbGateway.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </Paper>
      <Modal addState={addState} setAddState={setAddState} toUpdating={toUpdating} setToUpdating={setToUpdating} >
        <AddForm setAddState={setAddState} createGateway={createGateway} toUpdating={toUpdating} setToUpdating={setToUpdating} updateGateway={updateGateway} />
      </Modal>
    </section>
  );
}
