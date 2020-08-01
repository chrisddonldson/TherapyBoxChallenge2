import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {connect} from "react-redux";
import {MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import HomePage from "./HomePage";
import theme from "./Theme"
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

class App extends Component {

    constructor(props) {
        super(props);

    }


    render() {

        return (
            <Router>
                <div className="App">
                    <MuiThemeProvider theme={theme}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start"  color="inherit" aria-label="menu">
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6">
                                News
                            </Typography>
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>

                        <CssBaseline/>
                        <Route exact path='/' render={() => <HomePage/>}/>
                        <Route exact path='/about' render={() => <HomePage/>}/>
                    </MuiThemeProvider>
                </div>
            </Router>

        );
    }
}

const mapStateToProps = state => ({});


const mapDispatch = {}

export default connect(mapStateToProps, mapDispatch)(App);
