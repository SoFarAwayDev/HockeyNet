import React, { Component } from 'react';
import { Player } from 'video-react';
import constants from '../constants'


class Video extends Component {

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.timeSeek !== nextProps.timeSeek)
        {
            this.player.seek(nextProps.timeSeek);
        }
    } 

    componentDidMount() {
        let localCopyOfPlayer = this.player;
        var intervalId = setInterval(() => {
            let state = localCopyOfPlayer.getState();
            if (state.player.readyState !== constants.HAVE_FUTURE_DATA && state.player.readyState !== constants.HAVE_ENOUGH_DATA) {
                localCopyOfPlayer.load();
            } else {
                clearInterval(intervalId);
            }
        }, 1000);
    }

    render() {
        
        return (
            <div>
                <Player
                    playsInline
                    ref={(player) => { this.player = player; }}
                    src={this.props.filePath}
                />
            </div>
        );
    }
}

export default Video;
