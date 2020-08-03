import React, {Component} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

import {setupSignIn, verifyToken} from "../actions/placeholderActions";
import Dashboard from "./Dashboard";

const styles = theme => ({});

class Home extends Component {
    constructor(props) {
        super(props)
        this.getLoginScreen = this.getLoginScreen.bind(this)
        this.getDashboard = this.getDashboard.bind(this)
    }

    componentDidMount() {
        this.props.verifyToken()
    }

    getDashboard() {

    }

    getLoginScreen() {
        return <Grid container
                     direction="row"
                     justify="center"
                     alignItems="center"
                     style={{height: "100%"}}>

            <Grid item style={{
                padding: 32,
                backgroundColor: "#FFFFFF",
                borderRadius: 2,
            }}>

                {this.props.loginScreen === "SIGNIN" ? (<SignIn/>) : (null)}
                {this.props.loginScreen === "SIGNUP" ? (<SignUp/>) : (null)}

            </Grid>
        </Grid>
    }

    render() {
        console.log(this.props.allowDashboard)
        if (this.props.allowDashboard) {
            return <Dashboard/>
        } else {
            return this.getLoginScreen()
        }
    }
}

const mapStateToProps = state => ({
    token: state.placeholderR.token,
    loginScreen: state.placeholderR.loginScreen,
    allowDashboard: state.placeholderR.allowDashboard
});


const mapDispatch = {verifyToken}

export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(Home));
