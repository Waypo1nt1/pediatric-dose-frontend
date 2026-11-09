import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../api'
import type { SchemesDrugDoseFeed } from '../api/Api'
import { DRUG_DOSES_MOCK } from '../modules/mock'

interface DrugDoseFeedState {
    drugDose: SchemesDrugDoseFeed | null
    loading: boolean
    isMock: boolean
}

const initialState: DrugDoseFeedState = {
    drugDose: null,
    loading: false,
    isMock: false,
}

export const getDrugDoseFeed = createAsyncThunk(
    'drugDoseFeed/getDrugDoseFeed',
    async (drugDoseId: number, { getState, rejectWithValue }) => {
        const { auth } = getState() as { auth: { isAuthenticated: boolean } }

        try {
            const response = await api.drugDoses.feedDetail(drugDoseId, {})

            return response.data
        } catch {
            return rejectWithValue(auth.isAuthenticated ? 'authenticated' : drugDoseId)
        }
    },
)

export const likeDrugDose = createAsyncThunk(
    'drugDoseFeed/likeDrugDose',
    async ({ drugDoseId, value }: { drugDoseId: number; value: 0 | 1 }, { dispatch, rejectWithValue }) => {
        try {
            await api.drugDoses.likeCreate(drugDoseId, { value })
            dispatch(getDrugDoseFeed(drugDoseId))

            return value
        } catch {
            return rejectWithValue('Не удалось поставить лайк')
        }
    },
)

const drugDoseFeedSlice = createSlice({
    name: 'drugDoseFeed',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDrugDoseFeed.pending, (state) => {
                state.loading = true
            })
            .addCase(getDrugDoseFeed.fulfilled, (state, action) => {
                state.loading = false
                state.isMock = false
                state.drugDose = action.payload ?? null
            })
            .addCase(getDrugDoseFeed.rejected, (state, action) => {
                state.loading = false

                if (typeof action.payload !== 'number') {
                    state.isMock = false
                    state.drugDose = null
                    return
                }

                state.isMock = true
                state.drugDose =
                    DRUG_DOSES_MOCK.find((item) => item.id === action.payload) ?? DRUG_DOSES_MOCK[0]
            })
            .addCase(likeDrugDose.pending, (state) => {
                state.loading = true
            })
            .addCase(likeDrugDose.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(likeDrugDose.rejected, (state) => {
                state.loading = false
            })
    },
})

export default drugDoseFeedSlice.reducer
