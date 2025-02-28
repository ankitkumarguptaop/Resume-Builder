import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "next/navigation";
import { act } from "react";

const initialState = {
  resumes: [],
  currentResumeDetails: null,
  isLoading: false,
  error: null,
};

export const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setCurrentResumeDetails: (state, action) => {
      state.currentResumeDetails = action.payload.data;
    },
    createResumes: (state, action) => {
      state.resumes = [...state.resumes,action.payload.data];
    },
    deleteResume:(state,action)=>{

    },
    updateResume:(state,action)=>{

    }
  },
  extraReducers: (builder) => {},
});

export const { setCurrentResumeDetails, createResumes ,deleteResume , updateResume } = resumeSlice.actions;

export default resumeSlice.reducer;
