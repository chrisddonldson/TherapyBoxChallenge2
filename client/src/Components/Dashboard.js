import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import DashboardCard from "./DashboardCard";
import {getWeather, setupDashboard, setupNews, testReducer} from "../actions/placeholderActions";
import WeatherCardContents from "./WeatherCardContents";
import NewsCardContents from "./NewsCardContents";
import SportsCardContents from "./SportsCardContents";
import ImageCardContents from "./ImageCardContents";
import ToDoCardContents from "./ToDoCardContents";
import ClothingCardContents from "./ClothingCardContents";

const styles = theme => ({});

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.setupDashboard()
        this.props.setupNews()
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position => this.props.getWeather(position)));
        } else {
            console.log("geolocation not supported")
        }
    }

    render() {
        const {classes} = this.props;

        let itemStyle = {
            backgroundColor: "#FFFFFF",
            borderRadius: 2,
            height: 300,
        }

        return (
            <Container style={{height: "100%"}}>
                <div>
                    <div style={{width: "100%", height: 80}}>
                        <Typography variant={"h4"} align={"center"}>Good Day, -username- </Typography>
                    </div>
                    <div style={{margin: "auto"}}>
                        <DashboardCard title={"Weather"}
                                       content={<WeatherCardContents/>}/>
                        <DashboardCard title={"News"} content={<NewsCardContents />}/>
                        <DashboardCard title={"Sports"} content={<SportsCardContents />}/>
                        <DashboardCard title={"Photos"}
                                       content={<ImageCardContents/>}/>
                        <DashboardCard title={"Tasks"}
                                       content={<ToDoCardContents />}/>
                        <DashboardCard title={"Clothes"} content={<ClothingCardContents/>}/>
                    </div>
                </div>
            </Container>

        )
    }
}

const mapStateToProps = state => ({
    test: state.placeholderR.test

});


const mapDispatch = {
    testReducer,
    setupDashboard,
    getWeather,
    setupNews
}

export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(Dashboard));
