import React, { ChangeEvent, useState, useRef, useEffect } from 'react';

import {
  useGetAllTodosQuery,
  useUpdateTodoMutation,
  useCreateTodoMutation,
  useDeleteTodoMutation,
} from './todoAPI';
import { Todo as TodoType } from '../../helpers';

const Todo = () => {
  const [updateTodo, { isLoading: isUpdatingTodo }] = useUpdateTodoMutation();
  const [createTodo, { isLoading: isCreatingTodo }] = useCreateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [title, setTitle] = useState<string>('');
  const [toggleId, setToggleId] = useState<boolean>(false);
  const [toggleName, setToggleName] = useState<boolean>(false);
  const [toggleStatus, setToggleStatus] = useState<boolean>(false);
  const [filters, setFilters] = useState<string>('_sort=id&_order=asc');
  const { data, isLoading, isError } = useGetAllTodosQuery(filters);
  const inputRef = useRef<any>(null);

  const handleChangeTitle = (): void => {
    setTitle(inputRef.current.value);
  };

  const handleSaveTodo = (): void => {
    createTodo({ title, id: data!.length + 1, completed: false });
    setTitle('');
  };

  return (
    <div className='flex w-screen items-center justify-center'>
      <div className='w-[80%] border-2 border-black m-6 p-6 flex flex-col items-center'>
        <span className='font-extrabold text-2xl my-6'>Todo App</span>
        <div className='w-[60%] min-h-[10vh] bg-slate-200 flex flex-col items-center justify-center p-6'>
          <span className='my-3'>Add a new todo item</span>
          <div className='flex flex-row items-center'>
            <input
              type='text'
              name='todo'
              value={title}
              className='mr-3 px-3 py-1'
              onChange={handleChangeTitle}
              ref={inputRef}
            />
            <button
              className='bg-slate-200 border-2 border-black px-3'
              onClick={handleSaveTodo}
            >
              {isCreatingTodo ? 'loading...' : 'Add Todo'}
            </button>
          </div>
        </div>
        {isLoading && <span className='my-6 font-bold'>Loading...</span>}
        {isError && (
          <span className='my-6 font-bold text-red-500'>
            Something went wrong...
          </span>
        )}
        {data && (
          <div className='flex flex-col items-center my-6'>
            <span className='mb-3'>
              Click on a table column header to sort table
            </span>
            <table className='table-auto'>
              <thead>
                <tr className='flex justify-between items-center w-[60vw] border-[0.2px] border-slate-200'>
                  <th
                    onClick={() => {
                      setToggleId(!toggleId);
                      if (!toggleId) {
                        setFilters('_sort=id&_order=desc');
                      } else {
                        setFilters('_sort=id&_order=asc');
                      }
                    }}
                    className={`w-[5vw] border-2 ${
                      !toggleId ? 'border-slate-200' : 'border-blue-400'
                    }  bg-slate-100 cursor-pointer`}
                  >
                    Id
                  </th>
                  <th
                    onClick={() => {
                      setToggleName(!toggleName);
                      if (!toggleName) {
                        setFilters('_sort=title&_order=desc');
                      } else {
                        setFilters('_sort=title&_order=asc');
                      }
                    }}
                    className={`w-[45vw] border-2 ${
                      !toggleName ? 'border-slate-200' : 'border-blue-400'
                    }  bg-slate-100 cursor-pointer`}
                  >
                    Name
                  </th>
                  <th
                    onClick={() => {
                      setToggleStatus(!toggleStatus);
                      if (!toggleStatus) {
                        setFilters('_sort=completed&_order=desc');
                      } else {
                        setFilters('_sort=completed&_order=asc');
                      }
                    }}
                    className={`w-[5vw] border-2 ${
                      !toggleStatus ? 'border-slate-200' : 'border-blue-400'
                    }  bg-slate-100 cursor-pointer`}
                  >
                    Status
                  </th>
                  <th className='w-[5vw] border-[0.2px] border-slate-200 bg-slate-100 cursor-pointer'>
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((todo: TodoType, index: number) => (
                  <tr
                    className={`flex justify-between items-start w-[60vw] border-[0.2px] border-slate-200 ${
                      index % 2 != 0 ? 'bg-slate-100' : ''
                    }`}
                    key={todo.id}
                  >
                    <td className='border-[0.2px] border-slate-200 w-[5vw] flex items-center justify-center'>
                      {todo.id}
                    </td>
                    <td className='border-[0.2px] border-slate-200 w-[45vw] px-2'>
                      {todo.title}
                    </td>
                    <td
                      className={` ${
                        !todo.completed && 'border-2'
                      } border-slate-200 w-[5vw] flex items-center justify-center cursor-pointer`}
                      onClick={() =>
                        updateTodo({ id: todo.id, completed: !todo.completed })
                      }
                    >
                      <span> {todo.completed ? '✅' : 'TODO'}</span>
                    </td>
                    <td
                      className='border-[0.2px] border-slate-200 w-[5vw] flex items-center justify-center'
                      onClick={() => deleteTodo({ id: todo.id })}
                    >
                      <button>❌</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
