import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";

function TopBar() {
  const location = useLocation();
  const { userId } = useParams();
  let rightContent = "";

  if (location.pathname.startsWith("/users/") && userId) {
    const user = models.userModel(userId);
    if (location.pathname.includes("/photos/")) {
      rightContent = `Photos of ${user.first_name} ${user.last_name}`;
    } else {
      rightContent = `${user.first_name} ${user.last_name}`;
    }
  } else {
    rightContent = "Home";
  }

  return (
    <AppBar position="absolute" className="topbar">
      <Toolbar className="toolbar">
        <Typography variant="h6" className="left-side">
          Đào Việt Dũng
        </Typography>
        <Typography variant="h6" className="right-side">
          {rightContent}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
