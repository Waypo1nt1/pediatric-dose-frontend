import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import authReducer from './slices/authSlice'
import drugDoseDraftReducer from './slices/drugDoseDraftSlice'
import drugDoseFeedReducer from './slices/drugDoseFeedSlice'
import drugDosesReducer from './slices/drugDosesSlice'

const store = configureStore({
    reducer: combineReducers({
        auth: authReducer,
        drugDoses: drugDosesReducer,
        drugDoseFeed: drugDoseFeedReducer,
        drugDoseDraft: drugDoseDraftReducer,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export default store
