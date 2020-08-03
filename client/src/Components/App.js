import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {connect} from "react-redux";
import {MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "./Theme"
import "./styles_helper.css"

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
                    height:"100%",
                    backgroundImage:"url('./layout_pattern.png')",
                    backgroundRepeat: "repeat",

                }}>

                    <MuiThemeProvider theme={theme}>
                        <CssBaseline/>

                            <Route exact path='/' render={() => <Home/>}/>


                    </MuiThemeProvider>
                </div>
            </Router>

        );
    }
}

const mapStateToProps = state => ({});


const mapDispatch = {}

export default connect(mapStateToProps, mapDispatch)(App);
