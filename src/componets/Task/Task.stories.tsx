import {Task} from "./Task";
import {action} from '@storybook/addon-actions'
import {ReduxStoreProviderDecorator} from "../../stories/ReduxStoreProviderDecorator";

export default {
    title: 'Task Component',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
}
//Подчини эту stories ⚒️
// const callback = action('Task task')

const propsTask = {id: '123', isDone: false, title: 'Home work!', todolistId: '5555'}
export const TaskExample = () => {
    return <>
        <Task {...propsTask}/>
    </>
}
