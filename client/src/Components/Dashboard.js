import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import DashboardCard from "./DashboardCard";

const styles = theme => ({});

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position => console.log(position)));
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
                                       content={<Fragment><p>weather icon</p><p>Temp</p><p>Location</p></Fragment>}/>
                        <DashboardCard title={"News"} content={<Fragment><p>Headline</p><p>Content</p></Fragment>}/>
                        <DashboardCard title={"Sports"} content={<Fragment><p>Headline</p><p>Content</p></Fragment>}/>
                        <DashboardCard title={"Photos"}
                                       content={<Fragment><p>photo1</p><p>photo2</p><p>photo3</p><p>photo4</p>
                                       </Fragment>}/>
                        <DashboardCard title={"Tasks"}
                                       content={<Fragment><p>task1</p><p>task2</p><p>task3</p></Fragment>}/>
                        <DashboardCard title={"Clothes"} content={<Fragment>Pie Chart :)</Fragment>}/>
                    </div>
                </div>
            </Container>

        )
    }
}

const mapStateToProps = state => ({});


const mapDispatch = {}

export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(Dashboard));
