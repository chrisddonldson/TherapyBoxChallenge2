import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const styles = theme => ({});

class TodoItem extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        const {classes} = this.props;

        return (
            <div style={{display: "inline-block", width: "100%", backgroundColor: "#f3f3f2", marginBottom:8, borderTop:"2px solid " + "#92ec89"}}>
                <Typography variant={"h6"} style={{display: "inline-block",  width:"100%", marginLeft:4}}>{this.props.todo.title}</Typography>
                <Typography style={{display: "inline-block" ,  marginLeft:4, paddingTop:8}}>{this.props.todo.notes}</Typography>
                <FormControlLabel
                    style={{display: "inline-block", float:"right"}}
                    control={
                        <Checkbox
                            checked={this.props.todo.completed}
                            onChange={() => console.log("change")}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Completed?"
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({});


const mapDispatch = {}

export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(TodoItem));
