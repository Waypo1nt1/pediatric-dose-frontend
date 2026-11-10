import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    isAuthenticated: boolean
    login: string
    isModerator: boolean
    loading: boolean
    error: string
}

const initialState: AuthState = {
    isAuthenticated: false,
    login: '',
    isModerator: false,
    loading: false,
    error: '',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
            if (action.payload) {
                state.error = ''
            }
        },
        setAuthError(state, action: PayloadAction<string>) {
            state.loading = false
            state.error = action.payload
        },
        signIn(state, action: PayloadAction<{ login: string; isModerator: boolean }>) {
            state.isAuthenticated = true
            state.login = action.payload.login
            state.isModerator = action.payload.isModerator
            state.loading = false
            state.error = ''
        },
        signOut(state) {
            state.isAuthenticated = false
            state.login = ''
            state.isModerator = false
            state.loading = false
            state.error = ''
        },
    },
})

export const { setAuthLoading, setAuthError, signIn, signOut } = authSlice.actions
export default authSlice.reducer
