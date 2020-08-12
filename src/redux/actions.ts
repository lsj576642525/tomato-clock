import {
  ADD_TODO,
  INIT_TODOS,
  UPDATE_TODO,
  EDIT_TODO,
  ADD_TOMATO,
  INIT_TOMATOES,
  UPDATE_TOMATO,
} from "./actionTypes";

export const addTodo = (payload: any) => {
  return {
    type: ADD_TODO,
    payload,
  };
};

export const initTodos = (payload: any[]) => {
  return {
    type: INIT_TODOS,
    payload,
  };
};

export const updateTodo = (payload: any) => {
  return {
    type: UPDATE_TODO,
    payload,
  };
};

export const editTodo = (payload: number) => {
  return {
    type: EDIT_TODO,
    payload,
  };
};

export const addTomato = (payload: any) => {
  return {
    type: ADD_TOMATO,
    payload,
  };
};

export const initTomatoes = (payload: any[]) => {
  return {
    type: INIT_TOMATOES,
    payload,
  };
};

export const updateTomato = (payload: any[]) => {
  return {
    type: UPDATE_TOMATO,
    payload,
  };
};
