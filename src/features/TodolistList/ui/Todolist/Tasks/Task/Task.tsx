import React, { ChangeEvent, useCallback } from "react";
import { Checkbox, IconButton } from "@mui/material";
import { tasksThunks } from "features/TodolistList/model/tasks/tasksSlice";
import { EditableSpan } from "common/componets/EditableSpan/EditableSpan";
import { DeleteForever } from "@mui/icons-material";
import { TaskType } from "common/types/types";
import { TaskStatuses } from "common/enums/enums";
import { useActions } from "common/hooks/useAction";
import s from "features/TodolistList/ui/Todolist/Tasks/Task/task.module.css";

type Props = TaskType & {
  todolistId: string;
};
export const Task = React.memo(({ id, status, title, todolistId }: Props) => {
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

  const updateTitleTask = useCallback(
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
    <li key={id} className={status === TaskStatuses.Completed ? s.isDone : ""}>
      <Checkbox
        color="success"
        checked={status === TaskStatuses.Completed}
        onChange={changeIsDoneValue}
      />
      <EditableSpan title={title} onChangeTitle={updateTitleTask} />
      <IconButton onClick={changeRemoveTask}>
        <DeleteForever />
      </IconButton>
    </li>
  );
});
