import "./App.css";

import React, { useState } from "react";
import { Grid, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/Authorization/PrivateRoute";
import Register from "./components/Register/Register";
import { UploadImage } from "./components/UploadImage/UploadImage";

const App = (props) => {
  const [advancedFeatures, setAdvancedFeatures] = useState(false);

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar
              advancedFeatures={advancedFeatures}
              setAdvancedFeatures={setAdvancedFeatures}
            />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <UserList />
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected routes */}
                <Route element={<PrivateRoute />}>
                  <Route path="/uploadImg/" element={<UploadImage />} />
                  <Route path="/users/:userId" element={<UserDetail />} />
                  <Route
                    path="/photos/:userId"
                    element={<UserPhotos advancedFeatures={advancedFeatures} />}
                  />
                  <Route path="/users" element={<UserList />} />
                </Route>
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
