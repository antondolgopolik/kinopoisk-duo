import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import {IconButton} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getMovieList} from "../../store/actions/movies";
import {login, logout} from "../../store/actions/auth";
import * as React from "react";
import {getUserList} from "../../store/actions/users";


const root = {
    flexGrow: 1
}
const title = {
    flexGrow: 1
}

function guestLinks() {
    return (
        <>
            <Box mr={3} ml={10}>
                <Button component={Link} to="/signin" color="inherit" variant="outlined">Log In</Button>
            </Box>
            <Button component={Link} to="/signup" color="secondary" variant="contained">Sign Up</Button>
        </>
    )
}

function authLinks(isLoading, user, handle) {

    return (
        user ?
            <>
                <Box mr={3}>
                    <Typography component={Link} to={"/" + user.username} variant="h6">{user.username}</Typography>
                </Box>
                <Button onClick={handle} color="secondary" variant="contained">Logout</Button>
            </> : <Typography>Loading</Typography>
    )


}

export default function Menu() {
    const user = useSelector(state => state.auth.user)
    const isLoading = useSelector(state => state.auth.isLoading)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const dispatch = useDispatch();

    const handleLogout = (event) => {
        event.preventDefault();
        dispatch(logout())
    };

    return (
        <div>
            <AppBar position="fixed">
                <Container fixed>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu"
                                    component={Link} to="/">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" className={title}>Shikimori</Typography>
                        <Box ml="50%">

                            <Button component={Link} to="/users" color="inherit">User
                                List</Button>
                        </Box>
                        {isAuthenticated ? authLinks(isLoading, user, handleLogout) : guestLinks()}
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}