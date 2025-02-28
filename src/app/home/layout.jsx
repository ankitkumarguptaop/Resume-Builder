"use client";
import { Box, Button, Typography } from "@mui/material";
import style from "./home.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/auth.slice";
export default function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  function handleLogout() {
    dispatch(logout());
  }
  
  return (
    <>
      <Box className={style["navbar"]}>
        <MenuIcon />
        <Box
          sx={{
            width: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>{currentUser.name}</Typography>
          <Button variant="contained" onClick={handleLogout}>
            LogOut
          </Button>
        </Box>
      </Box>
      {children}
    </>
  );
}
