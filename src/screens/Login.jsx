import React, { useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link, useNavigate } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { auth } from "../config/firebase.Config";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [spin, setSpin] = useState(true);
  const email = useRef();
  const password = useRef();
  function handleLogin(e) {
    e.preventDefault();
    setSpin((prevSpin) => !prevSpin);
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        const user = userCredential.user;
        toast.success("Login Successfull", {
          position: "top-left",
        });
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage, {
          position: "top-right",
        });
      });
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
        onSubmit={handleLogin}
        sx={{
          textAlign: "center",
          width: "40%",
        }}
        noValidate
        autoComplete="off"
      >
        <h1>Login</h1>
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

        <Box>
          <Stack
            sx={{ display: "flex", flexDirection: "column" }}
            spacing={{ xs: 1, sm: 2 }}
            direction="row"
            useFlexGap
            flexWrap="wrap"
          >
            <Link to="/register">
              <Button sx={{ fontSize: "10px" }}>Dn't Have Account?</Button>
            </Link>
            <Button type="submit" variant="contained">
              {spin ? (
                "Login"
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
