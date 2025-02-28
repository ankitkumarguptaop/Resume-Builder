"use client";
import React, { useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Modal } from "@mui/material";
import Template1 from "../template1/template1";
import jsPDF from "jspdf";

export default function MediaCard({ data }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const reportTemplateRef = useRef(null);

  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: "a4",
      unit: "px",
    });

    doc.setFont("Inter-Regular", "normal");

    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save("document");
      },
    });
  };

  const modalStyle1 = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    minWidth: "750px",
    height: "830px",
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
    <>
      <Card sx={{ maxWidth: 345, margin: "15px" }}>
        <CardMedia sx={{ height: 140 }} title="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {data.introduction}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="small"
            onClick={() => setIsOpenModal(true)}
          >
            View
          </Button>
          <Button variant="contained" size="small">
            Delete
          </Button>
          <Button variant="contained" size="small">
            Edit
          </Button>
        </CardActions>
      </Card>
      <Modal
        sx={modalStyle1}
        open={isOpenModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Box ref={reportTemplateRef}>
            <Template1 data={data}></Template1>
          </Box>

          <Button
            variant="contained"
            sx={{ color: "white", margin: "0 10px" }}
            onClick={() => setIsOpenModal(false)}
          >
            close
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "green", color: "white", margin: "0 10px" }}
            onClick={() => handleGeneratePdf()}
          >
            Export
          </Button>
        </Box>
      </Modal>
    </>
  );
}
