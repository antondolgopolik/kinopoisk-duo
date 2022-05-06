import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {getUserList} from "../../store/actions/users";
import ReactPaginate from "react-paginate";

function getUserTable(users) {
    return (
        users.map(user => (
            <ListItem disablePadding key={user.userId}>
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
    const [currentPage, setCurrentPage] = useState(0)

    const userList = useSelector(state => state.users.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserList(currentPage))

    }, [dispatch, currentPage])

    const handlePageClick = (event) => {
        setCurrentPage(event.selected)
    };

    return (
        (userList && Array.isArray(userList.items)) ?
            <Grid>
                <Grid mb={5} mt={1}>
                    {getUserTable(userList.items)}
                </Grid>
                <ReactPaginate
                    previousLabel="previous"
                    nextLabel="next"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    pageCount={userList.pageCount}
                    pageRangeDisplayed={4}
                    marginPagesDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName="pagination justify-content-center"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    activeClassName="active"
                    hrefAllControls
                    forcePage={currentPage}
                />
            </Grid> : <Typography>Loading</Typography>
    )
}