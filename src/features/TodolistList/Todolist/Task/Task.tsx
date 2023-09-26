import React, { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { tasksThunks } from "../../tasks-reducer";
import { EditableSpan } from "common/componets/EditableSpan/EditableSpan";
import { DeleteForever } from "@mui/icons-material";
import { TaskType } from "common/types/types";
import { useAppDispatch } from "app/store";
import { TaskStatuses } from "common/enums/enums";

type TTaskProps = TaskType & {
  todolistId: string;
};
export const Task = React.memo(
  ({ id, status, title, todolistId }: TTaskProps) => {
    const dispatch = useAppDispatch();
    const changeIsDoneValue = (e: ChangeEvent<HTMLInputElement>) =>
      dispatch(
        tasksThunks.updateTask({
          taskId: id,
          domainModel: {
            status: e.currentTarget.checked
              ? TaskStatuses.Completed
              : TaskStatuses.New,
          },
          todolistId,
        })
      );

    const updateTitleSpan = useCallback(
      (newTitle: string) =>
        dispatch(
          tasksThunks.updateTask({
            taskId: id,
            domainModel: { title: newTitle },
            todolistId,
          })
        ),
      [dispatch, id, todolistId]
    );
    const changeRemoveTask = () =>
      dispatch(tasksThunks.removeTask({ todolistId, taskId: id }));

    return (
      <li
        key={id}
        className={status === TaskStatuses.Completed ? "is-done" : ""}
      >
        <Checkbox
          color="success"
          checked={status === TaskStatuses.Completed}
          onChange={changeIsDoneValue}
        />
        <EditableSpan title={title} onChangeTitle={updateTitleSpan} />
        <IconButton onClick={changeRemoveTask}>
          <DeleteForever />
        </IconButton>
      </li>
    );
  }
);
