import { REGISTER, LOGIN, LOGOUT, BUYVIDEO } from '../type';
const initalstate = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    isAuthenticated: localStorage.getItem("isAuth") || false,
    info: null,
    error: null,
    users: null
}


const userReducer = (state = initalstate, action) => {
    const { type, payload } = action;
    switch (type) {
        case REGISTER:
            const newState = Object.assign(state, payload);
            //console.log(newState)
            return newState;
        case LOGIN:
            if (payload.user) {
                localStorage.setItem('user', JSON.stringify(payload.user));
                localStorage.setItem('isAuth', true);
            }
            return Object.assign(state, payload);
        case LOGOUT:
            localStorage.removeItem("user")
            localStorage.removeItem("isAuth")
            return { ...state, user: null, isAuthenticated: false }
        case BUYVIDEO:
            const user = { ...state.user };
            user.myVideos = user.myVideos || [];
            if (action.payload.videoId) {
                user.myVideos.push(action.payload.videoId)
            }
            localStorage.setItem('user', JSON.stringify(user));
            return { ...state, user };
        default:
            return state;
    }
}

export default userReducer;
