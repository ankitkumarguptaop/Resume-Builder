"use client";
import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/input/input";
import { useForm, useFieldArray } from "react-hook-form";
import style from "./form.module.css";
import { redirect } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  createResumes,
  setCurrentResumeDetails,
  setCurrentResumeType,
  setEditState,
  setFormData,
  updateResume,
} from "@/features/resume/resume.slice";
import Image from "next/image";
import Template1Img from "../../../assets/images/template1.png";
import Template2Img from "../../../assets/images/template2.jpg";
import Template3Img from "../../../assets/images/template3.jpg";
import { Document, Page, pdfjs } from "react-pdf";
import Template1 from "@/components/template1/template1";
import Template2 from "@/components/template2/template2";
import Template3 from "@/components/template3/template3";
import uuid from "react-uuid";
import { useRouter } from "next/router";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Form = () => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.resume.formData);
  const isEditState = useSelector((state) => state.resume.isEditState);
  const currentResumeType = useSelector(
    (state) => state.resume.currentResumeType
  );

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal1, setIsOpenModal1] = useState(false);

  const educationInfoSchema = z.object({
    institutionName: z.string("Institution Name is Required"),
    cgpa: z.string("CGPA is Required"),
    passingYear: z.string("Passing Year is Required"),
  });

  const formSchema = z.object({
    email: z.string().email("Enter valid Email").min(3),
    name: z.string().min(3, "Name cannot be shorter than 3 words"),
    phone: z.string().min(10, { message: "Must be a valid mobile number" }),
    introduction: z.string().min(10, "Introduction is too short"),
    project1: z.string().min(10, "Project description is too short"),
    project2: z.string().min(10, "Project description is too short"),
    website: z.string().url("Enter valid url"),
    skills: z.string().min(2, "Skils are not given"),
    educations: z.array(educationInfoSchema),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  const { fields, append, remove } = useFieldArray({
    name: "educations",
    control,
  });

  const onSubmit = async (data) => {
    if (!isEditState) {
      const id = uuid();
      dispatch(createResumes({ ...data, type: currentResumeType, id: id }));
      dispatch(
        setCurrentResumeDetails({ ...data, type: currentResumeType, id: id })
      );
    } else {
      dispatch(updateResume({ ...data, type: currentResumeType, id: formData.id}));
      dispatch(setEditState(false));
      
    }
    dispatch(
      setFormData({
        name: "",
        email: "",
        phone: "",
        skills: "",
        website: "",
        project1: "",
        project2: "",
        introduction: "",
        educations: [{ institutionName: "", cgpa: "", passingYear: "" }],
     
      })
    );
    reset();
    redirect("/home");
  };

  const [data, setData] = useState(null);

  const onPreview = async (data) => {
    setData(data);
  };
  const reportTemplateRef = useRef(null);

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

  const modalStyle1 = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "950px",
    height: "100vh",
    color: "black",
    p: 3,
    borderRadius: "10px",
    outline: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "auto",
  };

  const currentResume = useSelector(
    (state) => state.resume.currentResumeDetails
  );

  function handleCloseModal() {
    setIsOpenModal(false);
  }

  function handleCloseModal1() {
    setIsOpenModal1(false);
  }
  return (
    <Box className={style["form-container"]}>
      <Typography sx={{ margin: "10px 0px" }} variant="h3">
        Enter Your Details
      </Typography>
      <FormControl
        sx={{ width: "600px", display: "flex", alignItems: "flex-end" }}
      >
        <Input
          lable="Name"
          width="300px"
          register={register}
          feildName={"name"}
          errors={errors}
          displayFeild="Enter your Name"
        ></Input>
        <Input
          lable="Email"
          width="300px"
          register={register}
          feildName={"email"}
          errors={errors}
          displayFeild="Enter your Email"
        ></Input>
        <Input
          lable="Phone No"
          width="300px"
          register={register}
          feildName={"phone"}
          errors={errors}
          displayFeild="Enter your Phone No"
        ></Input>
        <Input
          lable="Introduction"
          width="300px"
          register={register}
          feildName={"introduction"}
          errors={errors}
          displayFeild="Enter your Introduction"
        ></Input>
        <Input
          lable="Website"
          width="300px"
          register={register}
          feildName={"website"}
          errors={errors}
          displayFeild="Enter your Website URl"
        ></Input>
        <Input
          lable="Project 1"
          width="300px"
          register={register}
          feildName={"project1"}
          errors={errors}
          displayFeild="Enter your Project 1 Description"
        ></Input>
        <Input
          lable="Project 2"
          width="300px"
          register={register}
          feildName={"project2"}
          errors={errors}
          displayFeild="Enter your Project 1 Description"
        ></Input>
        <Input
          lable="Skills"
          width="300px"
          register={register}
          feildName={"skills"}
          errors={errors}
          displayFeild="Enter your Skills"
        ></Input>
        <Box>
          {fields.map((feild, index) => (
            <Box
              key={feild.id}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-end"}
            >
              <Typography variant="h6">
                Education Details {index + 1}
              </Typography>
              <Input
                lable="Institution Name"
                width="300px"
                register={register}
                feildName={`educations.${index}.institutionName`}
                errors={errors}
                displayFeild="Enter your Institution Name "
              ></Input>
              <Input
                lable="CGPA"
                width="300px"
                register={register}
                feildName={`educations.${index}.cgpa`}
                errors={errors}
                displayFeild="Enter your CGPA"
              ></Input>
              <Input
                lable="Pass Year"
                width="300px"
                register={register}
                feildName={`educations.${index}.passingYear`}
                errors={errors}
                displayFeild="Enter your Passing Year"
              ></Input>
              <Box sx={{ width: "90%" }}>
                <Button
                  onClick={() => remove(index)}
                  sx={{ backgroundColor: "red", color: "white" }}
                >
                  Remove
                </Button>
              </Box>
            </Box>
          ))}
        </Box>

        <Button
          variant="contained"
          onClick={() => {
            append({ institutionName: "", cgpa: "", passingYear: "" });
          }}
        >
          Add Education
        </Button>
        <Box sx={{ margin: "10px" }}>
          <Button
            sx={{ width: "100px", backgroundColor: "green", margin: "10px" }}
            variant="contained"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            {isEditState ? "Edit" : "Save"}
          </Button>
          <Button
            sx={{ width: "100px", margin: "10px" }}
            variant="contained"
            onClick={() =>{
              dispatch(
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  skills: "",
                  website: "",
                  project1: "",
                  project2: "",
                  introduction: "",
                  educations: [
                    { institutionName: "", cgpa: "", passingYear: "" },
                  ],
                })
              )
              reset();
            }
            }
          >
            Clear
          </Button>
          <Button
            sx={{ width: "100px", margin: "10px" }}
            variant="contained"
            onClick={handleSubmit((data) => {
              onPreview(data);
              setIsOpenModal(true);
            })}
          >
            Preview
          </Button>
          <Button
            sx={{ width: "100px", backgroundColor: "red", margin: "10px" }}
            variant="contained"
            onClick={() => {
              dispatch(setEditState(false))
              dispatch(setFormData({ name: "",
                email: "",
                phone: "",
                skills: "",
                website: "",
                project1: "",
                project2: "",
                introduction: "",
                educations: [
                  { institutionName: "", cgpa: "", passingYear: "" },
                ]}))
              redirect("/home");
            }}
          >
            Cancel
          </Button>
        </Box>
      </FormControl>
      <Modal
        sx={modalStyle}
        open={isOpenModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ outline: "none" }}>
          <Typography sx={{ fontWeight: "bold" }}>
            Choose A Template{" "}
          </Typography>
          <Box className={style.template}>
            <Image
              src={Template1Img}
              alt={"template 1"}
              width={400}
              height={500}
              onClick={() => {
                dispatch(setCurrentResumeType(1));
                setIsOpenModal(false);
                setIsOpenModal1(true);
              }}
            ></Image>
            <Image
              src={Template2Img}
              alt={"template 2"}
              width={"400"}
              height={"500"}
              onClick={() => {
                dispatch(setCurrentResumeType(2));
                setIsOpenModal(false);
                setIsOpenModal1(true);
              }}
            ></Image>
            <Image
              src={Template3Img}
              alt={"template 3"}
              width={400}
              height={500}
              onClick={() => {
                dispatch(setCurrentResumeType(3));
                setIsOpenModal(false);
                setIsOpenModal1(true);
              }}
            ></Image>
          </Box>
          <Button variant="contained" onClick={handleCloseModal}>
            close
          </Button>
        </Box>
      </Modal>
      <Modal
        sx={modalStyle1}
        open={isOpenModal1}
        onClose={handleCloseModal1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Box ref={reportTemplateRef}>
            {currentResumeType === 1 ? (
              <Template1 data={data} />
            ) : currentResumeType === 2 ? (
              <Template2 data={data} />
            ) : (
              <Template3 data={data} />
            )}
          </Box>

          <Button
            variant="contained"
            sx={{ color: "white", margin: "10px" }}
            onClick={handleCloseModal1}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};
export default Form;
