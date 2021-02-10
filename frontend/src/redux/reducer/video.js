import { ALLVIDEO, VIDEOPLAYER, VIDEOCREATE } from '../type';

const initalstate = {
    posts: null,
    currentPost: null
}

const videoReducer = (state = initalstate, action) => {
    const { type, payload } = action;
    switch (type) {
        case ALLVIDEO:
            return { ...state, posts: payload }
        case VIDEOCREATE:
            const posts =state.posts ?  [...state.posts, payload] :[payload];
            return {
                ...state, posts
            }
        case VIDEOPLAYER:
            return { ...state, currentPost: payload }

        default:
            return state;

    }
}

export default videoReducer;