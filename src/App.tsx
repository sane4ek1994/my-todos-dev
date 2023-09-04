import {TodoList} from "./componets/TodoList/TodoList";
import S from './App.module.css'
import {AddItemForm} from "./componets/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, LinearProgress, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {useAppDispatch, useAppSelector} from "./state/store";
import {createTodolistTC, getTodolistsTC, TodolistDomainType} from "./state/todolists-reducer";
import {useCallback, useEffect} from "react";
import {ErrorSnackbar} from "./componets/ErrorSnackbar/ErrorSnackbar";


function App() {

    const categories = useAppSelector<TodolistDomainType[]>(state => state.todolists)
    const status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [dispatch])

    const [parent] = useAutoAnimate()

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [dispatch])

    return (
        <div className={S.App}>
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todo-list
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
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
            </Container>
        </div>
    );
}

export default App;