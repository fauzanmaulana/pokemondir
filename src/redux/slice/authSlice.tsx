import { createSlice, nanoid } from "@reduxjs/toolkit";
import bcrypt from 'bcryptjs'
import toast from 'react-hot-toast';

interface AuthState {
    is_action_success: any
    auth_user: object
}

const authSlice = createSlice({
    name: 'auth',
    
    initialState: {
        is_action_success: null,
        auth_user: JSON.parse(localStorage.getItem('authenticated') || '{}')
    } as AuthState,

    reducers: {
        register: (state, action) => {
            if(action.payload.password === action.payload.confirm_password){
                if(localStorage.getItem('users') && JSON.parse(localStorage.getItem('users')!).find((user: any) => user.username === action.payload.username)){
                    toast.error('Username already taken!', {
                        position: 'bottom-center',
                    });
                }else{
                    action.payload.password = bcrypt.hashSync(action.payload.password, 10);
        
                    if(!localStorage.getItem('users')){
                        localStorage.setItem('users', JSON.stringify([]))
                    }
                    const users = JSON.parse(localStorage.getItem('users')!)
                    users.push({
                        id: nanoid(),
                        ...action.payload
                    })
        
                    localStorage.setItem('users', JSON.stringify(users))
    
                    toast.success('Successfull register, please login!', {
                        position: 'bottom-center',
                    });
    
                    state.is_action_success = true
                }
            }else{
                toast.error("Confirm password doesn't match!", {
                    position: 'bottom-center',
                });
            }
        },
        login: (state, action) => {
            if(!localStorage.getItem('users')){
                localStorage.setItem('users', '[]')
            }

            const users = JSON.parse(localStorage.getItem('users')!)
            const user = users.find((data: any) => data.username === action.payload.username)

            if(!localStorage.getItem('users') || !user){
                toast.error('User not found!', {
                    position: 'bottom-center',
                });
            }else{
                const credential = bcrypt.compareSync(action.payload.password, user.password);

                if(credential){
                    const authenticated = {
                        ...user,
                        token_app: process.env.REACT_APP_TOKEN
                    }
                    localStorage.setItem('authenticated', JSON.stringify(authenticated))
                    state.is_action_success = true
                }else{
                    toast.error('Something went wrong, check your username or password', {
                        position: 'bottom-center',
                    });
                }
            }
        },
        logout: (state) => {
            localStorage.removeItem('authenticated')
            state.auth_user = {}
            state.is_action_success = true
            toast.success('Successfull logout!', {
                position: 'bottom-center',
            });
        },
        resetActionStatus: (state) => {
            state.is_action_success = null
        },
        setAuthUser: (state) => {
            state.auth_user = JSON.parse(localStorage.getItem('authenticated') || '{}')
        }
    }
})

export const { register, login, logout, resetActionStatus, setAuthUser } = authSlice.actions

export default authSlice.reducer