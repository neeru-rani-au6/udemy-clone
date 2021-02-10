import React, { Component } from 'react';
import Header from './header';
import { currentVideo } from '../redux/actions/video';
import { connect } from 'react-redux';

class videoDetail extends Component {
    async componentDidMount() {
        await this.props.currentVideo(this.props.match.params.id);
        console.log(this.props.Video);
    }
    render() {
        return (
            <div>
                <Header />
                {this.props.Video ?
                    <div style={{ margin: "30px" }}>
                        <video controls width="100%" height="500" src={this.props.Video.videoUrl}>
                        </video>
                        <h2 style={{ textAlign: "center" }}>
                            {this.props.Video.title}
                        </h2>
                    </div>
                    : <h1>loading video...</h1>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        Video: state.videoReducer.currentPost
    }
}

export default connect(mapStateToProps, { currentVideo })(videoDetail);