import React, { Component } from 'react';
import { Player } from 'video-react';


class Video extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Player
                    playsInline
                    src={'http://media.w3.org/2010/05/sintel/trailer.mp4'}
                />
            </div>
        );
    }
}

export default Video;