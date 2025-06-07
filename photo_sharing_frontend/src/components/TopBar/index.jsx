import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import { UserContext } from "../Authorization/UserProvider";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const CustomUncheckedIcon = () => (
  <Box
    sx={{
      width: 24,
      height: 24,
      border: "2px solid white",
      borderRadius: "4px",
    }}
  />
);

const CustomCheckedIcon = () => (
  <Box
    sx={{
      width: 24,
      height: 24,
      border: "2px solid white",
      borderRadius: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
      fontWeight: "bold",
      color: "white",
      lineHeight: 1,
    }}
  >
    X
  </Box>
);

function TopBar({ advancedFeatures, setAdvancedFeatures }) {
  const handleCheckboxChange = (event) => {
    setAdvancedFeatures(event.target.checked);
  };
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Fixed: Remove the immediate invocation
  const onLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    console.log("Logout successfully");
    navigate("/login");
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }}>
          {currentUser ? (
            `Hi ${currentUser.first_name}`
          ) : (
            <>
              <button
                style={{
                  background: "transparent",
                  color: "white",
                  border: "1px solid white",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
              <button
                style={{
                  background: "transparent",
                  color: "white",
                  border: "1px solid white",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </button>
            </>
          )}
        </Typography>
        {currentUser ? (
          <Typography>
            <button
              style={{
                background: "transparent",
                color: "white",
                border: "1px solid white",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "16px",
              }}
              onClick={(e) => {
                navigate("/uploadImg");
              }}
            >
              Upload Image
            </button>
          </Typography>
        ) : (
          <></>
        )}
        {currentUser ? (
          <button
            style={{
              background: "transparent",
              color: "white",
              border: "1px solid white",
              padding: "6px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "16px",
            }}
            onClick={onLogout}
          >
            Logout
          </button>
        ) : null}
        <FormControlLabel
          control={
            <Checkbox
              checked={advancedFeatures}
              onChange={handleCheckboxChange}
              icon={<CustomUncheckedIcon />}
              checkedIcon={<CustomCheckedIcon />}
            />
          }
          label="Enable Advanced Features"
          labelPlacement="start"
          sx={{ color: "white" }}
        />
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
