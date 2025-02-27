"use client";
import { Box, Button, Typography } from "@mui/material";
import style from "./auth.module.css";
import google from "../assets/images/googleLogo.svg";
import Image from "next/image";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { loginUser } from "@/features/auth/auth.slice";
import { toast } from "react-toastify";
import ReduxProvider from "@/store/redux-provider";

export default function Home() {
  const dispatch = useDispatch();
  function googleAuthentication() {
    console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

    try {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then((result) => {
        if (result.user) {
          toast.success("User successfuly signup!", {
            position: "top-center",
          });
          dispatch(
            loginUser({
              email: result.user.email,
              name: result.user.displayName,
              avatar: result.user.photoURL,
            })
          );
          // navigate("/home");
        }
      });
    } catch (error) {
      toast.error("Failed  signup!", {
        position: "top-center",
      });
    }
  }

  return (

      <Box className={style["login-container"]}>
        <Box className={style["left-container"]}>
          <Typography
            variant="h2"
            sx={{ marginBottom: "10px", color: "#424242" }}
          >
            Resume Builder
          </Typography>
          <Typography
            variant="h6"
            sx={{ marginBottom: "10px", color: "#424242" }}
          >
            Create your resume in minutes
          </Typography>
        </Box>

        <Box className={style["right-container"]}>
          <Typography
            variant="h4"
            sx={{ marginBottom: "10px", color: "#424242" }}
          >
            Sign In
          </Typography>

          <Box className={style["login-button"]} onClick={googleAuthentication}>
            <Image
              src={google}
              alt="google"
              height={"100%"}
              width={"100%"}
              style={{ margin: "0 10px" }}
            ></Image>
            <Typography sx={{ margin: "0 10px" }}>
              Sign in with Google
            </Typography>
          </Box>
        </Box>
      </Box>
  );
}
