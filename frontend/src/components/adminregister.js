import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { registerAdmin } from '../redux/actions/admin';
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

export default function Register(props) {
    const classes = useStyles();
    const user = useSelector(state => state.userState);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        Name: "",
        email: "",
        password: "",
        isSubmitting: false,
        error: ''
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
        await dispatch(registerAdmin(state));
        setState({ ...state, isSubmitting: false });
        console.log(user.error)
        if (!user.error) {
            props.history.push('/login');
        }
    }
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Register
          </Typography>
                    <Grid container style={{ display: "flex" }}>
                        <Grid item style={{ margin: "20px" }}>
                            <Link href="/#/Register"> Register as a  User
                            </Link>
                        </Grid>
                    </Grid>
                    <form onSubmit={handleSubmit} className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="Name"
                            label="Name"
                            name="Name"
                            autoComplete="Name"
                            autoFocus
                            onChange={(e) => handleChange("Name", e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
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
                            Register
            </Button>
                        <Grid container>
                            <Grid item>
                                Already have an account?
                                <Link href="/#/adminLogin" variant="body2">
                                    {"Login"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}