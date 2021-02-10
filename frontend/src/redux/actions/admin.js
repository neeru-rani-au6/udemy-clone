import { ADMINREGISTER, ADMINLOGIN, ADMINLOGOUT } from '../type';
import axios from 'axios';

export const registerAdmin = (user) => async dispatch => {
    console.log(user)
    try {
        const { data } = await axios({
            method: "post",
            url: '/admin/register',
            data: user,
        }
        );
        // console.log(user, "1234")
        dispatch({
            type: ADMINREGISTER,
            payload: {
                error: null,
                info: data
            }
        })

    } catch (error) {
        //console.log(error.response.data)
        dispatch({
            type: ADMINREGISTER,
            payload: {
                error: error.response.data.error,
                info: null
            }
        })

    }
}

export const loginAdmin = (user) => async dispatch => {
    try {
        const { data } = await axios({
            method: "post",
            url: `/admin/login`,
            data: {
                email: user.email,
                password: user.password
            }
        });
        //console.log(data, "dfhkgj ")
        dispatch({
            type: ADMINLOGIN,
            payload: { error: null, user: data, isAuthenticated: true }
        })
    } catch (error) {
        console.log(error.response.data)
        dispatch({
            type: ADMINLOGIN,
            payload: {
                error: error.response.data.error,
                info: null,
                isAuthenticated: false,
                user: null
            }
        })

    }
}


export const logoutAdmin = () => async dispatch => {
    try {
        await axios({
            method: "delete",
            url: `/admin/logout`
        });
        dispatch({
            type: ADMINLOGOUT,
            payload: null
        })
    } catch (error) {
        console.log(error)

    }
}


