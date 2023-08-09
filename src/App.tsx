import {TodoList} from "./componets/TodoList/TodoList";
import S from './App.module.css'
import {AddItemForm} from "./componets/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {useDispatch, useSelector} from "react-redux";
import {TAppRootState} from "./state/store";
import {addTodolistAC} from "./state/todolists-reducer";
import {useCallback} from "react";

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

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    return (
        <div className={S.App} >
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