import { PrismaClient } from '@prisma/client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getProjects = createAsyncThunk(
  'projects/',
  async () => {
    console.log("dddd")

    console.log({prisma})
    const projects = await prisma.projects.findMany()
    console.log({projects})
    await prisma.$disconnect()
    return projects
  }
)

type Project = {
  name: string,
  key: string,
  domain: string,
}

type projectsState = {
  projectsList,
  loading: Record<string, boolean>
}

export const projects = createSlice({
  name: 'cards',
  initialState: {
    projectsList: [],
    loading: {
      addingCard: false,
      removingCard: false,
      changingDefaultCard: false,
    }
  } as projectsState,
  reducers: {
  },
  extraReducers: (builder) =>  {
    builder.addCase(getProjects.fulfilled, (state, action) => {
      console.log({action})
      state.projectsList = action.payload
    })
  }
})

export const { } = projects.actions

export default projects.reducer
