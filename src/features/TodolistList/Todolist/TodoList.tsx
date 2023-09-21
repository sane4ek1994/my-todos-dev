import React, {useCallback, useEffect} from 'react';
import {useAutoAnimate} from '@formkit/auto-animate/react'
import {AddItemForm} from "componets/AddItemForm/AddItemForm";
import {EditableSpan} from "componets/EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {DeleteForever} from '@mui/icons-material';
import {useAppDispatch, useAppSelector} from "state/store";
import {addTaskTC, setTaskTC,} from "../tasks-reducer";
import {
    removeTodolistTC,
    TFilterTask, TodolistDomainType, todolistsActions, updateTitleTodolistTC
} from "../todolists-reducer";
import {TaskStatuses, TaskType} from "api/task-api";
import {Task} from "./Task/Task";


type TProps = {
    todolist: TodolistDomainType
}

export const TodoList = React.memo(({todolist}: TProps) => {
    //берем один тудулист из стейта
    // const todolist = useSelector<TAppRootState, TTodoList>(state => state.todolists.filter(todo => todo.id === categoryId)[0])

    const tasks = useAppSelector<TaskType[]>(state => state.tasks[todolist.id])
    const {title, filter} = todolist

    const dispatch = useAppDispatch()

    const [parent] = useAutoAnimate()

    useEffect(() => {
        dispatch(setTaskTC(todolist.id))
    }, [dispatch, todolist.id])


    const updateTodoListTitle = useCallback((newTitle: string) => dispatch(updateTitleTodolistTC(newTitle, todolist.id)), [todolist.id, dispatch])

    const addNewTask = useCallback((title: string) => dispatch(addTaskTC(todolist.id, title)), [todolist.id, dispatch])
    const changeFiltered = (valueFilter: TFilterTask) => dispatch(todolistsActions.changeTodolistFilter({
        id: todolist.id,
        filter: valueFilter
    }))
    const handleRemoveTodolist = () => dispatch(removeTodolistTC(todolist.id))


    const filterTaskHandler = () => {
        let filteredTask = tasks
        switch (filter) {
            case "active":
                return filteredTask?.filter(t => t.status === TaskStatuses.New)
            case "completed":
                return filteredTask?.filter(t => t.status === TaskStatuses.Completed)
            default:
                return filteredTask
        }
    }

    return (
        <div>
            <h2>
                <EditableSpan title={title} onChangeTitle={updateTodoListTitle}/>
                <IconButton onClick={handleRemoveTodolist} disabled={todolist.entityStatus === 'loading'}>
                    <DeleteForever/>
                </IconButton>
            </h2>

            <AddItemForm addItem={addNewTask}/>
            <ul ref={parent}>
                {filterTaskHandler().map(t => <Task key={t.id} todolistId={todolist.id} {...t}/>)}
            </ul>
            <Button onClick={() => changeFiltered('all')}
                    variant={filter === 'all' ? 'contained' : 'text'}>All</Button>
            <Button color={'secondary'} onClick={() => changeFiltered('active')}
                    variant={filter === 'active' ? 'contained' : 'text'}>Active</Button>
            <Button color={'success'} onClick={() => changeFiltered('completed')}
                    variant={filter === 'completed' ? 'contained' : 'text'}>Completed</Button>
        </div>
    );
});

