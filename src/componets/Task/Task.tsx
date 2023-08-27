import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {changeTaskStatusTC, changeTaskTitleTC, removeTaskTC} from "../../state/tasks-reducer";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {DeleteForever} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../../api/task-api";
import {useAppDispatch} from "../../state/store";


type TTaskProps = TaskType & {
    todolistId: string
}
export const Task = React.memo(({id, status, title, todolistId}: TTaskProps) => {

    const dispatch = useAppDispatch()

    const changeIsDoneValue = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusTC(todolistId, id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New))
    const updateTitleSpan = useCallback(((newTitle: string) => dispatch(changeTaskTitleTC(todolistId, id, newTitle))), [dispatch, id, todolistId])
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
