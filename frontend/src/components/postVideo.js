import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { videoPost } from '../redux/actions/video';
import { connect } from 'react-redux';
import { Button, Card, Grid } from '@material-ui/core';
import Header from './header';
class videoDetails extends Component {
    state = {
        videoUrl: "",
        title: "",
        description: "",
        isSubmitting: false
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        this.setState({ isSubmitting: true });
        // const formData = new FormData();
        // formData.append('file', this.state.file);
        // formData.append('Url', this.state.Url);
        // formData.append('title', this.state.title);
        // formData.append('description', this.state.description);
        // console.log(formData)
        await this.props.videoPost(this.state)
        this.setState({ isSubmitting: false });
        if (!this.props.videoPost.error) {
            this.props.history.push('/#/');
        }

    }
    async componentDidMount() {
        console.log(this.props)
    }
    handleChange = (event) => {
        // console.log(event.target.name, event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return (
            <div>
                <Header />
                {/* {this.props.user.role === admin} */}
                <form onSubmit={this.handleSubmit}>
                    <Card className="post-video-form">
                        <Grid container direction="column" justify="center" alignItems="center">
                            <Grid item md={6} sm={12}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="videoUrl"
                                    label="Url"
                                    name="videoUrl"
                                    autoComplete="Url"
                                    value={this.state.videoUrl}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item md={6} sm={12}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="Title"
                                    label="Title"
                                    name="title"
                                    autoComplete="Title"
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item md={6} sm={12}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="description"
                                    label="description"
                                    name="description"
                                    autoComplete="description"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                />
                            </Grid>
                            <Grid item md={6} sm={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={this.state.isSubmitting}
                                >
                                    Post
                            </Button>
                            </Grid>
                        </Grid>
                    </Card>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        posts: state.postReducer,
        user: state.userState
    }
}

export default connect(mapStateToProps, { videoPost })(videoDetails);