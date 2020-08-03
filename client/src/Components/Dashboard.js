import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import DashboardCard from "./DashboardCard";
import {getWeather, logout, setupDashboard, setupNews, testReducer} from "../actions/placeholderActions";
import WeatherCardContents from "./CardContents/WeatherCardContents";
import NewsCardContents from "./CardContents/NewsCardContents";
import SportsCardContents from "./CardContents/SportsCardContents";
import ImageCardContents from "./CardContents/ImageCardContents";
import ToDoCardContents from "./CardContents/ToDoCardContents";
import ClothingCardContents from "./CardContents/ClothingCardContents";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

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
        let itemStyle = {
            backgroundColor: "#FFFFFF",
            borderRadius: 2,
            height: 300,
        }
        let lowerColor = "rgb(44,137,137)"
        return (<Fragment>
                <Grid container style={{
                     WebkitBoxShadow: " 0px 0px 18px -5px rgba(0,0,0,0.67)",
                        MozBoxShadow: "0px 0px 18px -5px rgba(0,0,0,0.67)",
                        boxShadow: " 0px 0px 18px -5px rgba(0,0,0,0.67)",
                }}>

                    <Grid item xs={12} style={{
                        backgroundColor: "#FFFFFF",
                        WebkitBoxShadow: " 0px 0px 18px -5px rgba(0,0,0,0.67)",
                        MozBoxShadow: "0px 0px 18px -5px rgba(0,0,0,0.67)",
                        boxShadow: " 0px 0px 18px -5px rgba(0,0,0,0.67)",
                    }}>
                        <Typography variant={"h4"} align={"center"}
                                    style={{
                                        color: "#2a2a2a",
                                        paddingTop: 16,
                                        paddingBottom: 18
                                    }}>Good
                            Day, {this.props.username}
                        </Typography></Grid>
                    <Grid item xs={4} style={{backgroundColor: lowerColor}}>
                        <Button
                            style={{
                                backgroundColor: lowerColor,
                                color: "white",
                                borderColor: "white",
                                margin: 4,
                                float:"left"}}
                            onClick={() => (this.props.logout())}
                            size={"small"}
                            variant={"outlined"}
                        >Logout</Button>

                    </Grid>
                    <Grid item xs={4} style={{backgroundColor: lowerColor}}><Typography align={"center"} style={{
                        paddingTop: 7,
                        color: "white"
                    }}>Welcome to your
                        dashboard.</Typography>
                    </Grid>
                    <Grid item xs={4} style={{backgroundColor: lowerColor}}></Grid>

                </Grid>
                <Container maxWidth={"md"}>

                    {/*<div style={{width:100, height:100, backgroundColor:"#a33333"}}></div>*/}
                    <Grid container>
                        <Grid xs={12} sm={6} item container direction="column"
                              style={{
                                  // border: "1px solid red",
                                  paddingLeft: 8,
                                  paddingRight: 8
                              }}>
                            <DashboardCard
                                title={"Weather"}
                                content={<WeatherCardContents/>}

                            />
                            <DashboardCard title={"Sports"} content={<SportsCardContents/>}
                            />
                                 <DashboardCard title={"Tasks"}
                                           content={<ToDoCardContents/>}
                            />
                            <DashboardCard title={"Clothes"} content={<ClothingCardContents/>}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} container direction={"column"} style={{
                            // border: "1px solid green",
                            paddingLeft: 8,
                            paddingRight: 8

                        }}>
                            <DashboardCard title={"News"} content={<NewsCardContents/>}
                            />
                            <DashboardCard title={"Photos"}
                                           content={<ImageCardContents/>}
                            />


                        </Grid>
                    </Grid>
                </Container>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    test: state.placeholderR.test,
    username: state.placeholderR.username
});


const mapDispatch = {
    testReducer,
    setupDashboard,
    getWeather,
    setupNews,
    logout
}

export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(Dashboard));
