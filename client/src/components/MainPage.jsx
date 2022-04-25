import * as React from 'react';
import {
    Routes, Route
} from "react-router-dom"
import Menu from "./layout/Menu";
import Footer from "./layout/Footer";
import AnimeList from "./views/AnimeList";
import AnimeDetail from "./views/AnimeDetail";
import {Container} from "@mui/material";
import Profile from "./views/Profile";
import {useEffect} from "react";
import {loadUser} from "../store/actions/auth";
import {useDispatch, useSelector} from "react-redux";

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
                    <Route path="/" element={<AnimeList/>}/>
                    <Route path="/anime/:slug" element={<AnimeDetail/>}/>
                    <Route path="/:username" element={<Profile/>}/>
                </Routes>
               {/* <Footer/>*/}
            </Container>
        </main>);
}
