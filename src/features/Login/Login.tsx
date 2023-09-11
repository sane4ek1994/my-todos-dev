import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import * as Yup from 'yup';
import {loginTC} from "./auth-reducer";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {Navigate} from "react-router-dom";

export const Login = () => {
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().min(3, 'must be at least 3 characters long').required('Required')
        }),
        onSubmit: values => {
            dispatch(loginTC(values))
        },
    })

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }


    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'} rel="noreferrer"> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            variant="standard"
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}/>
                        {formik.touched.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField
                            variant="standard"
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}/>
                        {formik.touched.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox {...formik.getFieldProps('rememberMe')}/>}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}