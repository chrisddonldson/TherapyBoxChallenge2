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
            <div style={{display:"inline-block", width: 300, height:400 , backgroundColor: "#FFFFFF", borderRadius:4, padding: 8, float:"left", margin:16}}>
                <Typography variant={"h6"}>{this.props.title}</Typography>
                    {this.props.content}
            </div>
        )
    }
}

const mapStateToProps = state => ({});


const mapDispatch = {}

export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(DashboardCard));
