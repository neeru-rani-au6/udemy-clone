import { VIDEOCREATE, VIDEOPLAYER, ALLVIDEO } from '../type';
import axios from 'axios';

export const videoPost = (post) => async dispatch => {
    //console.log(post);
    try {
        const {data} = await axios({
            method: "post",
            url: `/video`,
            data:  post 
        });
        dispatch({
            type: VIDEOCREATE,
            payload: data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: VIDEOCREATE,
            payload: {
                error: error.response,
            }

        })
    }
}

export const allVideo = () => async dispatch => {
    try {
        const { data } = await axios(`/video/all`);
        dispatch({
            type: ALLVIDEO,
            payload: data
        })
    } catch (error) {
        console.log(error)

    }
}

export const currentVideo = (id) => async dispatch => {
   
    try {
        const { data } = await axios(`/video/${id}`)
        dispatch({
            type: VIDEOPLAYER,
            payload: data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: VIDEOPLAYER,
            payload: {
                error: error.response.data.error
            }
        })

    }
}