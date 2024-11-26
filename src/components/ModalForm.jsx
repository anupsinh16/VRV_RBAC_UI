import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

const ModalForm = ({ open, onClose, onSubmit, fields, title, initialData }) => {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: 400,
          bgcolor: "background.paper",
          p: 4,
          m: "auto",
          mt: "10%",
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" mb={2}>
          {title}
        </Typography>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <TextField
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type || "text"}
              value={formData[field.name] || ""}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          ))}
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalForm;
