import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import axios from "axios";

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // fetchModel(`/user/${userId}`).then((data) => {
    //   setUser(data);
    // });
    axios
      .get(`https://ntnmm6-8081.csb.app/api/user/${userId}`)
      .then((response) => {
        setUser(response.data || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  if (!user) {
    return <div>Loading user details...</div>;
  }

  return (
    <div>
      <h2>
        {user.first_name} {user.last_name}
      </h2>
      <p>Location: {user.location}</p>
      <p>Occupation: {user.occupation}</p>
      <p>Description: {user.description}</p>
      <Link to={`/photos/${user._id}`}>View Photos</Link>
    </div>
  );
}

export default UserDetail;
