import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import * as React from "react";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMovieList} from "../../store/actions/movies";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";

export default function MovieList() {
    const [query, setQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(0)

    const movieList = useSelector(state => state.movie.movie.items)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const pageCount = useSelector(state => state.movie.movie.pageCount)
    const dispatch = useDispatch()
    useEffect(() => {
        console.log(currentPage)
        dispatch(getMovieList(query, currentPage))
    }, [dispatch, isAuthenticated, query, currentPage])

    const handlePageClick = (event) => {
        setCurrentPage(event.selected)
    };

    return (
        Array.isArray(movieList) ?
            <Grid mt={5}>
                <input placeholder="Enter Movie Title" onChange={event => setQuery(event.target.value)}/>
                <Grid container spacing={4} mt={1} mb={10}>
                    {movieList.map(movie => (
                        <Grid item key={movie.movieId} xs={12} sm={6} md={4}>
                            <Card sx={{maxHeight: 345}}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {movie.title}
                                    </Typography>
                                    <Typography iant="body2">
                                        Статус: {movie.movieStatus}
                                    </Typography>
                                    <Typography iant="body2">
                                        Оценка: {movie.voteAverage}
                                    </Typography>
                                    <Typography iant="body2" color="text.secondary">
                                        {movie.overview.slice(0, 100)}...
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button component={Link} to={'movies/' + movie.movieId} variant="contained"
                                            size="small">Подробнее</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <ReactPaginate
                    previousLabel="previous"
                    nextLabel="next"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    pageCount={pageCount}
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