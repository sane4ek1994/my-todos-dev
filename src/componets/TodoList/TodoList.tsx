import React, {useCallback} from 'react';
import {useAutoAnimate} from '@formkit/auto-animate/react'
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {DeleteForever} from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";
import {TAppRootState} from "../../state/store";
import {addTaskAC,} from "../../state/tasks-reducer";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TFilterTask, TodolistDomainType
} from "../../state/todolists-reducer";
import {Task} from "../Task/Task";
import {TaskStatuses, TaskType} from "../../api/task-api";


type TProps = {
    todolist: TodolistDomainType
}

export const TodoList = React.memo(({todolist}: TProps) => {
    //берем один тудулист из стейта
    // const todolist = useSelector<TAppRootState, TTodoList>(state => state.todolists.filter(todo => todo.id === categoryId)[0])

    const tasks = useSelector<TAppRootState, TaskType[]>(state => state.tasks[todolist.id])

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

