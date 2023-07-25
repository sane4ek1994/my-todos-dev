import TodoList from "./componets/TodoList";
import S from './App.module.css'
import {AddItemForm} from "./componets/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {useDispatch, useSelector} from "react-redux";
import {TAppRootState} from "./state/store";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";

export type TFilterTask = 'all' | 'completed' | 'active'

export type TTodoList = {
    id: string
    title: string
    filter: TFilterTask
}


function App() {

    const categories = useSelector<TAppRootState, TTodoList[]>(state => state.todolists)

    const dispatch = useDispatch()

    const [parent] = useAutoAnimate()

    const changeFilter = (value: TFilterTask, todoListId: string) => {
        dispatch(changeTodolistFilterAC(todoListId, value))
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId))
    }
    const addTodoList = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    const onChangeTodoListTitle = (id: string, title: string) => {
        dispatch(changeTodolistTitleAC(id, title))
    }

    return (
        <div className={S.App}>
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
            </AppBar>
            <Container fixed>
                <Grid container justifyContent="center" style={{padding: '10px', marginBottom: '10px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3} ref={parent} justifyContent="center">
                    {categories?.map(tl => {
                        return <Grid item key={tl.id}>
                            <Paper elevation={3} style={{padding: '10px'}}>
                                <TodoList
                                    categoryId={tl.id}
                                    title={tl.title}
                                    filter={tl.filter}
                                    changeFilter={changeFilter}
                                    onChangeTodoListTitle={onChangeTodoListTitle}
                                    removeTodolist={removeTodolist}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;