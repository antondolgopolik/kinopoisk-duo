import * as React from 'react';
import {useEffect} from 'react';
import {Route, Routes} from "react-router-dom"
import Menu from "./layout/Menu";
import Footer from "./layout/Footer";
import MovieList from "./views/MovieList";
import MovieDetail from "./views/MovieDetail";
import {Container} from "@mui/material";
import Profile from "./views/Profile";
import {loadUser} from "../store/actions/auth";
import {useDispatch, useSelector} from "react-redux";
import UserList from "./views/UserList";

export default function MainPage() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadUser())
    }, [isAuthenticated])

    return (
        <main>
            <Container sx={{py: 8}} maxWidth="md">
                <Menu/>
                <Routes>
                    <Route path="/" element={<MovieList/>}/>
                    <Route path="/movies/:movieId" element={<MovieDetail/>}/>
                    <Route path="/users" element={<UserList/>}/>
                    <Route path="/:username" element={<Profile/>}/>
                </Routes>
                <Footer/>
            </Container>
        </main>);
}
