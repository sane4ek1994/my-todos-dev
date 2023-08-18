import React, {useEffect, useState} from 'react'
import {taskAPI} from "../api/task-api";

export default {
    title: 'API/task'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '435815be-7a71-43df-a995-036ef1e1ce26'
        taskAPI.getTask(todolistId).then(res => setState(res.data))

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '435815be-7a71-43df-a995-036ef1e1ce26'
        const newTitleTodos = 'NEW TASK TITLE11111'
        taskAPI.createTask(todolistId, newTitleTodos).then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const newTitleTask = 'PIZZA'
        const todolistId = '435815be-7a71-43df-a995-036ef1e1ce26'
        const taskId = '83a2070c-9dd3-4e68-8188-6651ee0fd439'
        taskAPI.updateTaskTitle(todolistId, taskId, newTitleTask).then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '435815be-7a71-43df-a995-036ef1e1ce26'
        const taskId = 'dfe534f9-cb84-4bc8-bd61-9afc47f92510'
        taskAPI.deleteTask(todolistId, taskId).then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


