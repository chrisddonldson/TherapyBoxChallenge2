import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {setLoginScreen, signup} from "../actions/appActions";
import withTheme from "@material-ui/core/styles/withTheme";

const styles = theme => ({});

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: "",
            password_repeat: "",
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    componentDidMount() {
    }

    onSubmit(event) {
        let data = {
            "username": this.state.username,
            "email": this.state.email,
            "password": this.state.password,
            "password_repeat": this.state.password_repeat,
        }

        this.props.signup(data)
    }

    handleInputChange(event) {
        const target = event.target;

        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render() {
        const {theme} = this.props
        let errorStyle = {
            backgroundColor: "#de4a4a",
            color: "white",
            padding: 4,
            margin: 4,
            borderRadius: 4,
            fontSize: 11
        }

        return (
            <Fragment>
                <Typography variant={"h3"} align={"center"}>Dev Challenge</Typography>
                <Typography variant={"h4"} align={"center"}>Sign Up</Typography>
                <form>
                    <TextField
                        value={this.state.username}
                        placeholder={"Username"}
                        variant={"filled"}
                        style={{float: "left", padding: 8}}
                        name={"username"}
                        id={"username"}
                        fullWidth={true}
                        onChange={this.handleInputChange}
                    />
                    <TextField
                        value={this.state.email}
                        placeholder={"Email"}
                        variant={"filled"}
                        style={{float: "right", padding: 8}}
                        name={"email"}
                        id={"email"}
                        fullWidth={true}
                        onChange={this.handleInputChange}
                    />
                    <br/>
                    <TextField
                        value={this.state.password}
                        placeholder={"Password"}
                        variant={"filled"}
                        style={{float: "left", padding: 8}}
                        name={"password"}
                        id={"password"}
                        type="password"
                        fullWidth={true}
                        onChange={this.handleInputChange}
                    />
                    <TextField
                        value={this.state.password_repeat}
                        placeholder={"Confirm Password"}
                        variant={"filled"}
                        style={{float: "right", padding: 8}}
                        id={"password_repeat"}
                        name={"password_repeat"}
                        type="password"
                        fullWidth={true}
                        onChange={this.handleInputChange}
                    />
                    <br/>
                    <br/>

                    <Button fullWidth style={{marginTop: 16}} onClick={this.onSubmit} variant={"contained"}
                            color={"primary"}> Sign Up</Button>

                    {this.props.signUpError == "" ? (null) : (<Typography color={"error"} align={"center"}
                                                                          style={errorStyle}>{this.props.signUpError}</Typography>)}
                    <Button style={{marginTop: 16}} color={"secondary"} variant={"outlined"}
                            onClick={() => this.props.setLoginScreen("SIGNIN")}>Back</Button>
                </form>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    signUpError: state.userR.signUpError

});


const mapDispatch = {
    setLoginScreen,
    signup
}

export default connect(mapStateToProps, mapDispatch)(withTheme(SignUp));
