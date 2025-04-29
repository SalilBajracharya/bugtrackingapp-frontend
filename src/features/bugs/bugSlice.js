import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createBugReport, updateBug } from "../../services/bug/bugService"

const initialState = {
    loading: false,
    error: null,
}

export const updateBugReportThunk = createAsyncThunk(
    'bugs/updateBugReport',
    async (bugData, { rejectWithValue }) => {
        try {
            const response = await updateBug(bugData);
            return response;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Error updating bug report');
        }
    }
);

export const submitBugReport = createAsyncThunk(
    'bugs/submitBugReport',
    async (bugData, {rejectWithValue}) => {
        try{
            const response = await createBugReport(bugData);
            return response;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Error submitting bug report');
        }
    }
);

const bugSlice = createSlice({
    name: 'bug',
    initialState, 
    reducers: {},
    extraReducers : (builder) => {
        builder
            .addCase(submitBugReport.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitBugReport.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(submitBugReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Handling updateBugReport
            .addCase(updateBugReportThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBugReportThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateBugReportThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default bugSlice.reducer;