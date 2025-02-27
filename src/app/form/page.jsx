"use client";
import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/input/input";
import { useForm, useFieldArray } from "react-hook-form";
import style from "./form.module.css";
import { redirect } from "next/navigation";
import app from "@/firebase/firebase";
const Form = () => {
  const educationInfoSchema = z.object({
    institutionName: z.string(),
    cgpa: z.string(),
    passingYear: z.string(),
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
    educations: z.array(educationInfoSchema, "Education details not given"),
  });

  const {
    control,
    getValues,
    setError,
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      skills: "",
      website: "",
      project1: "",
      project2: "",
      introduction: "",
      eductaions: [{ institutionName: "", cgpa: "", passingYear: "" }],
    },
  });

  const { fields, append } = useFieldArray({
    name: "educations",
    control,
  });

  console.log("✌️fields --->", fields);
  const onSubmit = (data) => {
    console.log("jgbfhedb");

    reset();
  };

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
          displayFeild="Enter your website url"
        ></Input>
        <Box>
          {fields.map((feild, index) => (
            <Box key={feild.id}>
              <TextField
              
                lable={"institutionName"}
                {...register(`institutionName`, {
                  required: {
                    value: true,
                    message: `institutionName Required `,
                  },
                })}
              ></TextField>
              <TextField
                lable={"Cgpa"}
                {...register(`eductaions.Cgpa.${index}`, {
                  required: { value: true, message: ` Cgpa Required ` },
                })}
              ></TextField>
              <TextField
                {...register(`eductaions.passingYear.${index}`, {
                  required: { value: true, message: `passingYear Required ` },
                })}
                lable={"passingYear"}
              ></TextField>
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
            Save
          </Button>
          <Button
            sx={{ width: "100px", margin: "10px" }}
            variant="contained"
            onClick={() => reset()}
          >
            Clear
          </Button>
          <Button sx={{ width: "100px", margin: "10px" }} variant="contained">
            Preview
          </Button>
          <Button
            sx={{ width: "100px", backgroundColor: "red", margin: "10px" }}
            variant="contained"
            onClick={() => {
              redirect("/home");
            }}
          >
            Cancel
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

export default Form;
