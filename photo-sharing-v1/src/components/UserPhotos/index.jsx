import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Chip,
} from "@mui/material";
import { useParams } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import { format } from "date-fns";
function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const data = await fetchModel(`/api/photo/photosOfUser/${userId}`);
        setPhotos(data || []);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    if (userId) getPhotos();
  }, [userId]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Photos of User {userId}
      </Typography>

      {photos.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No photos available
        </Typography>
      ) : (
        photos.map((photo) => (
          <Card key={photo._id} sx={{ mb: 4, borderRadius: 2 }}>
            <CardMedia
              component="img"
              image={`http://localhost:8081/images/${photo.file_name}`}
              alt="User photo"
              sx={{
                maxHeight: 500,
                objectFit: "contain",
                backgroundColor: "#f5f5f5",
              }}
            />
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Chip
                  label={format(new Date(photo.date_time), "PPP p")}
                  size="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="caption" color="text.secondary">
                  {photo.comments?.length ?? 0} comments
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              {photo.comments && photo.comments.length > 0 ? (
                photo.comments.map((comment) => (
                  <Box key={comment._id} sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.primary">
                      <strong>
                        {comment.user.first_name} {comment.user.last_name}:
                      </strong>{" "}
                      {comment.comment}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      {new Date(comment.date_time).toLocaleString()}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No comments yet
                </Typography>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}

export default UserPhotos;
