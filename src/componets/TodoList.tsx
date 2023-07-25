import {ChangeEvent} from 'react';
import {TFilterTask} from "../App";
import {useAutoAnimate} from '@formkit/auto-animate/react'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {DeleteForever} from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";
import {TAppRootState} from "../state/store";
import {addTaskAC, changeTaskIsDoneAC, changeTaskTitleAC, removeTasksAC} from "../state/tasks-reducer";

export type TTasks = {
    id: string
    title: string
    isDone: boolean
}

type TProps = {
    categoryId: string
    title: string
    filter: TFilterTask
    onChangeTodoListTitle: (id: string, newTitle: string) => void
    changeFilter: (filter: TFilterTask, todoListId: string) => void
    removeTodolist: (todolistId: string) => void
}


const TodoList = (props: TProps) => {
    const {
        categoryId,
        title,
        filter,
        onChangeTodoListTitle,
        changeFilter,
        removeTodolist
    } = props


    const tasks = useSelector<TAppRootState, TTasks[]>(state => state.tasks[categoryId])

    const dispatch = useDispatch()

    const [parent] = useAutoAnimate()


    const changeFiltered = (valueFilter: TFilterTask) => {
        changeFilter(valueFilter, categoryId)
    }

    const updateTodoListTitle = (newTitle: string) => onChangeTodoListTitle(categoryId, newTitle)

    const handleRemoveTodolist = () => {
        removeTodolist(categoryId)
    }

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
                <EditableSpan title={title} onChangeTitle={(newTitle) => updateTodoListTitle(newTitle)}/>
                <IconButton onClick={handleRemoveTodolist}>
                    <DeleteForever/>
                </IconButton>
            </h2>

            <AddItemForm addItem={(title) => dispatch(addTaskAC(categoryId, title))}/>
            <ul ref={parent}>
                {filterTaskHandler()?.map(t => {
                    const updateTitleSpan = (newTitle: string) => {
                        dispatch(changeTaskTitleAC(categoryId, t.id, newTitle))
                    }

                    const changeRemoveTask = () => {
                        dispatch(removeTasksAC(categoryId, t.id))
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox color="success" checked={t.isDone}
                                  onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskIsDoneAC(categoryId, t.id, e.currentTarget.checked))}/>
                        <EditableSpan title={t.title} onChangeTitle={newTitle => updateTitleSpan(newTitle)}/>
                        <IconButton onClick={changeRemoveTask}>
                            <DeleteForever/>
                        </IconButton>
                    </li>
                })}
            </ul>
            <Button onClick={() => changeFiltered('all')}
                    variant={filter === 'all' ? 'contained' : 'text'}>All</Button>
            <Button color={'secondary'} onClick={() => changeFiltered('active')}
                    variant={filter === 'active' ? 'contained' : 'text'}>Active</Button>
            <Button color={'success'} onClick={() => changeFiltered('completed')}
                    variant={filter === 'completed' ? 'contained' : 'text'}>Completed</Button>
        </div>
    );
};
export default TodoList;
