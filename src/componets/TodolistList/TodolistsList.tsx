import {useAppDispatch, useAppSelector} from "../../state/store";
import {createTodolistTC, getTodolistsTC, TodolistDomainType} from "../../state/todolists-reducer";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import React, {useCallback, useEffect} from "react";
import {Navigate} from "react-router-dom";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {TodoList} from "../TodoList/TodoList";

export const TodosListLists = () => {
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const categories = useAppSelector<TodolistDomainType[]>(state => state.todolists)
    const dispatch = useAppDispatch()

    const [parent] = useAutoAnimate()

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])


    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(getTodolistsTC())
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <>
            <Grid container justifyContent="center" style={{padding: '10px', marginBottom: '10px'}}>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={3} ref={parent} justifyContent="center">
                {categories?.map(tl => {
                    return <Grid item key={tl.id}>
                        <Paper elevation={3} style={{padding: '10px'}}>
                            <TodoList todolist={tl}/>
                        </Paper>
                    </Grid>
                })}
            </Grid>
        </>
    )
}

