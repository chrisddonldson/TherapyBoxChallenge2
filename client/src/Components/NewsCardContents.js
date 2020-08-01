import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import {setNewsModal, setupNews} from "../actions/placeholderActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

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
        return (

            (this.props.isNewsLoading ? (<p>loading...</p>) : (

                <Fragment>
                    <Modal
                        open={this.props.isNewsModalOpen}
                        onClose={this.handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <Container>
                            <Card><CardContent>
                                <Typography variant={"h6"}>{this.props.news.items[0].title}</Typography>
                                <Typography variant={"subtitle1"}>{this.props.news.items[0].link}</Typography>
                                <Typography variant={"body1"}>{this.props.news.items[0].content}</Typography>>

                            </CardContent></Card>
                        </Container>
                    </Modal>

                    <Typography variant={"h6"}>{this.props.news.items[0].title}</Typography>
                    <Typography variant={"subtitle1"}>{this.props.news.items[0].link}</Typography>
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
