import React, { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { tasksThunks } from "../../tasks-reducer";
import { EditableSpan } from "common/componets/EditableSpan/EditableSpan";
import { DeleteForever } from "@mui/icons-material";
import { TaskType } from "common/types/types";
import { TaskStatuses } from "common/enums/enums";
import { useActions } from "common/hooks/useAction";

type TTaskProps = TaskType & {
  todolistId: string;
};
export const Task = React.memo(
  ({ id, status, title, todolistId }: TTaskProps) => {
    const { updateTask, removeTask } = useActions(tasksThunks);
    const changeIsDoneValue = (e: ChangeEvent<HTMLInputElement>) =>
      updateTask({
        taskId: id,
        domainModel: {
          status: e.currentTarget.checked
            ? TaskStatuses.Completed
            : TaskStatuses.New,
        },
        todolistId,
      });

    const updateTitleSpan = useCallback(
      (newTitle: string) =>
        updateTask({
          taskId: id,
          domainModel: { title: newTitle },
          todolistId,
        }),
      [id, todolistId, updateTask]
    );
    const changeRemoveTask = () => removeTask({ todolistId, taskId: id });

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
