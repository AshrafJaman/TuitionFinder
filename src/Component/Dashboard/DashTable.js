import { Button } from "@material-ui/core";
import React from "react";

const DashTable = ({ x, handleDelete }) => {
  console.log(x);
  return (
    <>
      <tr>
        <td>{x.title}</td>
        <td>{x.fullName}</td>
        <td>{x.email}</td>
        <td>{x.location_1}</td>
        <td>{x.mobile}</td>
        <td>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => handleDelete(x._id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
};

export default DashTable;
