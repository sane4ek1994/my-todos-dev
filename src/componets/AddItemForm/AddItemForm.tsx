import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@mui/material";
import {PlaylistAdd} from '@mui/icons-material';


type TAddItemForm = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(({addItem}: TAddItemForm) => {
    const [newTitle, setNewTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTitle(e.currentTarget.value)
    }

    const onAddKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    const addTaskHandler = () => {
        const title = newTitle.trim()
        if (title) {
            addItem(title)
            setNewTitle('')
            return
        }

        return setError('Title is required!')
    }

    return (
        <div>
            <TextField label="Type value"
                       variant="standard"
                       helperText={error}
                       error={!!error}
                       value={newTitle}
                       onChange={onChangeTitleHandler}
                       onKeyDown={onAddKeyHandler}
            />
            <IconButton onClick={addTaskHandler}>
                <PlaylistAdd/>
            </IconButton>
        </div>
    );
});
