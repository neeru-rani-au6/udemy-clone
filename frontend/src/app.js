import React, { Component } from 'react';
import Register from './components/register';
import Login from './components/login';
import Home from './components/home';
import postVideo from './components/postVideo';
import videoDetail from './components/videoDetail';
import { HashRouter, Route } from 'react-router-dom';
import adminRegister from './components/adminregister';
import adminLogin from './components/adminLogin';
class App extends Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <Route path="/" component={Home} exact />
                    <Route path="/login" component={Login} exact />
                    <Route path="/register" component={Register} exact />
                    <Route path="/post" component={postVideo} exact />
                    <Route path="/post/:id" component={videoDetail} exact />
                    <Route path="/adminRegister" component={adminRegister} exact />
                    <Route path="/adminLogin" component={adminLogin} exact />
                </HashRouter>
            </div>
        )
    }
}

export default App;