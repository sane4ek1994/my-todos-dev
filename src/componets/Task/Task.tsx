import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {changeTaskIsDoneAC, changeTaskTitleAC, removeTasksAC} from "../../state/tasks-reducer";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {DeleteForever} from "@mui/icons-material";
import {useDispatch} from "react-redux";


type TTaskProps = {
    id: string
    isDone: boolean
    title: string
    todolistId: string
}
export const Task = React.memo(({id, isDone, title, todolistId}: TTaskProps) => {

    const dispatch = useDispatch()

    const changeIsDoneValue = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskIsDoneAC(todolistId, id, e.currentTarget.checked))
    const updateTitleSpan = useCallback(((newTitle: string) => dispatch(changeTaskTitleAC(todolistId, id, newTitle))), [dispatch, id, todolistId])
    const changeRemoveTask = () => dispatch(removeTasksAC(todolistId, id))


    return (
        <li key={id} className={isDone ? 'is-done' : ''}>
            <Checkbox color="success" checked={isDone}
                      onChange={changeIsDoneValue}/>
            <EditableSpan title={title} onChangeTitle={updateTitleSpan}/>
            <IconButton onClick={changeRemoveTask}>
                <DeleteForever/>
            </IconButton>
        </li>
    );
});
