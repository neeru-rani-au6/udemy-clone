import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import Header from './header';
import { allVideo } from '../redux/actions/video';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentDialog from './paymentDialog';
import { addVideoInUsersVideo } from '../redux/actions/user';
const promise = loadStripe("pk_test_51HSksKILMLU11Db4fvbJgBwvm7xYulVHvO3Mg4SquxQ1YHgI901VnOip66TJW4N6F74GOL20W3Vq3vVextqfGM4N00cUj6RdQ6");

class Home extends Component {
    state = {
        openDialog: false,
        selectedVideo: null,
        isSubmitting: null
    }
    async componentDidMount() {
        await this.props.allVideo();
    }
    closeDialog = async (success) => {
        if (success) {
            await this.props.addVideoInUsersVideo(this.state.selectedVideo._id);
        }
        await this.setState({ openDialog: false, selectedVideo: null });
    }
    showViewOrBuyButton = (card) => {
        const user = this.props.userState.user
        if (user && user.myVideos && user.myVideos.includes(card._id)) {
            return <Button variant="outlined" disabled={this.state.isSubmitting} size="small" color="primary" onClick={() => this.props.history.push('/post/' + card._id)}>
                View
        </Button>
        } else {
            return <Button size="small" variant="contained" color="primary" onClick={() => this.setState({ openDialog: true, selectedVideo: card })}>
                Buy now
    </Button>
        }
    }
    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <Header />
                <main>
                    <Container style={{ paddingTop: "3rem", paddingBottom: "8rem" }} maxWidth="md">
                        <Grid container spacing={4}>
                            {this.props.videoState.posts && this.props.videoState.posts.map((card) => (
                                <Grid item key={card._id} xs={12} sm={6} md={4}>
                                    <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                                        <video controls width="100%" height="160" src={card.videoUrl}>
                                        </video>
                                        <CardContent style={{ flexGrow: '1' }}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {card.title}
                                            </Typography>
                                            <Typography>
                                                {card.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions style={{ justifyContent: "space-around" }}>
                                            {this.showViewOrBuyButton(card)}

                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </main>
                {this.state.openDialog &&
                    <Elements stripe={promise}>
                        <PaymentDialog open={this.state.openDialog} close={this.closeDialog} title={this.state.selectedVideo.title} />
                    </Elements>
                }
            </React.Fragment >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        videoState: state.videoReducer,
        userState: state.userState
    }
}

export default connect(mapStateToProps, { allVideo, addVideoInUsersVideo })(Home);