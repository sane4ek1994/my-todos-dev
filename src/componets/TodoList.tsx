import {ChangeEvent} from 'react';
import {TFilterTask} from "../App";
import {useAutoAnimate} from '@formkit/auto-animate/react'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import {DeleteForever} from '@mui/icons-material';

export type TTasks = {
    id: string
    title: string
    isDone: boolean
}

type TProps = {
    categoryId: string
    title: string
    filter: TFilterTask
    tasks: TTasks[]
    onChangeTodoListTitle: (id: string, newTitle: string) => void
    onChangeTaskTitle: (id: string, newTitle: string, todoListId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (filter: TFilterTask, todoListId: string) => void
    onChangeIsDone: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
}


const TodoList = (props: TProps) => {
    const {
        categoryId,
        title,
        filter,
        tasks,
        onChangeIsDone,
        onChangeTodoListTitle,
        onChangeTaskTitle,
        addTask,
        changeFilter,
        removeTask,
        removeTodolist
    } = props

    const [parent] = useAutoAnimate()

    const handleAddTask = (title: string) => {
        addTask(title, categoryId)
    }


    const handleRemoveTask = (id: string) => {
        removeTask(id, categoryId)
    }

    const onChangeIsDoneHandler = (id: string, e: ChangeEvent<HTMLInputElement>) => {
        onChangeIsDone(id, e.currentTarget.checked, categoryId)
    }

    const changeFiltered = (valueFilter: TFilterTask) => {
        changeFilter(valueFilter, categoryId)
    }

    const updateTodoListTitle = (newTitle: string) => onChangeTodoListTitle(categoryId, newTitle)

    const handleRemoveTodolist = () => {
        removeTodolist(categoryId)
    }

    return (
        <div>
            <h2>
                <EditableSpan title={title} onChangeTitle={(newTitle) => updateTodoListTitle(newTitle)}/>
                <IconButton onClick={handleRemoveTodolist}>
                    <DeleteForever/>
                </IconButton>
            </h2>

            <AddItemForm addItem={handleAddTask}/>
            <ul ref={parent}>
                {tasks?.map(t => {
                    const updateTitleSpan = (newTitle: string) => {
                        onChangeTaskTitle(t.id, newTitle, categoryId)
                    }

                    const changeRemoveTask = () => {
                        handleRemoveTask(t.id)
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox color="success" checked={t.isDone}
                                  onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeIsDoneHandler(t.id, e)}/>
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
