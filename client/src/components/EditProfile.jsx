import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Card,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { CometChat } from "@cometchat-pro/chat";
import { AuthContext } from "../context/AuthContext";

export default function EditProfile({
  user,
  open,
  dialogHandler,
  name,
  gender,
  city,
  home,
  relationship,
  setName,
  setGender,
  setCity,
  setHome,
  setRelationship,
}) {
  const [profilePicture, setProfilePicture] = useState();
  const [coverPicture, setCoverPicture] = useState();
  const { dispatch } = useContext(AuthContext);

  const submitHandler = () => {
    const formData = new FormData();
    formData.append("username", name);
    if (gender) formData.append("gender", gender);
    if (city) formData.append("city", city);
    if (home) formData.append("from", home);
    if (relationship) formData.append("relationship", relationship);
    if (profilePicture) formData.append("profilePicture", profilePicture);
    if (coverPicture) formData.append("coverPicture", coverPicture);
    formData.append("userId", user._id);
    axios
      .put(`${process.env.REACT_APP_API_URL}/users/${user._id}`, formData)
      .then(({ data: user }) => {
        const newUser = new CometChat.User(user._id);
        newUser.setName(user.username);
        newUser.setAvatar(user.profilePicture);
        CometChat.updateUser(newUser, process.env.REACT_APP_CHAT_AUTH_KEY).then((user) => {
          console.log("user updated", newUser);
          dispatch({ type: "UPDATE_USER", payload: user });
          window.location.reload();
        });
      });
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <form>
          <Grid item container spacing={1} justify="center">
            <Grid item lg={12}>
              <TextField
                label="Name"
                name="name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item lg={12}>
              <Grid item xs={12} sm={6} md={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Gender</InputLabel>
                  <Select
                    label="Gender"
                    name="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    {["Male", "Female", "Other"].map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item lg={12}>
              <TextField
                label="City"
                name="city"
                variant="outlined"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item lg={12}>
              <TextField
                label="Hometown"
                name="hometown"
                variant="outlined"
                fullWidth
                value={home}
                onChange={(e) => setHome(e.target.value)}
              />
            </Grid>
            <Grid item lg={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Relationship</InputLabel>
                <Select
                  label="relationship"
                  name="relationship"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                >
                  {["Single", "Commited", "Married", "Other"].map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={12}>
              <FormControl fullWidth variant="outlined">
                <Button variant="outlined" component="label" startIcon={<PhotoCamera />}>
                  Upload Profile Picture
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    hidden
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                  ></input>
                </Button>
              </FormControl>
            </Grid>
            <Grid item lg={12}>
              <FormControl fullWidth variant="outlined">
                <Button variant="outlined" component="label" startIcon={<PhotoCamera />}>
                  Upload Cover Picture
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    hidden
                    onChange={(e) => setCoverPicture(e.target.files[0])}
                  ></input>
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={dialogHandler}>Cancel</Button>
        <Button onClick={submitHandler}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
