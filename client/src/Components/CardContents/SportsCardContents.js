import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import {setIsTeamInspectorOpen, setSelectedTeam, setupSports} from "../../actions/placeholderActions";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({});

class SportsCardContents extends Component {
    constructor(props) {
        super(props)
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.props.setupSports()

    }

    handleClose() {
        this.props.setIsTeamInspectorOpen(false)
    }

    handleChange = (event) => {
        this.props.setSelectedTeam(event.target.value)
    };

    render() {
        const {classes} = this.props;

        return (
            (this.props.isSportsLoading ? (<p>Loading...</p>) : (

                <Fragment>

                    <Dialog
                        open={this.props.isTeamInspectorOpen}
                        onClose={this.handleClose}

                    >
                        <Container style={{padding: 16}}>
                            <Typography variant={"h6"}>Select team to view stats:</Typography>
                            <Select
                                value={this.props.selectedTeamValue}
                                onChange={this.handleChange}
                                style={{marginLeft:"auto", marginRight:"auto"}}
                            >
                                {this.props.teamsVictoryInfo.map((team, i)  => {
                                    return <MenuItem key={team.HomeTeam +   i}
                                                     value={team.HomeTeam}>{team.HomeTeam}</MenuItem>
                                })}
                            </Select>
                            <div style={{float: "right"}}>
                                <Typography variant={"h6"}>Victorious Against</Typography>
                                {this.props.selectedTeam.hasBeat.map((v,i) => {
                                    return <p style={{
                                        display: "inline-block",
                                        float: "left",
                                        padding: 4,
                                        margin: 4,
                                        backgroundColor: "#b0ceae",
                                        borderRadius: 2
                                    }} key={v+i}>{v}</p>
                                })}
                            </div>
                        </Container>
                    </Dialog>
                    <Typography>Currently Selected Team: <b>{this.props.selectedTeamValue}</b></Typography>
                    <Button onClick={() => this.props.setIsTeamInspectorOpen(true)}>Explore Stats</Button>
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
    selectedTeam: state.placeholderR.selectedTeam,
    selectedTeamValue: state.placeholderR.selectedTeamValue,

});


const mapDispatch = {
    setupSports, setIsTeamInspectorOpen,
    setSelectedTeam
}

export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(SportsCardContents));
