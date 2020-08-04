import React, {Component} from "react";
import {connect} from "react-redux";

import Grid from "@material-ui/core/Grid";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {verifyToken} from "../actions/appActions";
import Dashboard from "./Dashboard";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

class Home extends Component {
    constructor(props) {
        super(props)
        this.getLoginScreen = this.getLoginScreen.bind(this)
    }

    componentDidMount() {
        this.props.verifyToken()
    }

    getLoginScreen() {
        return <Grid container
                     direction="column"
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
            <Typography style={{color:"white", fontSize:12, paddingTop:8}}>Chris Donaldson 2020 - Therapy Box</Typography>
        </Grid>
    }

    render() {

        if (this.props.isSignInLoading) {
            return (<Grid container justify="center"
                          alignItems="center" style={{height: 360}}>
                <Grid item>
                    <CircularProgress />
                </Grid>
            </Grid>)
        } else {

            if (this.props.allowDashboard) {
                return <Dashboard/>
            } else {
                return this.getLoginScreen()
            }
        }
    }
}

const mapStateToProps = state => ({
    token: state.userR.token,
    loginScreen: state.userR.loginScreen,
    allowDashboard: state.userR.allowDashboard,
    isSignInLoading: state.userR.isSignInLoading,
});


const mapDispatch = {verifyToken}

export default connect(mapStateToProps, mapDispatch)(Home);
