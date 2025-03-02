import React, { useRef } from "react";
import { Box, Typography, List, ListItem, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import CodeIcon from "@mui/icons-material/Code";
import styles from "./template3.module.css";

const Template3 = ({ data }) => {


  return (
    <Box className={styles.pageWrapper}>
    

      <Box className={styles.resumeContainer}>
        {/* Header */}
        <Box className={styles.header}>
          <Typography variant="h4" className={styles.name}>{data?.name}</Typography>
          <Typography variant="subtitle1" className={styles.title}>{"Full Stack Web Developer "}</Typography>
        </Box>

        <Box className={styles.content}>
        
          <Box className={styles.leftPanel}>
            <Box className={styles.section}>
              <Typography variant="h6" className={styles.sectionTitle}>
                <PersonIcon className={styles.icon} /> About Me
              </Typography>
              <Typography variant="body2">{data?.introduction}</Typography>
            </Box>

            <Box className={styles.section}>
              <Typography variant="h6" className={styles.sectionTitle}>
                <PhoneIcon className={styles.icon} /> Contact
              </Typography>
              <Typography variant="body2">📞 {data?.phone}</Typography>
              <Typography variant="body2">📧 {data?.email}</Typography>
            </Box>

            <Box className={styles.section}>
              <Typography variant="h6" className={styles.sectionTitle}>
                <CodeIcon className={styles.icon} /> Skills
              </Typography>
              <List className={styles.skillsList}>
                {data?.skills?.split(" ").map((skill, index) => (
                  <ListItem key={index} className={styles.skillItem}>{skill}</ListItem>
                ))}
              </List>
            </Box>
          </Box>

          {/* Right Panel */}
          <Box className={styles.rightPanel}>
            <Box className={styles.section}>
              <Typography variant="h6" className={styles.sectionTitle}>
                <SchoolIcon className={styles.icon} /> Education
              </Typography>
              {data?.educations?.map((edu, index) => (
                <Box key={index} className={styles.educationItem}>
                  <Typography variant="body1" className={styles.bold}>{edu.institutionName}</Typography>
                  <Typography variant="body2">CGPA: {edu.cgpa} | {edu.passingYear}</Typography>
                </Box>
              ))}
            </Box>

            <Box className={styles.section}>
              <Typography variant="h6" className={styles.sectionTitle}>
                <WorkIcon className={styles.icon} /> Projects
              </Typography>
              {[data?.project1, data?.project2].map((project, index) => (
                <Box key={index} className={styles.projectItem}>
                  <Typography variant="body1" className={styles.bold}>Project {index + 1}</Typography>
                  <Typography variant="body2">{project}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Template3;
