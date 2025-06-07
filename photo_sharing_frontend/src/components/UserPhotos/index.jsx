import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import axios from "axios";
import { UserContext } from "../Authorization/UserProvider";

function UserPhotos({ advancedFeatures }) {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newComment, setNewComment] = useState("");
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get(`https://ntnmm6-8081.csb.app/api/photo/photosOfUser/${userId}`)
      .then((data) => {
        setPhotos(data.data || []);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // fetchModel(`/photosOfUser/${userId}`).then((data) => {
    //   setPhotos(data || []);
    //   setCurrentIndex(0); // reset về ảnh đầu tiên
    // });

    fetchData();
    setCurrentIndex(0); // reset về ảnh đầu tiên
  }, [userId]);

  if (!Array.isArray(photos)) {
    return <div>Loading photos...</div>;
  }

  if (photos.length === 0) {
    return <div>No photos found.</div>;
  }

  const handleNext = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleCommentSubmit = (comment, photo, user_id) => {
    if (!comment.trim()) return;
    axios
      .post(`https://ntnmm6-8081.csb.app/api/photo/${photo._id}/addComment`, {
        comment,
        user_id,
      })
      .then((response) => {
        console.log(response.data);
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderSinglePhoto = () => {
    const photo = photos[currentIndex];
    return (
      <div>
        <Card key={photo._id} sx={{ marginBottom: 4 }}>
          <CardMedia
            component="img"
            image={`https://ntnmm6-8081.csb.app/api/photo/image/${photo.file_name}`}
            alt={`Photo uploaded on ${new Date(
              photo.date_time
            ).toLocaleString()}`}
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: "600px",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Uploaded at: {new Date(photo.date_time).toLocaleString()}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Comments:</Typography>
            {photo.comments && photo.comments.length > 0 ? (
              photo.comments.map((comment) => (
                <Box key={comment._id} sx={{ my: 1 }}>
                  <Typography variant="body2">
                    <Link
                      to={`/users/${comment.user._id}`}
                      style={{ fontWeight: "bold", textDecoration: "none" }}
                    >
                      {comment.user.first_name} {comment.user.last_name}
                    </Link>{" "}
                    commented at {new Date(comment.date_time).toLocaleString()}:
                  </Typography>
                  <Typography variant="body1" sx={{ ml: 2 }}>
                    {comment.comment}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No comments yet.
              </Typography>
            )}
          </CardContent>
        </Card>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            onClick={handleBack}
            disabled={currentIndex === 0}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={currentIndex === photos.length - 1}
          >
            Next
          </Button>
        </Stack>
      </div>
    );
  };

  return (
    <div>
      <h2>Photos</h2>
      {advancedFeatures
        ? renderSinglePhoto()
        : photos.map((photo) => (
            <Card key={photo._id} sx={{ marginBottom: 4 }}>
              <CardMedia
                component="img"
                image={`https://ntnmm6-8081.csb.app/api/photo/image/${photo.file_name}`}
                alt={`Photo uploaded on ${new Date(
                  photo.date_time
                ).toLocaleString()}`}
                sx={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "600px",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Uploaded at: {new Date(photo.date_time).toLocaleString()}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">Comments:</Typography>
                {photo.comments && photo.comments.length > 0 ? (
                  photo.comments.map((comment) => (
                    <Box key={comment._id} sx={{ my: 1 }}>
                      <Typography variant="body2">
                        <Link
                          to={`/users/${comment.user._id}`}
                          style={{ fontWeight: "bold", textDecoration: "none" }}
                        >
                          {comment.user.first_name} {comment.user.last_name}
                        </Link>{" "}
                        commented at{" "}
                        {new Date(comment.date_time).toLocaleString()}:
                      </Typography>
                      <Typography variant="body1" sx={{ ml: 2 }}>
                        {comment.comment}
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No comments yet.
                  </Typography>
                )}

                <div>
                  <textarea
                    rows={5}
                    cols={40}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    style={{ fontSize: "16px", padding: "8px" }}
                    placeholder="Nhập nội dung nhiều dòng tại đây..."
                  />
                  <button
                    onClick={() => {
                      handleCommentSubmit(newComment, photo, currentUser._id);
                    }}
                  >
                    Comment
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
    </div>
  );
}

export default UserPhotos;
