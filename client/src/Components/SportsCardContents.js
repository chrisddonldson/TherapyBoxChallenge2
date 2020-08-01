import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import {setupSports, setIsTeamInspectorOpen} from "../actions/placeholderActions";
import Modal from "@material-ui/core/Modal";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = theme => ({});

class SportsCardContents extends Component {
    constructor(props) {
        super(props)
        this.handleClose = this.handleClose.bind(this)
    }

    componentDidMount() {
        this.props.setupSports()

    }

    handleClose() {
        this.props.setIsTeamInspectorOpen(false)
    }

    render() {
        const {classes} = this.props;
        console.log(this.props.teamsVictoryInfo)
        return (
            (this.props.isSportsLoading ? (<p>Loading...</p>) : (
                <Fragment>
                    <Modal
                        open={this.props.isTeamInspectorOpen}
                        onClose={this.handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <Container>
                            <Card>
                                <CardContent>
                                    {/*make boolean for each of the other teams in the team*/}

                                </CardContent>
                            </Card>
                        </Container>
                    </Modal>
                    <Typography>- Selected team-</Typography>
                    <Button onClick={() => this.props.setIsTeamInspectorOpen(true)}>Team Inspector</Button>
                </Fragment>
            ))

        )
    }
}

const mapStateToProps = state => ({
    sports: state.placeholderR.sports,
    isSportsLoading: state.placeholderR.isSportsLoading,
    isTeamInspectorOpen: state.placeholderR.isTeamInspectorOpen,
    teamsVictoryInfo: state.placeholderR.teamsVictoryInfo,

});


const mapDispatch = {
    setupSports, setIsTeamInspectorOpen
}

export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(SportsCardContents));
