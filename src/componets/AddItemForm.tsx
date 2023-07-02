import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Input from "./Input";
import Button from "./Button";

type TAddItemForm = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem}: TAddItemForm) => {
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
            <Input type='text' onKeyDown={onAddKeyHandler} className={error ? 'error' : ''}
                   onChange={onChangeTitleHandler} value={newTitle}/>
            <Button callback={addTaskHandler} name='➕'/>
            {error && <div className='error-message'>{error}</div>}
        </div>
    );
};
