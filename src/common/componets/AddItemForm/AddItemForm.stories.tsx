import type { Meta, StoryObj } from "@storybook/react";
import {
  AddItemForm,
  TAddItemForm,
} from "common/componets/AddItemForm/AddItemForm";
import { action } from "@storybook/addon-actions";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { PlaylistAdd } from "@mui/icons-material";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
  title: "TODOLIST/AddItemForm",
  component: AddItemForm,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    addItem: {
      description: "Click button inside form",
      action: "Click button inside form",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;
const AddItemFormWitchError = (args: TAddItemForm) => {
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState<string | null>("Title is required!");

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setNewTitle(e.currentTarget.value);
  };

  const onAddKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTaskHandler();
    }
  };
  const addTaskHandler = () => {
    const title = newTitle.trim();
    if (title) {
      args.addItem(title);
      setNewTitle("");
      return;
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
        value={newTitle}
        onChange={onChangeTitleHandler}
        onKeyDown={onAddKeyHandler}
      />
      <IconButton onClick={addTaskHandler}>
        <PlaylistAdd />
      </IconButton>
    </div>
  );
};

export const AddItemFormWitchErrorStory: Story = {
  render: (args) => <AddItemFormWitchError addItem={args.addItem} />,
};
// todo fix types addItem
// export const AddItemFormStory: Story = {
//   args: {
//     addItem: action("Click button inside form"),
//   },
// };
