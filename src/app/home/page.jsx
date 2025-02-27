"use client";
import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import Template from "@/components/template/template";
import style from "./home.module.css";

const Home = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const modalStyle = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    minWidth: "630px",
    height: "600px",
    maxHeight: "auto",
    color: "black",
    p: 3,
    borderRadius: "10px",

    "&:focus": {
      outline: "none",
    },
  };

  function handleCloseModal() {
    setIsOpenModal(false);
  }
  return (
    <Box sx={{ position: "relative" }}>
      <CreateIcon
        sx={{
          cursor: "pointer",
          height: "50px",
          width: "50px",
          position: "absolute",
          right: "30px",
          bgcolor: "green",
          color: "white",
          borderRadius: "50%",
          padding: "10px",
        }}
        onClick={() => setIsOpenModal(true)}
      ></CreateIcon>
      <Modal
        sx={modalStyle}
        open={isOpenModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={style.template}>
          <Template></Template>
          <Template></Template>
          <Template></Template>
        </Box>
      </Modal>
    </Box>
  );
};

export default Home;
