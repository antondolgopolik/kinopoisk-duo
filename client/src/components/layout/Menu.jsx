import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import {IconButton} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {makeStyles} from '@mui/styles';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAnimeList} from "../../store/actions/anime";
import {login, logout} from "../../store/actions/auth";
import ClipLoader from "react-spinners/ClipLoader";
import * as React from "react";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(1)
    },
    title: {
        flexGrow: 1
    }
}))

function guestLinks() {
    return (
        <>
            <Box mr={3}>
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
                    <Typography component={Link} to={"/" + user.username} variant="h6">{user.nickname}</Typography>
                </Box>
                <Button onClick={handle} color="secondary" variant="contained">Logout</Button>
            </> : <ClipLoader color="#000000" size={50}/>
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

    const classes = useStyles()

    return (
        <div>
            <AppBar position="fixed">
                <Container fixed>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}
                                    component={Link} to="/">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>Shikimori</Typography>

                        {isAuthenticated ? authLinks(isLoading, user, handleLogout) : guestLinks()}
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    )
}