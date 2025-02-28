import { Box, Typography, List, ListItemText, ListItem } from "@mui/material";
import React from "react";
import style from "./template1.module.css";
import PersonIcon from "@mui/icons-material/Person";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import SettingsIcon from "@mui/icons-material/Settings";
import SchoolIcon from "@mui/icons-material/School";
import EngineeringIcon from "@mui/icons-material/Engineering";
const Template1 = ({ data }) => {


  return (
    <Box className={style.template}>
      <Box className={style["left-template"]}>
        <Box className={style["profile"]}></Box>
        <Box className={style["personal-information"]}>
          <Box className={style["about-me"]}>
            <PersonIcon
              sx={{
                color: "White",
                top: "150px",
                left: "20px",
                position: "absolute",
              }}
            ></PersonIcon>
            <Typography
              align="justify"
              variant="h6"
              sx={{
                color: "White",
                top: "147px",
                left: "50px",
                position: "absolute",
              }}
            >
              About Me
            </Typography>
          </Box>
          <Typography
            variant="caption"
            sx={{
              color: "White",
              top: "175px",
              left: "50px",
              position: "absolute",
            }}
          >
            {data?.introduction}
          </Typography>

          <PermContactCalendarIcon
            sx={{
              color: "White",
              top: "280px",
              left: "20px",
              position: "absolute",
            }}
          ></PermContactCalendarIcon>
          <Typography
            align="justify"
            variant="h6"
            sx={{
              color: "White",
              top: "280px",
              left: "50px",
              position: "absolute",
            }}
          >
            Contact
          </Typography>
          <Box
            sx={{
              display: "flex",
              color: "White",
              top: "315px",
              left: "20px",
              position: "absolute",
            }}
          >
            <PhoneIcon></PhoneIcon>
            <Typography sx={{ margin: "0 10px", fontSize: 13 }}>
              {" "}
              {data?.phone}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              color: "White",
              top: "341px",
              left: "20px",
              position: "absolute",
            }}
          >
            <EmailIcon></EmailIcon>
            <Typography sx={{ margin: "0 10px", fontSize: 13 }}>
              {" "}
              {data?.email}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              color: "White",
              top: "378px",
              left: "20px",
              position: "absolute",
            }}
          >
            <SettingsIcon
              sx={{
                color: "White",
                marginTop: "4px",
              }}
            ></SettingsIcon>
            <Typography variant="h6" sx={{ margin: "0 10px" }}>
              Skills
            </Typography>
          </Box>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              color: "White",
              top: "395px",
              left: "55px",
              position: "absolute",
            }}
          >
            {data?.skills?.split(" ")?.map((value) => (
              <ListItem key={value} sx={{ padding: "5px 0px" }}>
                {value}
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Box className={style["right-template"]}>
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          {data?.name}
        </Typography>
        <Typography variant="h6">Graphics Designer </Typography>
        <Box sx={{ display: "flex", marginTop: "65px" }}>
          <SchoolIcon></SchoolIcon>
          <Typography
            variant="h5"
            sx={{ padding: "0 10px", fontWeight: "bold" }}
          >
            Education
          </Typography>
        </Box>
        <Box sx={{ padding: "0 35px" }}>
          {data?.educations?.map((education) => (
            <ListItem
              key={education.institutionName}
              sx={{
                padding: "5px 0px",
                marginBottom: "15px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography fontWeight={"bold"} variant="body1">
                {education.institutionName}
              </Typography>
              <Typography>CGPA : {education.cgpa}</Typography>
              <Typography>{education.passingYear}</Typography>
            </ListItem>
          ))}
        </Box>
        <Box sx={{ display: "flex", margin: "10px 0px" }}>
          <EngineeringIcon></EngineeringIcon>
          <Typography
            variant="h5"
            sx={{ padding: "0 10px", fontWeight: "bold" }}
          >
            Project 1
          </Typography>
        </Box>
        <Typography paddingLeft={"34px"}>{data?.project1}</Typography>
        <Box sx={{ display: "flex", margin: "10px 0px" }}>
          <EngineeringIcon></EngineeringIcon>
          <Typography
            variant="h5"
            sx={{ padding: "0 10px", fontWeight: "bold" }}
          >
            Project 2
          </Typography>
        </Box>
        <Typography paddingLeft={"34px"}>{data?.project2}</Typography>
      </Box>
    </Box>
  );
};

export default Template1;
