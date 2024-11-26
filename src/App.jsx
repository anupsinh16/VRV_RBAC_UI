//Routing 
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import UsersPage from "./Pages/UserPage";
import RolesPage from "./Pages/RolesPage";
import Home from "./Pages/home";
import PermissionsPage from "./Pages/PermissionsPage";


const App = () => (
  <Router>
    <CssBaseline />
    <Header />
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: 200, padding: 20, flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/roles" element={<RolesPage />} />
          <Route path="/permissions" element={<PermissionsPage />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;

