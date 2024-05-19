import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ADMIN"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/user`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ADMIN"],
    }),
    getUser: builder.query({
      query: () => ({
        url: `/user`,
      }),
      providesTags: ["ADMIN"],
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/resetPassword`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ADMIN"],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: `/passwordchange`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ADMIN"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Login"],
    }),
  }),
});

export const {
  useAddUserMutation,
  useUpdateUserMutation,
  useResetPasswordMutation,
  useGetUserQuery,
  useChangePasswordMutation,
  useDeleteUserMutation,
} = userApiSlice;
