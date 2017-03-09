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
                    src={this.props.filePath}
                />
            </div>
        );
    }
}

export default Video;
