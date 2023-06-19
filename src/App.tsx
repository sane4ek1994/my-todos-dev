import React, {useState} from 'react';
import TodoList from "./componets/TodoList";
import {v1} from "uuid";
import S from './App.module.css'


export type TFilterTask = 'all' | 'completed' | 'active'

type TTodoList = {
    id: string
    title: string
    filter: TFilterTask
}


function App() {

    // const [tasks, setTasks] = useState<TTasks[]>([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);

    const addTask = (title: string, todolistId: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        const tasks = tasksObj[todolistId]

        tasksObj[todolistId] = tasks?.length ? [newTask, ...tasks] : [newTask]
        setTasksObj({...tasksObj})
    }

    const removeTask = (id: string, todolistId: string) => {
        const tasks = tasksObj[todolistId]
        tasksObj[todolistId] = tasks.filter(t => t.id !== id)
        setTasksObj({...tasksObj})
    }

    const onChangeIsDone = (id: string, isDone: boolean, todolistId: string) => {

        const tasks = tasksObj[todolistId]
        const task = tasks.find(tl => tl.id === id)
        if (task) {
            task.isDone = isDone
            setTasksObj({...tasksObj})
        }
    }

    const changeFilter = (value: TFilterTask, todoListId: string) => {
            const todolist = todolists.find(tl => tl.id === todoListId)
        if (todolist) {
            todolist.filter = value
            setTodoLists([...todolists])
        }
    }

     const removeTodolist = (todolistId: string) => {
        const filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
         setTodoLists([...filteredTodolist])

         delete tasksObj[todolistId]
         setTasksObj({...tasksObj})
     }

    const todoListID1 = v1()
    const todoListID2 = v1()

    const [todolists, setTodoLists] = useState<TTodoList[]>([
        {id:todoListID1, title: 'Todo list', filter: 'all'},
        {id:todoListID2, title: 'Hobby list', filter: 'active'},
    ])

    const [tasksObj, setTasksObj] = useState({
        [todoListID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "Pizzza 🍕", isDone: true},
            {id: v1(), title: "Beer🍺", isDone: true},
            {id: v1(), title: "Game 🎮", isDone: false},
            {id: v1(), title: "Hello!", isDone: false},
            {id: v1(), title: "Hi gay!😁", isDone: false},
        ]
    });

    return (
        <div className={S.App}>
            {todolists?.map(tl => {
                const filterTaskHandler = () => {
                    let filteredTask = tasksObj[tl.id]
                    switch (tl.filter) {
                        case "active":
                            return filteredTask?.filter(t => !t.isDone)
                        case "completed":
                            return filteredTask?.filter(t => t.isDone)
                        default:
                            return filteredTask
                    }
                }
                return <TodoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    tasks={filterTaskHandler()}
                    addTask={addTask}
                    changeFilter={changeFilter}
                    removeTask={removeTask}
                    removeTodolist={removeTodolist}
                    onChangeIsDone={onChangeIsDone}
                />
            })}
        </div>
    );
}

export default App;
