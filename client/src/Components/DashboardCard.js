import React, {Component} from "react";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import withTheme from "@material-ui/core/styles/withTheme";

const styles = theme => ({});

class DashboardCard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {theme} = this.props;

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
                        backgroundColor: theme.palette.primary.light,
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

export default connect(mapStateToProps, mapDispatch)(withTheme(DashboardCard));
