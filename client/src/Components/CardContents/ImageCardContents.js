import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import Container from "@material-ui/core/Container";

import Button from "@material-ui/core/Button";
import {postImage, setImageModalOpen, setupImages} from "../../actions/appActions";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({});

class ImageCardContents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            file: "",
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        this.props.setupImages(this.props.userId)
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.postImage({file: this.state.file, userId: this.props.userId})

    }

    handleClose() {
        this.props.setImageModalOpen(false)
    }

    onChange(event) {
        console.log(event.target.files[0])
        this.setState({file: event.target.files[0]})
    }

    render() {
        const {classes} = this.props;

        return (
            <Fragment>
                <Dialog
                    open={this.props.isImageModalOpen}
                    onClose={this.handleClose}
                    style={{outline: "none", paddingTop: 32, paddingBottom: 32}}
                >
                    <Container style={{marginTop: 32, marginBottom: 32}}>
                        <form onSubmit={this.handleSubmit}>
                            <input type={"file"} id={"imagePost"} name={"imagePost"} onChange={this.onChange}/>
                            {this.props.images.length > 0 ? (
                                this.props.images.map((item, i) =>{
                                    return <img key={item.image_sm_loc} src={item.image_sm_loc} style={{float:"left"}}/>
                                }
                            )) : (null)}
                            <Button type={"submit"} variant={"outlined"}>Upload file</Button>
                            {this.props.isPostingImage ? (
                                <CircularProgress/>
                            ) : (
                                null
                            )}
                        </form>
                    </Container>
                </Dialog>
                {this.props.isGettingImages ? (
                    <Grid container justify="center"
                          alignItems="center" style={{height: 360}}>
                        <Grid item>
                            <CircularProgress/>
                        </Grid>
                    </Grid>) : (
                    <Fragment>

                        {this.props.images.length > 0 ? (<img src={this.props.images[this.props.images.length-1].image_sm_loc} style={{ marginLeft:"auto", marginRight:"auto", display:"block"}}/>) : (null)}
                        <br/>
                         <Button onClick={() => this.props.setImageModalOpen(true)} style={{marginTop:8}} fullWidth variant={"outlined"} color={"secondary"}>
                            View images
                        </Button>
                    </Fragment>)
                }

            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isImageModalOpen: state.appR.isImageModalOpen,
    isGettingImages: state.appR.isGettingImages,
    userId: state.userR.userId,
    isPostingImage: state.appR.isPostingImage,
    images: state.appR.images,

});


const mapDispatch = {
    setImageModalOpen,
    setupImages,
    postImage,

}

export default connect(mapStateToProps, mapDispatch)(withStyles(styles)(ImageCardContents));
