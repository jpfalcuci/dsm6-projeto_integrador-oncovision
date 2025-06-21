import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { AppServices } from '@/service/app-services'
import { PredictData, PredictResult } from '@/models'
import { RootState } from '../store'

const initialState: PredictResult = {
  prediction: null,
}

const predictSlice = createSlice({
  name: 'predict',
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(
      predict.fulfilled,
      (state, action: PayloadAction<PredictResult>) => {
        state.prediction = action.payload.prediction
      }
    )
  },
})

export const predict = createAsyncThunk(
  'predict/get',
  async (data: PredictData) => {
    const response = await AppServices.getPrediction(data)
    return response.data
  }
)

export default predictSlice.reducer
export const { resetState } = predictSlice.actions

export const getPredictionResult = (state: RootState) => state.prediction
