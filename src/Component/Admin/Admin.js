import React, { useEffect, useState } from 'react';
import './Admin.css';
import AdminBlog from './AdminBlog';
import AdminContact from './AdminContact';
import AdminDashboard from './AdminDashboard';
import AdminSideBar from './AdminSideBar';
import AdminTuition from './AdminTuition';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { API_URL } from '../../constants';
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const Admin = () => {
  const [step, setStep] = useState(1);
  const [allTuition, setAllTuition] = useState([]);
  const [allContact, setAllContact] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [snack, setSnack] = useState(false);
  const handleSnack = (msg) => {
    setSnack(msg);
  };
  const handleSnackClose = () => {
    setOpen(true);
    setSnack(false);
  };

  useEffect(() => {
    fetch(`${API_URL}/jobs`)
      .then((response) => response.json())
      .then((json) => {
        setAllTuition(json);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/contact`)
      .then((response) => response.json())
      .then((json) => {
        setAllContact(json);
      });
  }, []);

  return (
    <div className="admin">
      <AdminSideBar step={step} setStep={setStep}></AdminSideBar>
      {step === 1 && <AdminDashboard></AdminDashboard>}
      {step === 2 && (
        <AdminTuition
          allTuition={allTuition}
          setAllTuition={setAllTuition}
          handleSnack={handleSnack}
        ></AdminTuition>
      )}
      {step === 3 && <AdminContact allContact={allContact}></AdminContact>}
      {step === 4 && <AdminBlog handleSnack={handleSnack}></AdminBlog>}
      <Snackbar open={snack} autoHideDuration={4000} onClose={handleSnackClose}>
        <Alert severity="success" onClose={handleSnackClose}>
          {snack}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Admin;
