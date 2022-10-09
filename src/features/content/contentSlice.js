import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import contentService from '../../services/content-service';

export const contentSlice = createSlice({
  name: 'content',
  initialState: {
    posts: undefined,
    status: undefined,
    errorMessage: undefined,
  },
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload.action
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload.posts;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.error.message;
      });
  },
})

export const getPosts = createAsyncThunk(
  "posts/get",
  async () => {
    const response = await contentService.getContent();
    return response.json();
  }
);

export const { setContent } = contentSlice.actions

export default contentSlice.reducer