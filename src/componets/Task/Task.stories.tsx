import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../stories/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {TAppRootState} from "../../state/store";
import {todoListID2} from "../../state/todolists-reducer";
import {TTasks} from "../TodoList/TodoList";

const meta: Meta<typeof Task> = {
    title: 'TODOLIST/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorator],
    tags: ['autodocs'],
};


export default meta;
type Story = StoryObj<typeof Task>;

const TaskWitchRedux = () => {

    const tasks = useSelector<TAppRootState, TTasks[]>(state => state.tasks[todoListID2])

    return (
        <>
            {tasks.map(task => <Task {...task} todolistId={todoListID2}/>)}
        </>
    )
}

export const TaskIsDoneStories: Story = {
    args: {
        id: '123',
        isDone: true,
        title: 'TEST TASK COMPONENT',
        todolistId: '124'
    }

}
export const TaskStory = {
    render: () => <TaskWitchRedux/>
}