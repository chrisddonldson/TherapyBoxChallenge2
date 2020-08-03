import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import {getToDos} from "../../actions/placeholderActions";

const styles = theme => ({});

class ToDoCardContents extends Component {
    constructor(props) {
       super(props)
      }
   componentDidMount() {
    this.props.getToDos(this.props.userId)

   }
     render() {
         const {classes} = this.props;

         return (
                    <Fragment>
                    This
                    <Button>Open ToDo List</Button>
                    </Fragment>
         )
     }
 }

 const mapStateToProps = state => ({
    userId: state.placeholderR.userId
 });


 const mapDispatch = {
getToDos
 }

 export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(ToDoCardContents));
