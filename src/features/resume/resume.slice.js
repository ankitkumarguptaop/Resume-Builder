import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resumes: [],
  currentResumeDetails: null,
  currentResumeType: null,
  formData: {
    name: "",
    email: "",
    phone: "",
    skills: "",
    website: "",
    project1: "",
    project2: "",
    introduction: "",
    educations: [{ institutionName: "", cgpa: "", passingYear: "" }],
  },
  isEditState: false,
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
      state.resumes = [...state.resumes, action.payload];
    },
    deleteResume: (state, action) => {
      const index = state.resumes.findIndex((resume) => {
        return action.payload === resume.id;
      });
      state.resumes.splice(index, 1);
    },
    updateResume: (state, action) => {
      const index = state.resumes.findIndex((resume) => {
        return action.payload.id === resume.id;
      });

      state.resumes.splice(index, 1, { ...action.payload });
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setCurrentResumeType: (state, action) => {
      state.currentResumeType = action.payload;
    },

    setEditState: (state, action) => {
      state.isEditState = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {
  setCurrentResumeDetails,
  createResumes,
  deleteResume,
  updateResume,
  setCurrentResumeType,
  setEditState,
  setFormData,
  setUpdatedId,
} = resumeSlice.actions;

export default resumeSlice.reducer;
