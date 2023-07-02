import React, {ChangeEvent } from 'react';
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
    id: string
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
    const [parent] = useAutoAnimate()


    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }


    const removeTask = (id: string) => {
        props.removeTask(id, props.id)
    }

    const onChangeIsDoneHandler = (id: string, e: ChangeEvent<HTMLInputElement>) => {
        props.onChangeIsDone(id, e.currentTarget.checked, props.id)
    }

    const changeFiltered = (valueFilter: TFilterTask) => {
        props.changeFilter(valueFilter, props.id)
    }

    const updateTodoListTitle = (newTitle: string) => props.onChangeTodoListTitle(props.id, newTitle)

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    return (
        <div>
            <h2><EditableSpan title={props.title} onChangeTitle={(newTitle) => updateTodoListTitle(newTitle)}/></h2>
            <Button callback={removeTodolist} name='✖️'/>
            <AddItemForm addItem={addTask}/>
            <ul ref={parent}>
                {props.tasks?.map(t => {
                    const updateTitleSpan = (newTitle: string) => {
                        props.onChangeTaskTitle(t.id, newTitle, props.id)
                    }

                    const changeRemoveTask = () => {
                        removeTask(t.id)
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Button name='✖️' callback={changeRemoveTask}/>
                        <Input checked={t.isDone} onChange={(e) => onChangeIsDoneHandler(t.id, e)} type="checkbox"/>
                        <EditableSpan title={t.title} onChangeTitle={newTitle => updateTitleSpan(newTitle)}/>
                    </li>
                })}
            </ul>
            <Button className={props.filter === 'all' ? 'activeClass' : ''}
                    name='All'
                    callback={() => changeFiltered('all')}/>
            <Button className={props.filter === 'active' ? 'activeClass' : ''}
                    name='Active'
                    callback={() => changeFiltered('active')}/>
            <Button className={props.filter === 'completed' ? 'activeClass' : ''}
                    name='Completed'
                    callback={() => changeFiltered('completed')}/>
        </div>
    );
};
export default TodoList;
