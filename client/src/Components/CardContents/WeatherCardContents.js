import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import withTheme from "@material-ui/core/styles/withTheme";

const styles = theme => ({});

class WeatherCardContents extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        const { weather, theme} = this.props;

        return (
            <Fragment>
                {this.props.isWeatherLoading ? (
                    <Grid container justify="center"
                          alignItems="center" style={{height: 360}}>
                        <Grid item>
                            <CircularProgress/>
                        </Grid>
                    </Grid>
                ) : (
                    <Fragment>
                        <div style={{float: "left"}}>
                            <Typography variant={"h5"} style={{color:"#313131"}}>{weather.name}</Typography>
                            <Typography variant={"h6"} style={{color:"#5c5c5c"}}>Current Temp: {(weather.main.temp - 273.15).toFixed(1)}°c</Typography>
                        </div>

                        <img src={"http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"}
                             style={{float: "right", width: 80,backgroundColor: theme.palette.primary.light, borderRadius:4}}/>
                    </Fragment>
                )}


            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    weather: state.appR.weather,
    isWeatherLoading: state.appR.isWeatherLoading
});


const mapDispatch = {}

export default connect(mapStateToProps, mapDispatch)(withTheme(WeatherCardContents));
