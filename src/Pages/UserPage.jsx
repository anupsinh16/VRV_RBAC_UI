import React, { useState, useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ModalForm from "../components/ModalForm";
import api from "../services/api";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    api.getUsers().then((data) => setUsers(data));
  }, []);

  const handleAddEditUser = (user) => {
    if (user.id) {
      //To Update existing user
      api.updateUser(user).then(() => {
        setUsers((prev) =>
          prev.map((u) => (u.id === user.id ? { ...u, ...user } : u))
        );
      });
    } else {
      //To Add new user
      api.addUser(user).then((newUser) => setUsers((prev) => [...prev, newUser]));
    }
    setOpen(false);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleDeleteClick = (id) => {
    api.deleteUser(id).then(() => {
      setUsers((prev) => prev.filter((user) => user.id !== id));
    });
  };

  const userFields = [
    { name: "name", label: "Name" },
    { name: "email", label: "Email", type: "email" },
    { name: "status", label: "Status" },
    { name: "role", label: "Role" },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "status", headerName: "Status", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => handleEditClick(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDeleteClick(params.row.id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{
      display: "flex",
      margin:"0 auto",
      flexDirection: "column",
      alignItems: "center", 
      padding: 2,
    }}>
    <Box p={3} style={{backgroundColor:"#dadbf3" ,margin:"0"}} >
      <Typography variant="h4" mb={2}>
        Users Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setSelectedUser(null);
          setOpen(true);
        }}
        sx={{ marginBottom: 2 }}
      >
        Add User
      </Button>

     
      <Box
        sx={{
          width: "100%",
          height: 400,
          backgroundColor: "#ffffff",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
        />
      </Box>

     
      <ModalForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleAddEditUser}
        fields={userFields}
        title={selectedUser ? "Edit User" : "Add User"}
        initialData={selectedUser}
      />
    </Box>
    </Box>
  );
};

export default UsersPage;

