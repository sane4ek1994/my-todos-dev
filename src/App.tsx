import React, {useState} from 'react';
import TodoList, {TTasks} from "./componets/TodoList";
import {v1} from "uuid";


export type TFilterTask = 'all' | 'completed' | 'active'


function App() {

    const [tasks, setTasks] = useState<TTasks[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);
    const [filter, setFilter] = useState<TFilterTask>('all');


    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const removeTask = (id: string) => {
        const filteredTask = tasks.filter(t => t.id !== id)
        setTasks(filteredTask)
    }

    const filterTaskHandler = () => {
        let filteredTask = tasks
        switch (filter) {
            case "active":
                return filteredTask.filter(t => !t.isDone)
            case "completed":
                return filteredTask.filter(t => t.isDone)
            default:
                return filteredTask
        }
    }

    const changeFilter = (value: TFilterTask) => {
        setFilter(value)
    }

    const onChangeIsDone = (id: string, isDone: boolean) => {
            setTasks(tasks.map(el => el.id === id ? {...el, isDone: isDone} : el))
    }

    return (
        <div className="App">
            <TodoList
                title='Todo-list'
                tasks={filterTaskHandler()}
                addTask={addTask}
                changeFilter={changeFilter}
                removeTask={removeTask}
                onChangeIsDone={onChangeIsDone}
                filter={filter}/>
        </div>
    );
}

export default App;
