import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import {setupClothing} from "../actions/placeholderActions";
import drawPieChart from "./piechart";

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
                <Fragment>
                    Loading and counting clothes...
                </Fragment>
            ) : (

                <Fragment>
                    {this.props.clothesCounted.map(v => {
                        return <p key={v.name}>{v.name}:{v.count}</p>
                    })}
                    <div className={"pie"} > a</div>

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
