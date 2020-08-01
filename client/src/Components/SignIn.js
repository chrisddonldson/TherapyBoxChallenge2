import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = theme => ({});

class SignIn extends Component {   constructor(props) {
       super(props)
      }
   componentDidMount() {}
     render() {
         const {classes} = this.props;

         return (

            <Fragment>
                <Typography variant={"h3"} align={"center"}>Dev Challenge</Typography>
                <Typography variant={"h3"} align={"center"}>Sign In</Typography>
                <TextField placeholder={"Username"} variant={"filled"} style={{float: "left", padding: 8}}/>
                <TextField placeholder={"Password"} variant={"filled"} style={{float: "right", padding: 8}}/>
                <br/>
                <Button fullWidth style={{marginTop: 16}}> Login</Button>
                <Typography style={{
                    marginTop: 16,
                    marginLeft: "auto",
                    marginRight: "auto"
                }} align={"center"}> New to the challenge? <a href={"/signup"}>Sign Up</a>
                </Typography>
            </Fragment>
        )

     }
 }

 const mapStateToProps = state => ({

 });


 const mapDispatch = {

 }

 export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(SignIn));
