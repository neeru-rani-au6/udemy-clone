import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/user';
import { withRouter } from 'react-router-dom';
import Link from '@material-ui/core/Link';

class videoDetails extends Component {
    logoutUser = async () => {
        await this.props.logout();
        this.props.history.push("/login");
    }
    render() {
        return (
            <div>
                <AppBar position="static" style={{ flexGrow: "1" }}>
                    <Toolbar>
                        <IconButton edge="start" style={{ marginRight: "2rem" }} color="inherit" aria-label="menu">
                            <Link href="/#/" style={{ color: "white" }}>
                                <LocalLibraryIcon />
                            </Link>
                        </IconButton>
                        <Typography variant="h6" style={{ flexGrow: "1" }}>
                            Udemy
          </Typography>
                        <Link href="/#/post" style={{ color: "white" }}>PostVideo</Link>
                        <Button color="inherit" onClick={this.logoutUser}>Logout</Button>

                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userState
    }
}
export default connect(mapStateToProps, { logout })(withRouter(videoDetails));