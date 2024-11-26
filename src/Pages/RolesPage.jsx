
import React, { useState, useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ModalForm from "../components/ModalForm";
import api from "../services/api";

const RolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    api.getRoles().then((data) => setRoles(data));
  }, []);

  const handleAddEditRole = (role) => {
    if (role.id) {
      //To Update existing role
      api.updateRole(role).then(() => {
        setRoles((prev) =>
          prev.map((r) => (r.id === role.id ? { ...r, ...role } : r))
        );
      });
    } else {
      //To Add new role
      api.addRole(role).then((newRole) => setRoles((prev) => [...prev, newRole]));
    }
    setOpen(false);
  };

  const handleEditClick = (role) => {
    setSelectedRole(role);
    setOpen(true);
  };

  const handleDeleteClick = (id) => {
    api.deleteRole(id).then(() => {
      setRoles((prev) => prev.filter((role) => role.id !== id));
    });
  };

  const roleFields = [
    { name: "name", label: "Role Name" },
    { name: "description", label: "Description", type: "textarea" },
    { name: "permissions", label: "Permissions", type: "multiselect" },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Role Name", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
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
    <Box p={3} backgroundColor={"#dadbf3"}>
      <Typography variant="h4" mb={2}>
        Roles Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setSelectedRole(null);
          setOpen(true);
        }}
        sx={{ marginBottom: 2 }}
      >
        Add Role
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
          rows={roles}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
        />
      </Box>

     
      <ModalForm
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleAddEditRole}
        fields={roleFields}
        title={selectedRole ? "Edit Role" : "Add Role"}
        initialData={selectedRole}
      />
    </Box>
    </Box>
  );
};

export default RolesPage;
