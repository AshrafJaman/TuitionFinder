import React from 'react';
import DashTable from '../Dashboard/DashTable';
import './AdminTuition.css';
import { API_URL } from '../../constants';
const AdminTuition = ({ allTuition, setAllTuition, handleSnack }) => {
  console.log(allTuition);
  const handleDelete = (id) => {
    const newArr = allTuition.filter((x) => x._id !== id);
    setAllTuition(newArr);
    handleSnack('Tuition Job Deleted Successfully');
    alert('Deleted Successfully');
    fetch(`${API_URL}/delete/jobs/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.text())
      .then((json) => console.log(json));
  };

  return (
    <div className="adminTuition">
      <h3>Tuition</h3>
      <div className="tbl-header" style={{ overflowX: 'auto' }}>
        <table cellpadding="0" cellspacing="0" border="0">
          <thead>
            <tr>
              <th>Title</th>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Mobile</th>
              <th>Delete</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        <table cellpadding="0" cellspacing="0" border="0">
          <tbody>
            {allTuition.length !== 0 &&
              allTuition.map((x, index) => (
                <DashTable x={x} handleDelete={handleDelete}></DashTable>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTuition;
