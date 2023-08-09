import {TodoList} from './TodoList'
import {ReduxStoreProviderDecorator} from "../../stories/ReduxStoreProviderDecorator";
import {TTodoList} from "../../App";


export default {
    title: 'TodoList Component',
    component: TodoList,
    decorators: [ReduxStoreProviderDecorator]
}


const todolistItem: TTodoList = {id: '111', title: 'I`m testing todo item', filter: 'completed'}

export const TodoListExample = () => {
    return <TodoList todolist={todolistItem}/>
}
