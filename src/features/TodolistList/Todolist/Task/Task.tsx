import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {removeTaskTC, updateTaskTC} from "../../tasks-reducer";
import {EditableSpan} from "componets/EditableSpan/EditableSpan";
import {DeleteForever} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "api/task-api";
import {useAppDispatch} from "state/store";


type TTaskProps = TaskType & {
    todolistId: string
}
export const Task = React.memo(({id, status, title, todolistId}: TTaskProps) => {

    const dispatch = useAppDispatch()

    const changeIsDoneValue = (e: ChangeEvent<HTMLInputElement>) => dispatch(updateTaskTC(id, {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}, todolistId))
    const updateTitleSpan = useCallback(((newTitle: string) => dispatch(updateTaskTC(id, {title: newTitle}, todolistId))), [dispatch, id, todolistId])
    const changeRemoveTask = () => dispatch(removeTaskTC(todolistId, id))


    return (
        <li key={id} className={status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox color="success" checked={status === TaskStatuses.Completed}
                      onChange={changeIsDoneValue}/>
            <EditableSpan title={title} onChangeTitle={updateTitleSpan}/>
            <IconButton onClick={changeRemoveTask}>
                <DeleteForever/>
            </IconButton>
        </li>
    );
});
