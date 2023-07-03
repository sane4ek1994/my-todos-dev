import {ChangeEvent} from 'react';
import {TFilterTask} from "../App";
import {useAutoAnimate} from '@formkit/auto-animate/react'
import Button from "./Button";
import Input from "./Input";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
            <h2><EditableSpan title={title} onChangeTitle={(newTitle) => updateTodoListTitle(newTitle)}/></h2>
            <Button callback={handleRemoveTodolist} name='✖️'/>
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
                        <Button name='✖️' callback={changeRemoveTask}/>
                        <Input checked={t.isDone} onChange={(e) => onChangeIsDoneHandler(t.id, e)} type="checkbox"/>
                        <EditableSpan title={t.title} onChangeTitle={newTitle => updateTitleSpan(newTitle)}/>
                    </li>
                })}
            </ul>
            <Button className={filter === 'all' ? 'activeClass' : ''}
                    name='All'
                    callback={() => changeFiltered('all')}/>
            <Button className={filter === 'active' ? 'activeClass' : ''}
                    name='Active'
                    callback={() => changeFiltered('active')}/>
            <Button className={filter === 'completed' ? 'activeClass' : ''}
                    name='Completed'
                    callback={() => changeFiltered('completed')}/>
        </div>
    );
};
export default TodoList;
