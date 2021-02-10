import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { loginUser } from '../redux/actions/user';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login() {
    const classes = useStyles();
    const user = useSelector(state => state.userState);
    const history = useHistory();
    const dispatch = useDispatch();
    const [state, setState] = useState({
        email: "",
        password: "",
        isSubmitting: false
    });

    const handleChange = (key, value) => {
        setState({
            ...state,
            [key]: value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setState({ ...state, isSubmitting: true });
        await dispatch(loginUser(state));
        setState({ ...state, isSubmitting: false });
        //console.log(user.error);
        if (!user.error) {
            history.push('/');
        }
    }
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Sign in
          </Typography>
                    <Grid container style={{ display: "flex" }}>
                        <Grid item style={{ margin: "20px" }}>
                            <Link href="/#/adminLogin"> Login as a  Admin
                            </Link>
                        </Grid>
                    </Grid>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={state.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={state.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                        />
                        {user.error &&
                            <Grid item xs={12} className="error">
                                <div className="error">{user.error}</div>
                            </Grid>
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={state.isSubmitting}
                        >
                            Login
            </Button>
                        <Grid container>
                            <Grid item>
                                Don't have an account?
                <Link href="/#/register" variant="body2">
                                    {"Register"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}