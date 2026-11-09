import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { api } from '../api'
import type { SchemesDrugDose } from '../api/Api'

interface DrugDoseDraftState {
    draft: SchemesDrugDose | null
    drugDoseName: string
    shortInfo: string
    recommendedAdultDoseMg: string
    maxDailyDoseMg: string
    loading: boolean
    error: string
    message: string
}

const initialState: DrugDoseDraftState = {
    draft: null,
    drugDoseName: '',
    shortInfo: '',
    recommendedAdultDoseMg: '',
    maxDailyDoseMg: '',
    loading: false,
    error: '',
    message: '',
}

export const getDrugDoseDraft = createAsyncThunk(
    'drugDoseDraft/getDrugDoseDraft',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.drugDoses.draftList()

            return response.data
        } catch {
            return rejectWithValue('Черновик не найден')
        }
    },
)

export const createDrugDose = createAsyncThunk(
    'drugDoseDraft/createDrugDose',
    async (
        { drugDoseName, image, video }: { drugDoseName: string; image: File; video: File },
        { dispatch, rejectWithValue },
    ) => {
        try {
            await api.drugDoses.drugDosesCreate({
                drug_dose_name: drugDoseName,
                image,
                video,
            })
            dispatch(getDrugDoseDraft())

            return drugDoseName
        } catch {
            return rejectWithValue('Не удалось создать черновик')
        }
    },
)

export const publishDrugDose = createAsyncThunk(
    'drugDoseDraft/publishDrugDose',
    async (_, { getState, rejectWithValue }) => {
        const { drugDoseDraft } = getState() as { drugDoseDraft: DrugDoseDraftState }

        try {
            const response = await api.drugDoses.publishUpdate({
                short_info: drugDoseDraft.shortInfo,
                recommended_adult_dose_mg: Number(drugDoseDraft.recommendedAdultDoseMg),
                max_daily_dose_mg: Number(drugDoseDraft.maxDailyDoseMg),
            })

            return response.data
        } catch {
            return rejectWithValue('Не удалось опубликовать дозу препарата')
        }
    },
)

const drugDoseDraftSlice = createSlice({
    name: 'drugDoseDraft',
    initialState,
    reducers: {
        setDrugDoseName(state, action: PayloadAction<string>) {
            state.drugDoseName = action.payload
        },
        setShortInfo(state, action: PayloadAction<string>) {
            state.shortInfo = action.payload
        },
        setRecommendedAdultDoseMg(state, action: PayloadAction<string>) {
            state.recommendedAdultDoseMg = action.payload
        },
        setMaxDailyDoseMg(state, action: PayloadAction<string>) {
            state.maxDailyDoseMg = action.payload
        },
        clearDraft(state) {
            state.draft = null
            state.drugDoseName = ''
            state.shortInfo = ''
            state.recommendedAdultDoseMg = ''
            state.maxDailyDoseMg = ''
            state.error = ''
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDrugDoseDraft.pending, (state) => {
                state.loading = true
            })
            .addCase(getDrugDoseDraft.fulfilled, (state, action) => {
                state.loading = false
                state.error = ''
                state.draft = action.payload ?? null
                state.shortInfo = action.payload?.short_info ?? ''
                state.recommendedAdultDoseMg = action.payload?.recommended_adult_dose_mg
                    ? String(action.payload.recommended_adult_dose_mg)
                    : ''
                state.maxDailyDoseMg = action.payload?.max_daily_dose_mg
                    ? String(action.payload.max_daily_dose_mg)
                    : ''
            })
            .addCase(getDrugDoseDraft.rejected, (state) => {
                state.loading = false
                state.draft = null
            })
            .addCase(createDrugDose.pending, (state) => {
                state.loading = true
                state.error = ''
                state.message = ''
            })
            .addCase(createDrugDose.fulfilled, (state) => {
                state.loading = false
                state.drugDoseName = ''
                state.message = 'Черновик создан'
            })
            .addCase(createDrugDose.rejected, (state, action) => {
                state.loading = false
                state.error = String(action.payload)
            })
            .addCase(publishDrugDose.pending, (state) => {
                state.loading = true
                state.error = ''
                state.message = ''
            })
            .addCase(publishDrugDose.fulfilled, (state) => {
                state.loading = false
                state.draft = null
                state.shortInfo = ''
                state.recommendedAdultDoseMg = ''
                state.maxDailyDoseMg = ''
                state.message = 'Доза препарата опубликована'
            })
            .addCase(publishDrugDose.rejected, (state, action) => {
                state.loading = false
                state.error = String(action.payload)
            })
    },
})

export const {
    setDrugDoseName,
    setShortInfo,
    setRecommendedAdultDoseMg,
    setMaxDailyDoseMg,
    clearDraft,
} = drugDoseDraftSlice.actions
export default drugDoseDraftSlice.reducer
