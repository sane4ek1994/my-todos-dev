import type {Meta, StoryObj} from '@storybook/react';
import {TodoList} from "./TodoList";
import {ReduxStoreProviderDecorator} from "../../stories/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {TAppRootState} from "../../state/store";
import {TTodoList} from "../../App";


const meta: Meta<typeof TodoList> = {
    title: 'TODOLIST/TodoList',
    component: TodoList,
    decorators: [ReduxStoreProviderDecorator],
    tags: ['autodocs'],
};


export default meta;
type Story = StoryObj<typeof TodoList>;

const TodoListWitchRedux = () => {

    const todolists = useSelector<TAppRootState, TTodoList[]>(state => state.todolists)
    console.log(todolists)

    return (
        <>
            {todolists.map(todolist => <TodoList todolist={todolist}/>)}
        </>
    )
}

export const TodoListStory = {
    render: () => <TodoListWitchRedux/>
}
