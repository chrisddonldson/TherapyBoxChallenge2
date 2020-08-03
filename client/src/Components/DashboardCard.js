import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({});

class DashboardCard extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    render() {
        const {classes} = this.props;

        return (
            <Grid item style={{
                height: this.props.height,
                overflow:"hidden",
                paddingTop:16
            }}>
                <div style={{
                    backgroundColor: "#FFFFFF",
                    width: "100%",
                    borderRadius: 4,
                    overflow: "hidden",
                }}>
                    <Typography variant={"h6"} style={{
                        backgroundColor: "#5cac9c",
                        display: "inline-block",
                        width: "100%",
                        height: 36,
                        paddingLeft: 8,
                        zIndex: 10,
                        marginBottom: -4,
                        color:"white",
                        fontWeight:"bold",
                        paddingBottom:4
                    }}>{this.props.title}</Typography>
                    <div style={{
                        display: "inline-block",
                        backgroundColor: "#FFFFFF",
                        width: "100%",
                        padding: 8,
                        zIndex: -10,
                    }}>
                        {this.props.content}
                    </div>
                </div>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({});


const mapDispatch = {}

export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(DashboardCard));
