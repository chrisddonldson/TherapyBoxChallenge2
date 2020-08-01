import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = theme => ({});

class SignUp extends Component {   constructor(props) {
       super(props)
      }
   componentDidMount() {}
     render() {
         const {classes} = this.props;

         return (
                              <Fragment>
                <Typography variant={"h3"} align={"center"}>Dev Challenge</Typography>
                <Typography variant={"h4"} align={"center"}>Sign Up</Typography>
                <form>
                    <TextField placeholder={"Username"} variant={"filled"} style={{float: "left", padding: 8}}/>
                    <TextField placeholder={"Email"} variant={"filled"} style={{float: "right", padding: 8}}/><br/>
                    <TextField placeholder={"Password"} variant={"filled"} style={{float: "left", padding: 8}}/>
                    <TextField placeholder={"Confirm Password"} variant={"filled"}
                               style={{float: "right", padding: 8}}/>
                    <br/>
                    <input type="file" name="fileToUpload" id="fileToUpload"/>

                    <br/>
                    <Button fullWidth style={{marginTop: 16}}> Sign Up</Button>
                    <Button style={{marginTop: 16}} onClick={() => console.log("Back")}>Back</Button>
                </form>
            </Fragment>
         )
     }
 }

 const mapStateToProps = state => ({

 });


 const mapDispatch = {

 }

 export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(SignUp));
