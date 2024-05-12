import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `users/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Login"],
    }),
    loginGoogle: builder.mutation({
      query: (data) => ({
        url: `users/google`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Login"],
    }),
    getSelfData: builder.query({
      query: () => ({
        url: `/single`,
        method: "GET",
      }),
      invalidatesTags: ["Login"],
    }),
    uploadFile: builder.mutation({
      query: (file) => ({
        url: "users/ocr", // Adjust the endpoint URL according to your server's API
        method: "POST",
        body: file,
        formData: true,
        // headers: {
        //   "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data for file upload
        // },
      }),
    }),
    saveFavorite: builder.mutation({
      query: (favotite) => ({
        url: "users/favorite",
        method: 'POST',
        body: favotite,
        formData: true
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetSelfDataQuery,
  useLoginGoogleMutation,
  useUploadFileMutation,
  useSaveFavoriteMutation,
} = authApiSlice;
