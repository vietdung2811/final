import models from "../modelData/models";

export default function fetchModel(url) {
  
  if (url === "/user/list") {
    return Promise.resolve(models.userListModel());
  }
  if (url.startsWith("/user/")) {
    const id = url.split("/")[2];
    return Promise.resolve(models.userModel(id));
  }
  if (url.startsWith("/photosOfUser/")) {
    const id = url.split("/")[2];
    return Promise.resolve(models.photoOfUserModel(id));
  }
  return Promise.reject("Unknown URL: " + url);
}
