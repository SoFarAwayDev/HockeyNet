import React, { Component } from 'react';
import request from 'superagent';
import Loader from 'react-loader';
import Header from './header';
import Footer from './footer';
import Uploader from './uploader'
import TimeStamps from './stamps'
import Video from './video'
import actions from '../actions/actionsCreator'
import { connect } from 'react-redux'

class Main extends Component {

    constructor(props) {
        super(props);
    }


    onFileSelected(files){
      this.props.uploadVideo(files);
    }

    render() {
        return (
            <div>
                <Header/>
                <div className="container content-block">
                    <Loader loaded={true}>
                        <div className="col-md-3">
                            <Uploader onFileSelected={this.onFileSelected.bind(this)} />
                        </div>
                        <div className="col-md-8">
                            <Video filePath={this.props.filePath} />
                            <TimeStamps filePath={this.props.timeStamps}/>
                        </div>
                    </Loader>
                </div>
                <Footer/>
            </div>
        );
    }
}




function mapStoreToProps(storeState) {
  
  return {
    timeStamps: storeState.commonReducer.timeStamps,
    filePath: storeState.commonReducer.filePath
  }
}

function mapDispatchToProps(dispatch) {
  return {
    uploadVideo: (files) => dispatch(actions.uploadFiles(files))
  }
}

export default connect(
  mapStoreToProps,
  mapDispatchToProps)
(Main)
