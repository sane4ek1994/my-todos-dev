import React, {useEffect, useState} from 'react'
import {todolistAPI} from "features/TodolistList/todolists-api";

export default {
    title: 'API/todos'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist().then(res => setState(res.data))

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const newTitleTodos = 'IIIIIIIIIIIIIIIIIIIIIIIII'
        todolistAPI.createTodolist(newTitleTodos).then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const newTitle = '1111111title11111111111'
        const todolistId = '8b98b446-18d6-446a-bc33-5ff56f59b8ce'
        todolistAPI.updateTodolistTitle(newTitle, todolistId).then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '0e77c49f-fd41-4580-9738-954413c74b53'
        todolistAPI.deleteTodolist(todolistId).then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


