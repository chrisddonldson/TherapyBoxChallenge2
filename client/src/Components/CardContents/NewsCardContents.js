import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import {setNewsModal, setupNews} from "../../actions/placeholderActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({});

class NewsCardContents extends Component {
    constructor(props) {
        super(props)
        this.handleClose = this.handleClose.bind(this)
    }

    componentDidMount() {
        this.props.setupNews()

    }

    handleClose() {
        this.props.setNewsModal(false)

    }

    render() {
        const {classes} = this.props;
        console.log("news loading" + this.props.isNewsLoading)
        let container = {
            width: "100%",
            height: 200,
        }

        let imageContainer = {}
        if (!this.props.isNewsLoading) {
            imageContainer = {
                position: "relative",
                margin: "0 auto",
                background: "url(" + this.props.news.imgs + ") no-repeat center center",
                backgroundSize: "cover",
                maxWidth: "100%",
                width: "100%",
                height: "100%",

            }
        }
        return (

            (this.props.isNewsLoading ? (

                <Grid container justify="center"
                      alignItems="center" style={{height: 360}}>
                    <Grid item>
                        <CircularProgress/>
                    </Grid>
                </Grid>

            ) : (

                <Fragment>
                    <Dialog
                        open={this.props.isNewsModalOpen}
                        onClose={this.handleClose}
                        style={{outline: "none", paddingTop:32, paddingBottom:32}}
                    >
                        <Container style={{marginTop:32, marginBottom:32}}>
                            {/*<img src={this.props.news.imgs} style={{width: 200, height: "auto"}}/>*/}
                            <Typography variant={"h3"}>{this.props.news.items[0].title}</Typography>
                            <div style={container}>
                                <img style={imageContainer}></img>
                            </div>


                            <Typography variant={"body1"}>{this.props.news.items[0].content}</Typography>
                            <Typography variant={"subtitle1"}>Read more at: <a href={this.props.news.items[0].link}>{this.props.news.items[0].link}</a></Typography>


                        </Container>
                    </Dialog>
                    <div style={container}>
                        <img style={imageContainer}></img>
                    </div>
                    {/*<img src={this.props.news.imgs} style={{width: 200, height: "auto"}}/>*/}
                    <Typography variant={"h6"}>{this.props.news.items[0].title}</Typography>
                    <Typography variant={"subtitle1"} style={{fontSize: 10}}><a
                        href={this.props.news.items[0].link}>{this.props.news.items[0].link}</a></Typography>
                    <Typography variant={"body1"}>{this.props.news.items[0].content}</Typography>
                    <Button onClick={() => this.props.setNewsModal(true)}>Read More</Button>
                </Fragment>
            ))

        )
    }
}

const mapStateToProps = state => ({
    news: state.placeholderR.news,
    isNewsLoading: state.placeholderR.isNewsLoading,
    isNewsModalOpen: state.placeholderR.isNewsModalOpen,

});


const mapDispatch = {
    setupNews,
    setNewsModal
}

export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(NewsCardContents));
