import React, { ChangeEvent, useState } from "react";
import { TextField } from "@mui/material";
import { truncateString } from "common/utils/truncate-string";

type TEditableSpan = {
  title: string;
  onChangeTitle: (newTitle: string) => void;
};
export const EditableSpan = React.memo(
  ({ title, onChangeTitle }: TEditableSpan) => {
    const [editMode, setEditMode] = useState(false);
    const [newTitle, setNewTitle] = useState(title);

    const shortTitle = truncateString(title, 10);
    const activateEditMode = () => {
      setEditMode(true);
    };

    const activateViewMode = () => {
      setEditMode(false);
      onChangeTitle(newTitle);
    };
    const changeNewTitle = (e: ChangeEvent<HTMLInputElement>) =>
      setNewTitle(e.currentTarget.value);

    return editMode ? (
      <TextField
        variant="standard"
        onBlur={activateViewMode}
        autoFocus
        onChange={changeNewTitle}
        value={newTitle}
        type="text"
      />
    ) : (
      <span onDoubleClick={activateEditMode}>{shortTitle}</span>
    );
  }
);
