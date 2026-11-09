import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { api } from '../api'
import type { SchemesDrugDose } from '../api/Api'
import { ADULT_DOSE_MAX, ADULT_DOSE_MIN, DRUG_DOSES_MOCK } from '../modules/mock'

interface DrugDosesState {
    minAdultDose: number
    maxAdultDose: number
    drugDoses: SchemesDrugDose[]
    loading: boolean
    isMock: boolean
}

const initialState: DrugDosesState = {
    minAdultDose: ADULT_DOSE_MIN,
    maxAdultDose: ADULT_DOSE_MAX,
    drugDoses: [],
    loading: false,
    isMock: false,
}

export const getDrugDosesList = createAsyncThunk(
    'drugDoses/getDrugDosesList',
    async (_, { getState, rejectWithValue }) => {
        const { drugDoses, auth } = getState() as {
            drugDoses: DrugDosesState
            auth: { isAuthenticated: boolean }
        }

        try {
            const response = await api.drugDoses.drugDosesList({
                min_adult_dose: drugDoses.minAdultDose,
                max_adult_dose: drugDoses.maxAdultDose,
            })

            return response.data
        } catch {
            return rejectWithValue(auth.isAuthenticated ? 'authenticated' : 'guest')
        }
    },
)

export const deleteDrugDose = createAsyncThunk(
    'drugDoses/deleteDrugDose',
    async (drugDoseId: number, { dispatch, rejectWithValue }) => {
        try {
            await api.drugDoses.drugDosesDelete(drugDoseId)
            dispatch(getDrugDosesList())

            return drugDoseId
        } catch {
            return rejectWithValue('Не удалось удалить дозу препарата')
        }
    },
)

const drugDosesSlice = createSlice({
    name: 'drugDoses',
    initialState,
    reducers: {
        setMinAdultDose(state, action: PayloadAction<number>) {
            state.minAdultDose = action.payload
        },
        setMaxAdultDose(state, action: PayloadAction<number>) {
            state.maxAdultDose = action.payload
        },
        resetFilter(state) {
            state.minAdultDose = ADULT_DOSE_MIN
            state.maxAdultDose = ADULT_DOSE_MAX
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDrugDosesList.pending, (state) => {
                state.loading = true
            })
            .addCase(getDrugDosesList.fulfilled, (state, action) => {
                state.loading = false
                state.isMock = false
                state.drugDoses = action.payload ?? []
            })
            .addCase(getDrugDosesList.rejected, (state, action) => {
                state.loading = false

                if (action.payload !== 'guest') {
                    state.isMock = false
                    state.drugDoses = []
                    return
                }

                state.isMock = true
                state.drugDoses = DRUG_DOSES_MOCK.filter(
                    (drugDose) =>
                        drugDose.recommended_adult_dose_mg >= state.minAdultDose &&
                        drugDose.recommended_adult_dose_mg <= state.maxAdultDose,
                )
            })
            .addCase(deleteDrugDose.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteDrugDose.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(deleteDrugDose.rejected, (state) => {
                state.loading = false
            })
    },
})

export const { setMinAdultDose, setMaxAdultDose, resetFilter } = drugDosesSlice.actions
export default drugDosesSlice.reducer
