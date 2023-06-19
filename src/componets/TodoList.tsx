import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TFilterTask} from "../App";
import {useAutoAnimate} from '@formkit/auto-animate/react'
import Button from "./Button";
import Input from "./Input";

export type TTasks = {
    id: string
    title: string
    isDone: boolean
}

type TProps = {
    title: string
    filter: TFilterTask
    tasks: TTasks[]
    addTask: (title: string) => void
    removeTask: (id: string) => void
    changeFilter: (filter: TFilterTask) => void
    onChangeIsDone: (id: string, isDone: boolean) => void
}

const TodoList = (props: TProps) => {

    const [parent] = useAutoAnimate()
    const [newTitle, setNewTitle] = useState('');
    const [error, setError] = useState<string | null>(null);
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTitle(e.currentTarget.value)
    }
    const addTaskHandler = () => {
        if (newTitle.trim()) {
            props.addTask(newTitle.trim())
            setNewTitle('')
            return
        }

        return setError('Title is required!')
    }

    const onAddKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }


    const removeTask = (id: string) => {
        props.removeTask(id)
    }

    const onChangeIsDoneHandler = (id: string, e: ChangeEvent<HTMLInputElement>) => {
        props.onChangeIsDone(id, e.currentTarget.checked)
    }

    const changeFiltered = (valueFilter: TFilterTask) => {
        props.changeFilter(valueFilter)
    }


    return (
        <div>
            <h2>{props.title}</h2>
            <Input type='text' onKeyDown={onAddKeyHandler} className={error ? 'error' : ''}
                   onChange={onChangeTitleHandler} value={newTitle}/>
            <Button callback={addTaskHandler} name='➕'/>
            {error && <div className='error-message'>{error}</div>}
            <ul ref={parent}>
                {props.tasks.map(t => (
                    <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Button name='✖️' callback={() => {
                            removeTask(t.id)
                        }}/>
                        <Input checked={t.isDone} onChange={(e) => onChangeIsDoneHandler(t.id, e)} type="checkbox"/>
                        <span>{t.title}</span>
                    </li>
                ))}
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
