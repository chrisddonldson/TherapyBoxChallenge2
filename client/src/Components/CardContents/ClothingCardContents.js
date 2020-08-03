import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import {setupClothing} from "../../actions/placeholderActions";
import drawPieChart from "./piechart";
import Typography from "@material-ui/core/Typography";
import {capitalize} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

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
        const {classes} = this.props;

        return (
            (this.props.isClothesLoading ? (
                <Grid container  justify="center"
                    alignItems="center" style={{height:360}}>
                    <Grid item>
                    <CircularProgress />
                    </Grid>
                </Grid>
            ) : (

                <Fragment>
                    {this.props.clothesCounted.map(v => {
                        let opac = ((v.count-140)/100)*1.4
                        return <Typography
                            variant={"body2"}
                            key={v.name}
                                           style={{
                                               display: "inline-blocks",
                                               float:"left",
                                               border:"2px solid rgb(148,227,198)",
                                               height: 30,
                                               width: 100,
                                               margin: 4,
                                               padding:5,
                                               color: "#2a8282",
                                               backgroundColor:"rgba(148, 227, 198, "+ opac +")",
                                               fontWeight:"bold",
                                               borderRadius: 4,
                                           }}>
                            {capitalize(v.name)}:{v.count}
                        </Typography>
                    })}
                    <div className={"pie"} style={{width:"100%", float:"left", marginLeft:"auto", marginRight:"auto", display:"inline-block"}}> </div>

                </Fragment>
            ))

        )
    }
}

const mapStateToProps = state => ({
    clothes: state.placeholderR.clothes,
    isClothesLoading: state.placeholderR.isClothesLoading,
    clothesCounted: state.placeholderR.clothesCounted,
});


const mapDispatch = {
    setupClothing
}

export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(ClothingCardContents));
