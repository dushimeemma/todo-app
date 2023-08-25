import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
  }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: (url: string) => `/todos?${url}`,
      providesTags: ['Todos'],
    }),
    updateTodo: builder.mutation({
      query: ({ id, completed }) => ({
        url: `/todos/${id}`,
        method: 'PATCH',
        body: { completed },
      }),
      invalidatesTags: ['Todos'],
    }),
    createTodo: builder.mutation({
      query: ({ id, title, completed }) => ({
        url: '/todos',
        method: 'POST',
        body: { id, title, completed },
      }),
      invalidatesTags: ['Todos'],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
});

export const {
  useGetAllTodosQuery,
  useUpdateTodoMutation,
  useCreateTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
