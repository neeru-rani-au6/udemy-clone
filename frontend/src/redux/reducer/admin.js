import { ADMINREGISTER, ADMINLOGIN, ADMINLOGOUT } from '../type';
const initalstate = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    isAuthenticated: localStorage.getItem("isAuth") || false,
    info: null,
    error: null,
    users: null
}


const adminReducer = (state = initalstate, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADMINREGISTER:
            const newState = Object.assign(state, payload);
            //console.log(newState)
            return newState;
        case ADMINLOGIN:
            if (payload.user) {
                localStorage.setItem('user', JSON.stringify(payload.user));
                localStorage.setItem('isAuth', true);
            }
            return Object.assign(state, payload);
        case ADMINLOGOUT:
            localStorage.removeItem("user")
            localStorage.removeItem("isAuth")
            return { ...state, user: null, isAuthenticated: false }
        // case BUYVIDEO:
        //     const user = { ...state.user };
        //     user.myVideos = user.myVideos || [];
        //     if (action.payload.videoId) {
        //         user.myVideos.push(action.payload.videoId)
        //     }
        //     localStorage.setItem('user', JSON.stringify(user));
        //     return { ...state, user };
        default:
            return state;
    }
}

export default adminReducer;
