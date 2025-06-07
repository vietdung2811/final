import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import axios from "axios";
import { Box } from "@mui/material";
import { UserContext } from "../Authorization/UserProvider";

function UserList() {
  const [users, setUsers] = useState([]);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    // fetchModel("/user/list").then((data) => {
    //   setUsers(data || []);
    // });

    if (currentUser === null) {
      return;
    }

    axios
      .get("https://ntnmm6-8081.csb.app/api/user/list")
      .then((response) => {
        setUsers(response.data || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentUser]);

  if (!Array.isArray(users)) {
    return <div>Loading users...</div>;
  }

  // const bubbleStyle = {
  //     width: 20,
  //     height: 20,
  //     borderRadius: '50%',
  //     display: 'inline-block',
  //     marginLeft: 8,
  // };

  if (!Array.isArray(users)) {
    return <div>Loading users...</div>;
  }

  return (
    <>
      {currentUser ? (
        <div>
          <h3>Users</h3>
          <ul>
            {users.map((user) => (
              <li key={user._id}>
                <div>
                  <Link to={`/users/${user._id}`}>
                    {user.first_name} {user.last_name}
                  </Link>
                  <span
                    style={{
                      backgroundColor: "green",
                      color: "white",
                      borderRadius: "50%",
                      padding: "2px 6px",
                      fontSize: "12px",
                      marginLeft: "8px",
                    }}
                  >
                    1
                  </span>
                  <span
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "50%",
                      padding: "2px 6px",
                      fontSize: "12px",
                      marginLeft: "8px",
                    }}
                  >
                    2
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default UserList;
