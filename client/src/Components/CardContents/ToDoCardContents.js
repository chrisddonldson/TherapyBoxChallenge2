import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import {
    deleteToDo,
    getToDos,
    newToDo,
    setDashboardScreen,
    setToDoDialog,
    setToDoDialogMode
} from "../../actions/appActions";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import TodoItem from "../todo/TodoItem";
import Dialog from "@material-ui/core/Dialog";
import withTheme from "@material-ui/core/styles/withTheme";
import {capitalize} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import FullscreenIcon from '@material-ui/icons/Fullscreen';

const styles = theme => ({});

class ToDoCardContents extends Component {
    constructor(props) {
        super(props)
        this.handleFullScreen = this.handleFullScreen.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleNew = this.handleNew.bind(this)
        this.getFullScreenButton = this.getFullScreenButton.bind(this)
        this.handleDialogClose = this.handleDialogClose.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleNotesChange = this.handleNotesChange.bind(this)
        this.getDialogContent = this.getDialogContent.bind(this)
        this.handleSubmitNew = this.handleSubmitNew.bind(this)
        this.handleSubmitDelete = this.handleSubmitDelete.bind(this)

        this.state = {
            title: "",
            notes: ""
        }
    }

    componentDidMount() {
        this.props.getToDos(this.props.userId)

    }

    handleDialogClose() {
        this.props.setToDoDialog(false)
    }

    handleNew() {
        console.log("new")
        this.props.setToDoDialog(true)
        this.props.setToDoDialogMode("NEW")
    }

    handleSubmitDelete() {
        console.log("delete to do")
        this.props.deleteToDo({todoId: this.props.selectedToDo._id, userId: this.props.userId})

    }

    handleSubmitNew() {
        console.log("new to do")
        let data = {
            title: this.state.title,
            notes: this.state.notes,
            userId: this.props.userId
        }
        this.props.newToDo(data)
    }

    handleEdit() {
        console.log("edit")
        this.props.setToDoDialog(true)
        this.props.setToDoDialogMode("EDIT")
    }

    handleDelete() {
        console.log("delete")
        this.props.setToDoDialog(true)
        this.props.setToDoDialogMode("DELETE")
    }

    handleFullScreen() {
        console.log("full screen")
        this.props.setDashboardScreen("TODO")
    }


    handleTitleChange(event) {
        console.log(event)
        this.setState({title: event.target.value})
    }

    handleNotesChange(event) {
        console.log(event)
        this.setState({notes: event.target.value})
    }

    getFullScreenButton() {
        if (this.props.dashboardScreen === "DASHBOARD") {
            return (
                <IconButton
                    style={{float: "right"}}
                    color={"secondary"}
                    onClick={this.handleFullScreen}
                >
                    < FullscreenIcon/>
                </IconButton>)
        }
    }

    getDialogContent() {
        var string_copy = (' ' + this.props.toDoDialogMode).slice(1);
        console.log("Dialog mode: " + this.props.toDoDialogMode)
        if (this.props.toDoDialogMode.includes("NEW")) {
            return (<div style={{padding: 16}}>
                <Typography variant={"h6"}><AddCircleIcon color={"secondary"} style={{
                    position: "relative",
                    top: 5,
                    paddingRight: 8
                }}/>{capitalize(string_copy.toLowerCase()) + " To Do"}</Typography>
                <br/>
                <TextField value={this.state.title} placeholder={"Title"}
                           onChange={this.handleTitleChange} variant={"outlined"} size={"small"}
                           style={{marginBottom: 8}}/>
                <br/>
                <TextField value={this.state.notes} variant={"outlined"} placeholder={"Notes"} style={{marginBottom: 8}}
                           onChange={this.handleNotesChange} size={"small"}/>
                <br/>
                <Button color={"primary"} variant={"contained"} style={{marginRight: 8}}
                        onClick={this.handleSubmitNew}>Submit</Button>
                <Button variant={"contained"} onClick={this.handleDialogClose}>Cancel</Button>
                {this.props.isTitleSubmitting ? (<CircularProgress/>) : (null)}
            </div>)
        }
        if (this.props.toDoDialogMode.includes("DELETE")) {
            return (<div style={{padding: 16}}>
                    <Typography variant={"h6"}><DeleteIcon color={"secondary"} style={{
                        position: "relative",
                        top: 5,
                        paddingRight: 8
                    }}/>{capitalize(this.props.toDoDialogMode.toLowerCase())}</Typography>
                    <Typography>Are you sure you want to delete this todo?</Typography>
                    <br/>
                    <Button color={"primary"} variant={"contained"} style={{marginRight: 4}}
                            onClick={this.handleSubmitDelete}>Delete</Button>
                    <Button variant={"contained"} onClick={this.handleDialogClose}>Cancel</Button>
                    {this.props.isTitleSubmitting ? (<CircularProgress/>) : (null)}
                </div>

            )

        }
    }

    render() {
        const {theme} = this.props;
        let buttonStyle = {marginRight: 4, float: "left"}
        let selectionOnly = this.props.selectedToDo != null ? (false) : (true)
        return (
            <Fragment>
                <Dialog open={this.props.isToDoDialogOpen} onClose={this.handleDialogClose}>
                    {this.getDialogContent()}
                </Dialog>
                {this.props.isGettingToDos ? (
                    <Grid container justify="center"
                          alignItems="center" style={{height: 360}}>
                        <Grid item>
                            <CircularProgress/>
                        </Grid>
                    </Grid>
                ) : (
                    <Fragment>
                        <div style={{paddingBottom: 8}}>
                            <IconButton
                                style={buttonStyle}
                                color={"secondary"}
                                onClick={this.handleNew}>
                                <AddCircleIcon/>
                            </IconButton>
                            <IconButton
                                style={buttonStyle}

                                color={"secondary"}
                                onClick={this.handleDelete}
                                disabled={selectionOnly}
                            >
                                <DeleteIcon/>
                            </IconButton>
                            {this.props.isTitleSubmitting ? (<CircularProgress/>) : (null)}
                            {this.getFullScreenButton()}


                        </div>
                        <br/>
                        <div style={{
                            width: "100%",
                            height: this.props.dashboardScreen === "DASHBOARD" ? (260) : 700,
                            overflowY: "scroll",
                            overflowX: "hidden",

                            padding: 8
                        }}>
                            {this.props.toDos.length > 0 ? (
                                this.props.toDos.map(t => {
                                    return <TodoItem key={t._id} todo={t}/>
                                })
                            ) : (
                                <div style={{
                                    width: "100%",
                                    height: 240,
                                    backgroundColor: "#d2d2d2",
                                    textAlign: "center"
                                }}>
                                    <Typography style={{color: "#6d6d6d", paddingTop: 100}}>Nothing to do
                                        yet! </Typography>
                                    <Typography style={{color: "#6d6d6d",}}>Add a todo above</Typography>
                                </div>
                            )}
                        </div>
                    </Fragment>
                )}

            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    userId: state.userR.userId,
    isGettingToDos: state.appR.isGettingToDos,
    toDos: state.appR.toDos,
    isToDoDialogOpen: state.appR.isToDoDialogOpen,
    dashboardScreen: state.appR.dashboardScreen,
    toDoDialogMode: state.appR.toDoDialogMode,
    selectedToDo: state.appR.selectedToDo,
    toDoChangeSubmitting: state.appR.toDoChangeSubmitting,

});


const mapDispatch = {
    getToDos,
    setToDoDialog,
    setDashboardScreen,
    setToDoDialogMode,
    deleteToDo,
    newToDo

}

export default connect(mapStateToProps, mapDispatch)(withTheme(ToDoCardContents));
