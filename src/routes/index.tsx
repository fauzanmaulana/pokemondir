import React from 'react';
import { useRoutes } from 'react-router-dom';
import AuthGuard from '../guards/AuthGuard';
import Login from '../layouts/Login';
import DetailCathedPokemon from '../layouts/pokemon/catched/Detail';
import ListCathedPokemon from '../layouts/pokemon/catched/List';
import DetailPokemon from '../layouts/pokemon/Detail';
import ListPokemon from '../layouts/pokemon/List';
import Register from '../layouts/Register';
import User from '../layouts/User';

const Router = () => {
    return useRoutes([
        {
            path: '/',
            element: <AuthGuard/>
        },
        {
            path: 'login',
            element: <Login/>
        },
        {
            path: 'register',
            element: <Register/>
        },
        {
            path: 'user',
            element: <AuthGuard><User/></AuthGuard>
        },
        {
            path: 'pokemons',
            children: [
                {
                    index: true,
                    element: <AuthGuard><ListPokemon/></AuthGuard>
                },
                {
                    path: 'my', 
                    element: <AuthGuard><ListCathedPokemon /></AuthGuard>, 
                },
            ]
        },
        {
            path: 'pokemon/:name',
            element: <AuthGuard><DetailPokemon/></AuthGuard>,
        },
        {
            path: 'pokemon/my/:name',
            element: <AuthGuard><DetailCathedPokemon/></AuthGuard>,
        },
    ])
}

export default Router;