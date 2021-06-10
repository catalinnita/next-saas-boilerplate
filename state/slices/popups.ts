import { createSlice } from '@reduxjs/toolkit'

export const popups = createSlice({
  name: 'popups',
  initialState: {
    popupToShow: null,
    showCloseButton: true,
  },
  reducers: {
    showPopup: (state, action) => {
      state.popupToShow = action.payload.popup
      state.showCloseButton = action.payload.showCloseButton || true
    },
    closeAllPopups: (state) => {
      console.log("closeAllPopups")
      state.popupToShow = null
    }
  },
})

export const { showPopup, closeAllPopups } = popups.actions

export default popups.reducer
