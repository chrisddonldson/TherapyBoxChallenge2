import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import Container from "@material-ui/core/Container";
import {setDashboardScreen, submitCompleted, submitNotes, submitTitle} from "../../actions/appActions";
import ToDoCardContents from "../CardContents/ToDoCardContents";
import Typography from "@material-ui/core/Typography";
import withTheme from "@material-ui/core/styles/withTheme";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {IconButton} from '@material-ui/core';

const styles = theme => ({});

class ToDoListPage extends Component {
    constructor(props) {
        super(props)
        this.handleBack = this.handleBack.bind(this)
    }

    componentDidMount() {
    }

    handleBack() {
        console.log("Back")
        this.props.setDashboardScreen("DASHBOARD")
    }

    render() {
        const {theme} = this.props;

        return (
            <Container style={{marginTop: 16}}>
                <div style={{backgroundColor: "#FFFFFF", width: "100%", borderRadius: 4}}>


                    <Typography variant={"h4"} style={{
                        backgroundColor: theme.palette.primary.light,
                        display: "inline-block",
                        width: "100%",
                        height: 43,
                        zIndex: 10,
                        marginBottom: 16,
                        color: "white",
                        fontWeight: "bold",
                        paddingBottom: 16
                    }}>
                        <IconButton color={"secondary"} onClick={this.handleBack} style={{position:"relative", top:-3}}>
                            <ArrowBackIcon />
                        </IconButton>To Do List</Typography>
                    <div style={{padding: 8}}>
                        <ToDoCardContents/>
                    </div>
                </div>
            </Container>
        )
    }
}

const mapStateToProps = state => ({});


const mapDispatch = {
    setDashboardScreen,

}

export default connect(mapStateToProps, mapDispatch)(withTheme(ToDoListPage));
