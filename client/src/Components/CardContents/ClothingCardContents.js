import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import {setupClothing} from "../../actions/appActions";
import drawPieChart from "./piechart";
import Typography from "@material-ui/core/Typography";
import {capitalize} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import withTheme from "@material-ui/core/styles/withTheme";

const styles = theme => ({});

class ClothingCardContents extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

        this.props.setupClothing()
        if (!this.props.isClothesLoading) {
            drawPieChart(this.props);
        }

    }

    componentDidUpdate() {
        if (!this.props.isClothesLoading) {
            drawPieChart(this.props);
        }
    }

    render() {
        const {classes, theme} = this.props;

        return (
            (this.props.isClothesLoading ? (
                <Grid container justify="center"
                      alignItems="center" style={{height: 360}}>
                    <Grid item>
                        <CircularProgress/>
                    </Grid>
                </Grid>
            ) : (

                <Fragment>
                    <div style={{float:"left", display:"inline-block"}}>   {this.props.clothesCounted.map(v => {
                        let opac = ((v.count - 140) / 100) * 1.4
                        return <Typography
                            variant={"body2"}
                            key={v.name}
                            style={{
                                display: "inline-blocks",
                                border: "2px solid rgb(148,227,198)",
                                height: 30,
                                width: 100,
                                margin: 4,
                                padding: 5,
                                color: "#2a8282",
                                backgroundColor: "rgba(148, 227, 198, " + opac + ")",
                                fontWeight: "bold",
                                borderRadius: 4,
                            }}>
                            {capitalize(v.name)}:{v.count}
                        </Typography>
                    })}</div>


                    <div className={"pie"} style={{

                        float: "right",
                        display: "inline-block"
                    }}></div>

                </Fragment>
            ))

        )
    }
}

const mapStateToProps = state => ({
    clothes: state.appR.clothes,
    isClothesLoading: state.appR.isClothesLoading,
    clothesCounted: state.appR.clothesCounted,
});


const mapDispatch = {
    setupClothing,

}

export default connect(mapStateToProps, mapDispatch)(withTheme(ClothingCardContents));
