import React, {Component, Fragment} from "react";
import {connect} from "react-redux";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import withTheme from "@material-ui/core/styles/withTheme";
import {setSelectedToDo, setToDoDialog, submitCompleted, submitNotes, submitTitle} from "../../actions/appActions";
import styled from "@material-ui/core/styles/styled";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";


const HiddenTextField = styled(({...rest}) => (
    <TextField {...rest}/>
))`
  .label {
    color: red;
  }  
`


class TodoItem extends Component {
    constructor(props) {
        super(props)

        this.handleMouseEnter = this.handleMouseEnter.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
        this.handleTitleOnChange = this.handleTitleOnChange.bind(this)
        this.handleNotesOnChange = this.handleNotesOnChange.bind(this)
        this.handleTitleSubmission = this.handleTitleSubmission.bind(this)
        this.handleNotesSubmission = this.handleNotesSubmission.bind(this)
        this.handleCompletedSubmission = this.handleCompletedSubmission.bind(this)
        this.handleTitleOnKeyDown = this.handleTitleOnKeyDown.bind(this)
        this.handleNotesOnKeyDown = this.handleNotesOnKeyDown.bind(this)
        this.handleClick = this.handleClick.bind(this)

        this.state = {
            isHover: false,
            title: "",
            notes: "",
            completed: false
        }
    }

    componentDidMount() {
        let title = this.props.todo.title
        let notes = this.props.todo.notes
        let completed = this.props.todo.completed
        this.setState({
            title: title,
            notes: notes,
            completed: completed,
        })
    }

    handleTitleOnChange(event) {
        this.setState({title: event.target.value})
    }

    handleNotesOnChange(event) {
        this.setState({notes: event.target.value})
    }

    handleTitleOnKeyDown(e) {

        if (e.keyCode == 13) {
            console.log('title', e.target.value);
            this.handleTitleSubmission(e)
        }
    }

    handleNotesOnKeyDown(e) {

        if (e.keyCode == 13) {
            console.log('Notes', e.target.value);
            this.handleNotesSubmission(e)
        }
    }

    handleTitleSubmission() {
        let data = {
            title: this.state.title,
            _id: this.props.todo._id
        }
        console.log("new title submission from " + this.props.todo._id + " " + this.state.tile)
        this.props.submitTitle(data)
    }

    handleNotesSubmission() {
        let data = {
            notes: this.state.notes,
            _id: this.props.todo._id
        }
        console.log("new notes submission from " + this.props.todo._id + " " + this.state.notes)
        this.props.submitNotes(data)
    }

    handleCompletedSubmission(e) {
        this.setState({completed: e.target.checked,})
        let data = {
            completed: e.target.checked,
            _id: this.props.todo._id
        }
        console.log(e)
        console.log("new completed submission from " + this.props.todo._id + " " + e.target.checked)
        this.props.submitCompleted(data)
    }

    handleMouseEnter() {
        this.setState({
            isHover: true
        })
    }

    handleMouseLeave() {
        this.setState({
            isHover: false
        })
    }

    handleClick() {
        this.props.setSelectedToDo(this.props.todo)
    }

    render() {
        const {theme} = this.props;
        let blockColor = "#fff"
        let topBorderColor = theme.palette.primary.main
        console.log(this.props.dashboardScreen)

        let toDoWidth = this.props.dashboardScreen === "TODO" ? ("80%") : ("70%")
        if (this.state.isHover) {
            blockColor = "#ececec"
            topBorderColor = theme.palette.primary.light
        }
        if (this.props.selectedToDo == this.props.todo) {
            blockColor = "#cffafa"
            topBorderColor = theme.palette.secondary.main
        }
        if (this.props.selectedToDo == this.props.todo && this.state.isHover) {
            blockColor = "#cff6f6"
            topBorderColor = theme.palette.secondary.light
        }


        let blockStyle = {
            display: "inline-block",
            width: "100%",
            backgroundColor: blockColor,
            marginBottom: 8,
            borderTop: "2px solid " + topBorderColor,
            borderBottom: "2px solid " + topBorderColor,
            borderRight: "2px solid " + topBorderColor,
            borderLeft: "8px solid " + topBorderColor
        }

        return (
            <div onMouseEnter={this.handleMouseEnter}
                 onMouseLeave={this.handleMouseLeave}
                 onClick={this.handleClick}
                 style={blockStyle}>

                <HiddenTextField onChange={this.handleTitleOnChange}
                                 onKeyDown={this.handleTitleOnKeyDown} fullWidth value={this.state.title}

                                 style={{
                                     display: "inline-block",
                                     width: toDoWidth,
                                     marginLeft: 4,

                                 }}>{this.props.todo.title}</HiddenTextField>

            <br/>
                <HiddenTextField value={this.state.notes} onChange={this.handleNotesOnChange}
                                 onKeyDown={this.handleNotesOnKeyDown} fullWidth
                                 style={{
                                     display: "inline-block",
                                     marginLeft: 4,
                                     paddingTop: 8,
                                     width: toDoWidth
                                 }}>{this.props.todo.notes}</HiddenTextField>


                        <Checkbox
                            checked={this.state.completed}
                            onChange={this.handleCompletedSubmission}
                            style={{display: "inline-block", float: "right"}}
                            name="checkedB"
                            color="secondary"
                        />

            </div>
        )
    }
}

const mapStateToProps = state => ({
    selectedToDo: state.appR.selectedToDo,

    isTitleSubmitting: state.appR.isTitleSubmitting,
    isNotesSubmitting: state.appR.isNotesSubmitting,
    isCompletedSubmitting: state.appR.isCompletedSubmitting,
    dashboardScreen: state.appR.dashboardScreen,
});


const mapDispatch = {
    setSelectedToDo,
    submitTitle,
    submitNotes,
    submitCompleted

}

export default connect(mapStateToProps, mapDispatch)(withTheme(TodoItem));
