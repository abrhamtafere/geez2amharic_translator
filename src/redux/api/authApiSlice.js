import { apiSlice } from "./apiSlice";

export const patientApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `users/login`,
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
  }),
});

export const { useLoginMutation, useGetSelfDataQuery } = patientApiSlice;
