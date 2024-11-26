
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography, Modal } from "@mui/material";
import api from "../services/api";
import PermissionModal from "../components/permissionmodal";

const PermissionsPage = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  //To Fetch roles and permissions on page load
  useEffect(() => {
    api.getRoles().then(setRoles);
    api.getPermissions().then(setPermissions);
  }, []);

  //To Handle updating role permissions
  const handleUpdatePermissions = (updatedPermissions) => {
    const updatedRole = { ...selectedRole, permissions: updatedPermissions };
    api.updateRolePermissions(updatedRole.id, updatedPermissions).then(() => {
      setRoles((prev) =>
        prev.map((role) =>
          role.id === updatedRole.id ? updatedRole : role
        )
      );
      setOpenModal(false);
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Role Name", width: 200 },
    {
      field: "permissions",
      headerName: "Permissions",
      width: 300,
      valueGetter: (params) =>
        params.row?.permissions.map((perm) => perm.name).join(", "),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <Button
          variant="outlined"
          onClick={() => {
            setSelectedRole(params.row);
            setOpenModal(true);
          }}
        >
          Edit Permissions
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 2, backgroundColor: "#dadbf3" }}>
      <Typography variant="h4" gutterBottom>
        Permissions Management
      </Typography>
      <DataGrid
        rows={roles}
        columns={columns}
        pageSize={5}
        autoHeight
        sx={{
          "& .MuiDataGrid-root": {
            backgroundColor: "#ffffff",
          },
        }}
      />
      {openModal && (
        <PermissionModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          role={selectedRole}
          permissions={permissions}
          onUpdate={handleUpdatePermissions}
        />
      )}
    </Box>
  );
};

export default PermissionsPage;
