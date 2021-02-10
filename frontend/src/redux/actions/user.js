import { REGISTER, LOGIN, LOGOUT, BUYVIDEO } from '../type';
import axios from 'axios';

export const registerUser = (user) => async dispatch => {
    console.log(user)
    try {
        const { data } = await axios({
            method: "post",
            url: '/users/register',
            data: user,
        }
        );
        // console.log(user, "1234")
        dispatch({
            type: REGISTER,
            payload: {
                error: null,
                info: data
            }
        })

    } catch (error) {
        //console.log(error.response.data)
        dispatch({
            type: REGISTER,
            payload: {
                error: error.response.data.error,
                info: null
            }
        })

    }
}

export const loginUser = (user) => async dispatch => {
    try {
        const { data } = await axios({
            method: "post",
            url: `/users/login`,
            data: {
                email: user.email,
                password: user.password
            }
        });
        //console.log(data, "dfhkgj ")
        dispatch({
            type: LOGIN,
            payload: { error: null, user: data, isAuthenticated: true }
        })
    } catch (error) {
        console.log(error.response.data)
        dispatch({
            type: LOGIN,
            payload: {
                error: error.response.data.error,
                info: null,
                isAuthenticated: false,
                user: null
            }
        })

    }
}


export const logout = () => async dispatch => {
    try {
        await axios({
            method: "delete",
            url: `/users/logout`
        });
        dispatch({
            type: LOGOUT,
            payload: null
        })
    } catch (error) {
        console.log(error)

    }
}


export const addVideoInUsersVideo = (videoId) => async dispatch => {
    try {
        await axios({
            method: "put",
            url: `/users`,
            data: { videoId }
        });
        dispatch({
            type: BUYVIDEO,
            payload: { videoId }
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: BUYVIDEO,
            payload: {
                error: error.response.data.error,
                videoId: null
            }
        })
    }
}