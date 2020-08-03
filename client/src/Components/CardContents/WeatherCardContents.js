import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({});

class WeatherCardContents extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        const {classes, weather} = this.props;

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
                            <Typography varient={"h6"}>{weather.name}</Typography>
                            <Typography varient={"h6"}>{(weather.main.temp - 273.15).toFixed(1)}c</Typography>
                        </div>

                        <img src={"http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png"}
                             style={{float: "right", width: 80}}/>
                    </Fragment>
                )}


            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    weather: state.placeholderR.weather,
    isWeatherLoading: state.placeholderR.isWeatherLoading
});


const mapDispatch = {}

export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(WeatherCardContents));