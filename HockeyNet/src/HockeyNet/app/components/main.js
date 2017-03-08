import React, { Component } from 'react';
import request from 'superagent';
import Loader from 'react-loader';
import Header from './header';
import Footer from './footer';
import Uploader from './uploader'
import TimeStamps from './stamps'
import Video from './video'

class Main extends Component {

    constructor(props) {
        super(props);     
    }
    render() {
        return (
            <div>
                <Header/>
                <div className="container content-block">
                    <Loader loaded={true}>
                        <div className="col-md-3">
                            <Uploader/>
                        </div>
                        <div className="col-md-8">
                            <Video/>
                            <TimeStamps/>
                        </div>
                    </Loader>
                </div>
                <Footer/>
            </div>
        );
    }
}


export default Main;
