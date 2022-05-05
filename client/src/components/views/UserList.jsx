import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getMovieList} from "../../store/actions/movies";
import {Link} from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {getUserList} from "../../store/actions/users";

function getUserTable(users) {
    return (
        users.map(user => (
            <ListItem disablePadding>
                <ListItemText>
                    <Typography component={Link} to={'../' + user.username}>
                        {user.username}
                    </Typography>
                </ListItemText>
                <ListItemText>
                    <Typography>
                        {user.tgId}
                    </Typography>
                </ListItemText>
            </ListItem>
        ))
    )
}

export default function UserList() {
    const userList = useSelector(state => state.users.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserList())
    }, [dispatch])
    return (
        (userList && Array.isArray(userList.items)) ?
            getUserTable(userList.items) : <Typography>Loading</Typography>
    )
}