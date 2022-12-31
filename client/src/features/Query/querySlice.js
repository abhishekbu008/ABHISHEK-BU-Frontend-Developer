import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { constants } from "../../constants";
import { axiosSpaceX as axios } from "../../lib";

const initialState = {
  loading: false,
  results: [],
  error: [],
  searchValues: {},
  selectedOptions: [],
  pagination: {
    page: 1,
    offset: 0,
    count: 1,
    totalPages: Math.ceil(
      constants.CAPSULES.TOTAL_ITEMS / constants.CAPSULES.LIMIT
    ),
  },
  selectedResult: null,
  resultModalOpen: false,
};

export const fetchFeature = createAsyncThunk(
  "spacex/fetchCapsules",
  ({ feature, query }, { rejectWithValue }) => {
    return axios
      .get(constants.AXIOS_SPACEX[feature] + `?${query}`)
      .then((res) => {
        const modifiedRes = [];
        res.data.forEach((r) => {
          const modified = { ...r };
          modified.id = modified._id;
          delete modified._id;
          modifiedRes.push(modified);
        });
        return modifiedRes;
      })
      .catch((err) => rejectWithValue(err.response.data.errors));
  }
);

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    selected: (state, action) => {
      state.selectedOptions = action.payload;
    },
    searched: (state, action) => {
      state.searchValues = action.payload;
    },
    pageChanged: (state, action) => {
      state.pagination.page = action.payload;
      state.pagination.offset = constants.CAPSULES.LIMIT * (action.payload - 1);
    },
    resultSelected: (state, action) => {
      state.selectedResult = action.payload;
      state.resultModalOpen = true;
    },
    resultClosed: (state) => {
      state.selectedResult = null;
      state.resultModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeature.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFeature.fulfilled, (state, action) => {
      state.loading = false;
      state.results = action.payload;
      state.error = [];
    });
    builder.addCase(fetchFeature.rejected, (state, action) => {
      state.loading = false;
      state.results = [];
      state.error = action.payload || [{ message: "Something went wrong" }];
    });
  },
});

export default querySlice.reducer;
export const { searched, selected, pageChanged, resultSelected, resultClosed } =
  querySlice.actions;
