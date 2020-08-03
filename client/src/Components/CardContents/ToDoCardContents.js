import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import {getToDos} from "../../actions/placeholderActions";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TodoItem from "../todo/TodoItem";

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
        console.log(this.props.isGettingToDos)
        let exampleToDo = [
            {
                title: "Example to do",
                notes: "This is an example to do!",
                completed: false
            },
            {
                title: "Another example",
                notes: "A fine example of something to do!",
                completed: false
            },
            {
                title: "Thing to get done",
                notes: "Mustn't forget to complete",
                completed: false
            },
            {
                title: "Small thing to complete",
                notes: "Do the thing!",
                completed: false
            },
        ]
        return (
            <Fragment>
                {this.props.isGettingToDos ? (
                    <Grid container justify="center"
                          alignItems="center" style={{height: 360}}>
                        <Grid item>
                            <CircularProgress/>
                        </Grid>
                    </Grid>
                ) : (
                    <Fragment>
                        <div style={{paddingBottom:8}}>
                        <Button style={{marginRight: 4}} size={"small"}>New To Do</Button>
                        <Button style={{marginRight: 4}} size={"small"}>Edit</Button>
                        <Button style={{marginRight: 4}} size={"small"}>Delete</Button>
                        <Button style={{marginRight: 4}} size={"small"}>Full Screen</Button>
                            </div>
                        <div style={{
                            width: "100%",
                            height: 80,
                            border: "1px solid " + "#bababa",
                            overflowY: "scroll",
                            overflowX: "hidden",
                            padding: 8
                        }}>
                            <TodoItem todo={exampleToDo[0]}/>
                            <TodoItem todo={exampleToDo[1]}/>
                            <TodoItem todo={exampleToDo[2]}/>
                            <TodoItem todo={exampleToDo[3]}/>
                        </div>
                    </Fragment>
                )}

            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    userId: state.placeholderR.userId,
    isGettingToDos: state.placeholderR.isGettingToDos,
    toDos: state.placeholderR.toDos
});


const mapDispatch = {
    getToDos
}

export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(ToDoCardContents));
