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
import html2canvas from "html2canvas";
import { Document, Page, pdfjs } from "react-pdf";
import Template2 from "../template2/template2";
import Link from "next/link";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function MediaCard({ data }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const reportTemplateRef = useRef(null);

  const handleGeneratePdf = async () => {
    const element = reportTemplateRef.current;

    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      windowWidth: element.scrollWidth,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (imgHeight > pageHeight) {
      let heightLeft = imgHeight;
      let position = 0;

      while (heightLeft > 0) {
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        position -= pageHeight;

        if (heightLeft > 0) pdf.addPage();
      }
    } else {
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    }

    const pdfBlob = pdf.output("blob");
    const pdfBlobUrl = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfBlobUrl);
  };

  const modalStyle1 = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "950px",
    height: "82vh",
    color: "black",
    p: 3,
    borderRadius: "10px",
    outline: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "auto",
    // backgroundColor:"red"
  };

  function handleCloseModal() {
    setIsOpenModal(false);
    setPdfUrl(null);
  }

  return (
    <>
      <Card sx={{ maxWidth: 345, margin: "15px" }}>
        <CardMedia sx={{ height: 140 }} title="Template Preview" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {data.introduction}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" size="small" onClick={() => setIsOpenModal(true)}>
            View
          </Button>
          <Button variant="contained" size="small">Delete</Button>
          <Button variant="contained" size="small">Edit</Button>
        </CardActions>
      </Card>

      <Modal
        sx={modalStyle1}
        open={isOpenModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box >
          {!pdfUrl ? (
            <>
              <Box ref={reportTemplateRef}>
                <Template2 data={data}></Template2>
              </Box>
              <Button
                variant="contained"
                sx={{ color: "white", margin: "10px" }}
                onClick={handleGeneratePdf}
              >
                Generate PDF Preview
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6">PDF Preview</Typography>
              <Document file={pdfUrl}>
                <Page pageNumber={1} />
              </Document>
              <Button
                variant="contained"
                sx={{ color: "white", margin: "10px" }}
                onClick={() => window.open(pdfUrl, "_blank")}
              >
                Open PDF
              </Button>
              <Button
                   onClick={() => {
                    const link = document.createElement("a");
                    link.href = pdfUrl;
                    link.download = "resume.pdf";
                    link.click();
                  }} 
                variant="contained"
                color="primary"
              >
                Download PDF
              </Button>

            </>
          )}
          <Button variant="contained" sx={{ color: "white", margin: "10px" }} onClick={handleCloseModal}>
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}
