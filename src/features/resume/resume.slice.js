import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "next/navigation";
import { act } from "react";

const initialState = {
  resumes: [],
  currentResumeDetails: null,
  currentResumeType: null,
  isLoading: false,
  error: null,
};

export const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    setCurrentResumeDetails: (state, action) => {
      state.currentResumeDetails = action.payload;
    },
    createResumes: (state, action) => {
      state.resumes = [...state.resumes,action.payload];
    },
    deleteResume:(state,action)=>{

    },
    updateResume:(state,action)=>{

    }
,
    setCurrentResumeType: (state, action) => {
      state.currentResumeType = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setCurrentResumeDetails, createResumes ,deleteResume , updateResume ,setCurrentResumeType} = resumeSlice.actions;

export default resumeSlice.reducer;
