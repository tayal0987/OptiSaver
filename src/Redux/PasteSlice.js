import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"



function loadPastes() {
  try {
    const stored = localStorage.getItem("pastes")
    let parsed = stored ? JSON.parse(stored) : []

    // Backfill createdAt for old pastes
    parsed = parsed.map(paste => {
      if (!paste.createdAt) {
        return { ...paste, createdAt: new Date().toLocaleString() }
      }
      return paste
    })

    return parsed
  } catch (err) {
    console.error("Invalid JSON in localStorage, clearing it:", err)
    localStorage.removeItem("pastes")
    return []
  }
}


const initialState = {
  pastes: loadPastes()
}

const pasteSlice = createSlice({
  name: "Paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
  let paste = action.payload
  const index = state.pastes.findIndex((item) => item._id === paste._id)

  if (index >= 0) {
    toast.error("Paste already exists")
    return
  }

  if (!paste.createdAt) {
    paste = { ...paste, createdAt: new Date().toLocaleString() }
  }

  state.pastes.push(paste)
  localStorage.setItem("pastes", JSON.stringify(state.pastes))
  toast.success("Create Successfully")
},

    updateToPastes: (state, action) => { 
      const paste = action.payload
      const index = state.pastes.findIndex((item) => item._id === paste._id)

      if (index >= 0) {
        state.pastes[index] = paste
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        toast.success("Updated")
      } else {
        toast.error("Paste not found")
      }
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload
      state.pastes = state.pastes.filter((item) => item._id !== pasteId)
      localStorage.setItem("pastes", JSON.stringify(state.pastes))
      toast.success("Deleted")
    },

    resetAllPastes: (state) => {
      state.pastes = []
      localStorage.removeItem("pastes")
      toast.success("All Pastes Cleared")
    },
  },
})

export const {
  addToPastes,
  updateToPastes,   
  removeFromPastes,
  resetAllPastes
} = pasteSlice.actions

export default pasteSlice.reducer
