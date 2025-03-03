"use client";
import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import Template from "@/components/template1/template1";
import style from "./home.module.css";
import Image from "next/image";
import Template1Img from "../../assets/images/template1.png";
import Template2Img from "../../assets/images/template2.jpg";
import Template3Img from "../../assets/images/template3.jpg";
import Template1 from "@/components/template1/template1";
import { useDispatch, useSelector } from "react-redux";
import MediaCard from "@/components/card/card";
import { redirect } from "next/navigation";
import { setCurrentResumeType } from "@/features/resume/resume.slice";


const Home = () => {
  const dispatch = useDispatch();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const currentResume = useSelector(
    (state) => state.resume.currentResumeDetails
  );

  const resumes = useSelector((state) => state.resume.resumes);
  console.log("✌️currentResume --->", resumes);

  const modalStyle = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    minWidth: "630px",
    height: "700px",
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

      {resumes?.map((resume,index) => (
        <MediaCard key={index} data={resume}></MediaCard>
      ))}

      <Modal
        sx={modalStyle}
        open={isOpenModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > 
      <Box sx={{outline: "none"}}>
        <Typography sx={{fontWeight:"bold"}}>Choose A Template </Typography>
        <Box className={style.template}>
          <Image
            src={Template1Img}
            alt={"template 1"}
            width={400}
            height={500}
            onClick={()=>{
              dispatch(setCurrentResumeType(1)) 
              redirect("home/resume-details") 
            }}
          ></Image>
          <Image
            src={Template2Img}
            alt={"template 2"}
            width={"400"}
            height={"500"}
            onClick={()=>{
              dispatch(setCurrentResumeType(2)) 
              redirect("home/resume-details") 
            }}
          ></Image>
          <Image
            src={Template3Img}
            alt={"template 3"}
            width={400}
            height={500}
            onClick={()=>{
              dispatch(setCurrentResumeType(3)) 
              redirect("home/resume-details") 
            }}
          ></Image>
        </Box>
          <Button variant="contained" onClick={handleCloseModal} >close</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Home;
