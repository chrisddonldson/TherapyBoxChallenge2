import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {connect} from "react-redux";
import {MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import HomePage from "./HomePage";
import theme from "./Theme"
import "./styles_helper.css"
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Home from "./HomePage";
import Dashboard from "./Dashboard";

class App extends Component {

    constructor(props) {
        super(props);

    }


    render() {

        return (
            <Router>
                <div className="App" style={{
                    backgroundColor:"#028090",
                    height: "100%",


                }}>

                    <MuiThemeProvider theme={theme}>
                        <CssBaseline/>

                            <Route exact path='/' render={() => <Home/>}/>
                            <Route exact path='/dashboard' render={() => <Dashboard/>}/>

                    </MuiThemeProvider>
                </div>
            </Router>

        );
    }
}

const mapStateToProps = state => ({});


const mapDispatch = {}

export default connect(mapStateToProps, mapDispatch)(App);
