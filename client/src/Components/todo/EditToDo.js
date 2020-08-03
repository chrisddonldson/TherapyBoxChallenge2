import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({});

class EditToDo extends Component {   constructor(props) {
       super(props)
      }
   componentDidMount() {}
     render() {
         const {classes} = this.props;

         return (
                    <Fragment>
                    this is the EditToDo component speaking!
                    </Fragment>
         )
     }
 }

 const mapStateToProps = state => ({

 });


 const mapDispatch = {

 }

 export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(EditToDo));
