import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchModel(`/api/user/${userId}`).then((data) => setUser(data));
  }, [userId]);

  return user ? (
    <div>
      <Typography variant="h5">
        {user.first_name} {user.last_name}
      </Typography>
      <Typography variant="body1">Location: {user.location}</Typography>
      <Typography variant="body1">
        Occupation: {user.occupation}
      </Typography>
      <Typography variant="body1">
        Description: {user.description}
      </Typography>
      <Button
        component={Link}
        to={`/photos/${userId}`}
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        View Photos
      </Button>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default UserDetail;
