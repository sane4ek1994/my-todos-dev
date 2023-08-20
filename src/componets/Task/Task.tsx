import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {changeTaskIsDoneAC, changeTaskTitleAC, removeTasksAC} from "../../state/tasks-reducer";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {DeleteForever} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {TaskStatuses, TaskType} from "../../api/task-api";


type TTaskProps = TaskType & {
    todolistId: string
}
export const Task = React.memo(({id, status, title, todolistId}: TTaskProps) => {

    const dispatch = useDispatch()

    const changeIsDoneValue = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskIsDoneAC(todolistId, id, e.currentTarget.checked ? TaskStatuses.New : TaskStatuses.Completed))
    const updateTitleSpan = useCallback(((newTitle: string) => dispatch(changeTaskTitleAC(todolistId, id, newTitle))), [dispatch, id, todolistId])
    const changeRemoveTask = () => dispatch(removeTasksAC(todolistId, id))


    return (
        <li key={id} className={status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox color="success" checked={status === TaskStatuses.New}
                      onChange={changeIsDoneValue}/>
            <EditableSpan title={title} onChangeTitle={updateTitleSpan}/>
            <IconButton onClick={changeRemoveTask}>
                <DeleteForever/>
            </IconButton>
        </li>
    );
});
