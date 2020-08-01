import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";

const styles = theme => ({});

class Home extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const {classes} = this.props;

        return (
            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center" style={{height: "100%"}}>
                <Grid item style={{
                    padding: 32,
                    backgroundColor: "#FFFFFF",
                    borderRadius: 2,
                }}>
                    <SignIn/>
                    <SignUp/>

                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({});


const mapDispatch = {}

export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(Home));
