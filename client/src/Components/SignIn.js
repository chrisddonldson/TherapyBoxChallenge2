import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {login, setLoginScreen, setSignupSuccess} from "../actions/appActions";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = theme => ({});

class SignIn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    componentDidMount() {
    }

    onSubmit(event) {
        let data = {
            "username": this.state.username,
            "password": this.state.password,
        }

        this.props.login(data)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.props.setSignupSuccess(false);
    };

    render() {
        let errorStyle = {
            backgroundColor:"#de4a4a",
            color:"white",
            padding:4,
            margin:4,
            borderRadius: 4,
            fontSize:11
        }
        return (
            <Fragment>
                <Snackbar open={this.props.signUpSuccess} autoHideDuration={6000} style={{zIndex:80}}
                          onClose={()=>this.props.setSignupSuccess(false)}>
                    <Alert onClose={()=>this.props.setSignupSuccess(false)} severity="success">
                        Signup Successful. Please log in.
                    </Alert>
                </Snackbar>
                <Typography variant={"h3"} align={"center"}>Dev Challenge</Typography>
                <Typography variant={"h4"} align={"center"}>Sign In</Typography>


                <TextField
                    id={"username"}
                    name={"username"}
                    placeholder={"Username"}
                    variant={"filled"}
                    style={{float: "left", padding: 8}}
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    fullWidth
                />
                <TextField
                    id={"password"}
                    name={"password"}
                    placeholder={"Password"}
                    variant={"filled"}
                    type="password"
                    style={{float: "right", padding: 8}}
                    value={this.state.password}
                    onChange={this.handleInputChange}
                     fullWidth
                />
                <br/>
                <Button fullWidth style={{marginTop: 16}} onClick={this.onSubmit} color={"primary"} variant="contained">  Login</Button>
                {this.props.signInError=="" ?(null):( <Typography color={"error"} align={"center"} style={errorStyle}>{this.props.signInError}</Typography>) }


                <Typography style={{
                    marginTop: 16,
                    marginLeft: "auto",
                    marginRight: "auto"
                }} align={"center"}> New to the challenge?<br/><br/> <Button color={"secondary"} variant="outlined" onClick={() => {
                    this.props.setLoginScreen("SIGNUP")
                }}>Sign Up</Button>
                    {this.props.isLoggingIn ? (
                        <Typography>Logging in...</Typography>
                    ) : (
                        null
                    )}
                </Typography>
            </Fragment>
        )

    }
}

const mapStateToProps = state => ({
    signInError: state.userR.signInError,
    signUpSuccess: state.userR.signUpSuccess

});


const mapDispatch = {
    setLoginScreen,
    login,
    setSignupSuccess
}

export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(SignIn));
