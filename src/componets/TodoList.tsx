import React, {useCallback} from 'react';
import {TFilterTask, TTodoList} from "../App";
import {useAutoAnimate} from '@formkit/auto-animate/react'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@mui/material";
import {DeleteForever} from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";
import {TAppRootState} from "../state/store";
import {addTaskAC,} from "../state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../state/todolists-reducer";
import {Task} from "./Task";

export type TTasks = {
    id: string
    title: string
    isDone: boolean
}

type TProps = {
    todolist: TTodoList
}


export const TodoList = React.memo((props: TProps) => {
    console.log('todolist')
    const {todolist} = props

    //берем один тудулист из стейта
    // const todolist = useSelector<TAppRootState, TTodoList>(state => state.todolists.filter(todo => todo.id === categoryId)[0])

    const tasks = useSelector<TAppRootState, TTasks[]>(state => state.tasks[todolist.id])

    const {title, filter} = todolist

    const dispatch = useDispatch()

    const [parent] = useAutoAnimate()


    const updateTodoListTitle = useCallback((newTitle: string) => dispatch(changeTodolistTitleAC(todolist.id, newTitle)), [todolist.id, dispatch])

    const addNewTask = useCallback((title: string) => dispatch(addTaskAC(todolist.id, title)), [todolist.id, dispatch])
    const changeFiltered = (valueFilter: TFilterTask) => dispatch(changeTodolistFilterAC(todolist.id, valueFilter))
    const handleRemoveTodolist = () => dispatch(removeTodolistAC(todolist.id))


    const filterTaskHandler = () => {
        let filteredTask = tasks
        switch (filter) {
            case "active":
                return filteredTask?.filter(t => !t.isDone)
            case "completed":
                return filteredTask?.filter(t => t.isDone)
            default:
                return filteredTask
        }
    }

    return (
        <div>
            <h2>
                <EditableSpan title={title} onChangeTitle={updateTodoListTitle}/>
                <IconButton onClick={handleRemoveTodolist}>
                    <DeleteForever/>
                </IconButton>
            </h2>

            <AddItemForm addItem={addNewTask}/>
            <ul ref={parent}>
                {filterTaskHandler()?.map(t => <Task key={t.id} todolistId={todolist.id} {...t}/>)}
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

