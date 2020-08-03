import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {setLoginScreen, signup} from "../actions/placeholderActions";

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
        const {classes} = this.props;
        console.log(this.props.signUpError)
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

                        onChange={this.handleInputChange}
                    />
                    <TextField
                        value={this.state.email}
                        placeholder={"Email"}
                        variant={"filled"}
                        style={{float: "right", padding: 8}}
                        name={"email"}
                        id={"email"}
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
                        onChange={this.handleInputChange}
                    />
                    <br/>
                    <input type="file" name="fileToUpload" id="fileToUpload"/>
                    <br/>
                    <Typography color={"error"}>{this.props.signUpError}</Typography>
                    <Button fullWidth style={{marginTop: 16}} onClick={this.onSubmit}> Sign Up</Button>
                    <Button style={{marginTop: 16}} onClick={() => this.props.setLoginScreen("SIGNIN")}>Back</Button>
                </form>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    signUpError: state.placeholderR.signUpError

});


const mapDispatch = {
    setLoginScreen,
    signup
}

export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(SignUp));
