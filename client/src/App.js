import {Provider} from "react-redux";
import store from "./store/store";
import SignIn from "./components/accounts/SignIn";
import SignUp from "./components/accounts/SignUp";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from "./components/MainPage";
import * as React from "react";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import {useEffect} from "react";
import {loadUser} from "./store/actions/auth";

const theme = createTheme();

function App() {

    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <BrowserRouter>
                    <Routes>
                        <Route path="/signin" element={<SignIn/>}/>
                        <Route path="/signup" element={<SignUp/>}/>
                        <Route path="/*" element={<MainPage/>}/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
