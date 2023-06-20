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

    const todoListID1 = v1()
    const todoListID2 = v1()

    const [categories, setCategories] = useState<TTodoList[]>([
        {id: todoListID1, title: 'Todo list', filter: 'all'},
        {id: todoListID2, title: 'Hobby list', filter: 'active'},
    ])

    const [list, setList] = useState({
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

    const addTask = (title: string, todolistId: string) => {
        setList({...list, [todolistId]: [{id: v1(), title: title, isDone: false}, ...list[todolistId]]})
    }

    const removeTask = (id: string, todolistId: string) => {
        setList({...list, [todolistId]: list[todolistId].filter(t => t.id !== id)})
    }

    const onChangeIsDone = (id: string, isDone: boolean, todolistId: string) => {
        setList({...list, [todolistId]: list[todolistId].map(list => list.id === id ? {...list, isDone} : list)})
    }

    const changeFilter = (value: TFilterTask, todoListId: string) => {
        setCategories(categories.map(filtered => filtered.id === todoListId ? {...filtered, filter: value} : filtered))
    }

    const removeTodolist = (todolistId: string) => {
        setCategories([...categories.filter(tl => tl.id !== todolistId)])
        delete list[todolistId]
        setList({...list})
    }

    return (
        <div className={S.App}>
            {categories?.map(tl => {
                const filterTaskHandler = () => {
                    let filteredTask = list[tl.id]
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
