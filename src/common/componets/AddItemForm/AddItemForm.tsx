import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { PlaylistAdd } from "@mui/icons-material";
import { BaseResponseType } from "common/types/types";

export type TAddItemForm = {
  addItem: (title: string) => Promise<any | string>;
};

export const AddItemForm = React.memo(({ addItem }: TAddItemForm) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setTitle(e.currentTarget.value);
  };

  const onAddKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTaskHandler();
    }
  };
  const addTaskHandler = () => {
    const newTitle = title.trim();
    if (title) {
      addItem(newTitle)
        .then(() => {
          setTitle("");
        })
        .catch((err: BaseResponseType) => {
          if (err?.resultCode) {
            setError(err.messages[0]);
          }
        });
    }

    return setError("Title is required!");
  };

  return (
    <div>
      <TextField
        label="Type value"
        variant="standard"
        helperText={error}
        error={!!error}
        value={title}
        onChange={onChangeTitleHandler}
        onKeyDown={onAddKeyHandler}
      />
      <IconButton onClick={addTaskHandler}>
        <PlaylistAdd />
      </IconButton>
    </div>
  );
});
