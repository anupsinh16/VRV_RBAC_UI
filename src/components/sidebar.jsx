import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText } from "@mui/material";

const Sidebar = () => (
  <div style={{ width: 200, height: "100vh", backgroundColor: "#dadbf3" }}>
    <List>
      <ListItem button component={Link} to="/users">
        <ListItemText primary="Users" />
      </ListItem>
      <ListItem button component={Link} to="/roles">
        <ListItemText primary="Roles" />
      </ListItem>
      <ListItem button component={Link} to="/permissions">
        <ListItemText primary="Permissions" />
      </ListItem>
    </List>
  </div>
);

export default Sidebar;
