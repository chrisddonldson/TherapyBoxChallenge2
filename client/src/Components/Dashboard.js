import React, {Component} from "react";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import DashboardCard from "./DashboardCard";
import {getWeather, logout, setupDashboard, setupNews} from "../actions/appActions";
import WeatherCardContents from "./CardContents/WeatherCardContents";
import NewsCardContents from "./CardContents/NewsCardContents";
import SportsCardContents from "./CardContents/SportsCardContents";
import ImageCardContents from "./CardContents/ImageCardContents";
import ToDoCardContents from "./CardContents/ToDoCardContents";
import ClothingCardContents from "./CardContents/ClothingCardContents";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import capitalize from "@material-ui/core/utils/capitalize";
import withTheme from "@material-ui/core/styles/withTheme";
import ToDoListPage from "./todo/ToDoListPage";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';



const styles = theme => ({});

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.getDashboard = this.getDashboard.bind(this)
        this.getToDoPage = this.getToDoPage.bind(this)
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

    getDashboard() {
        return (<Grid container>
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
                <DashboardCard title={"Sports"} content={<SportsCardContents/>}
                />
                <DashboardCard title={"News"} content={<NewsCardContents/>}
                />
                <DashboardCard title={"Photos"}
                               content={<ImageCardContents/>}
                />
            </Grid>
        </Grid>)
    }

    getToDoPage() {
        return (
            <ToDoListPage/>
        )
    }

    render() {
        let {theme} = this.props
        console.log(theme)
        let lowerColor = theme.palette.primary.main
        return (<div style={{
                backgroundColor: theme.palette.primary.dark,
                backgroundImage: "url('./layout_pattern.png')",
                backgroundRepeat: "repeat"
            }}
            >
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
                            Day, {capitalize(this.props.username)}
                        </Typography></Grid>
                    <Grid item xs={4} style={{backgroundColor: lowerColor}}>

                    </Grid>

                    <Grid item xs={4} style={{backgroundColor: lowerColor}}>

                    </Grid>


                    <Grid item xs={4} style={{backgroundColor: lowerColor}}>
                        <Button
                            style={{
                                backgroundColor: lowerColor,
                                color: "white",
                                borderColor: "white",
                                margin: 4,
                                float: "left"
                            }}
                            onClick={() => (this.props.logout())}
                            size={"small"}
                            variant={"outlined"}
                        >Logout<ExitToAppIcon style={{marginLeft: 6}}/> </Button>

                    </Grid>

                </Grid>
                <Container maxWidth={"md"}>
                    {this.props.dashboardScreen === "DASHBOARD" ? (this.getDashboard()) : (null)}
                    {this.props.dashboardScreen === "TODO" ? (this.getToDoPage()) : (null)}
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({

    username: state.userR.username,
    dashboardScreen: state.appR.dashboardScreen,
});


const mapDispatch = {

    setupDashboard,
    getWeather,
    setupNews,
    logout
}

export default connect(mapStateToProps, mapDispatch)(withTheme(Dashboard));
