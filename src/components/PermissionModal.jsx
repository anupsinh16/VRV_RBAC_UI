import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
} from "@mui/material";

const PermissionModal = ({ open, onClose, role, permissions, onUpdate }) => {
  const [selectedPermissions, setSelectedPermissions] = useState(
    role.permissions.map((perm) => perm.id)
  );

  const handlePermissionChange = (event) => {
    setSelectedPermissions(event.target.value);
  };

  const handleSave = () => {
    const updatedPermissions = permissions.filter((perm) =>
      selectedPermissions.includes(perm.id)
    );
    onUpdate(updatedPermissions);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 24,
          padding: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Edit Permissions for {role.name}
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="permissions-select-label">Permissions</InputLabel>
          <Select
            labelId="permissions-select-label"
            multiple
            value={selectedPermissions}
            onChange={handlePermissionChange}
            input={<OutlinedInput label="Permissions" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((id) => (
                  <Chip
                    key={id}
                    label={
                      permissions.find((perm) => perm.id === id)?.name || ""
                    }
                  />
                ))}
              </Box>
            )}
          >
            {permissions.map((perm) => (
              <MenuItem key={perm.id} value={perm.id}>
                {perm.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ marginTop: 2, display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PermissionModal;
