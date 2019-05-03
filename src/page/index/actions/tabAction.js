import { ADD_TODO } from './actionType';

export const addTodo = (obj) => {
    return {
        type:ADD_TODO,
        obj:obj
    }
}