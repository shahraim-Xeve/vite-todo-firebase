import React, { useRef, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link, useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { auth, db } from "../config/firebase.Config";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [spin, setSpin] = useState(true);
  const name = useRef();
  const email = useRef();
  const password = useRef();
  async function handleRegister(e) {
    e.preventDefault();
    setSpin((prevSpin) => !prevSpin);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );

      const user = userCredential.user;

      const docRef = await addDoc(collection(db, "users"), {
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
        userId: user.uid,
      });
      toast.success("Welcome", {
        position: "top-left",
      });
      navigate("/");
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error during registration: ", error.message);
      toast.error(error.message, {
        position: "top-right",
      });
    }
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
      }}
    >
      <Box
        component="form"
        onSubmit={handleRegister}
        sx={{
          textAlign: "center",
          width: "40%",
        }}
        noValidate
        autoComplete="off"
      >
        <h1>Register</h1>
        <TextField
          sx={{ width: "100%", marginBottom: "20px" }}
          type="text"
          id="name-input"
          label="Name"
          variant="filled"
          inputRef={name}
          required
        />
        <TextField
          sx={{ width: "100%", marginBottom: "20px" }}
          type="email"
          id="email-input"
          label="Email"
          variant="filled"
          inputRef={email}
          required
        />
        <TextField
          sx={{ width: "100%", marginBottom: "20px" }}
          type="password"
          id="password-input"
          label="Password"
          variant="filled"
          inputRef={password}
          required
        />

        <Box sx={{ width: "100%" }}>
          <Stack
            sx={{ display: "flex", flexDirection: "column" }}
            spacing={{ xs: 1, sm: 2 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            <Link to="/login">
              <Button sx={{ fontSize: "10px" }}>
                Already Have An Account?
              </Button>
            </Link>
            <Button type="submit" variant="contained">
              {spin ? (
                "SignUp"
              ) : (
                <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
                  <LinearProgress />
                </Stack>
              )}
              {/* {spin ? "SignUp" : <CircularProgress color="inherit" />} */}
            </Button>
          </Stack>
        </Box>
      </Box>
    </div>
  );
}
