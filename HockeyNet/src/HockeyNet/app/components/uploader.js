import React, { Component } from 'react';
import Dropzone from 'react-dropzone';


class Uploader extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Dropzone ref="dropUploader">
                    <div className="drop-text-block">
                        <div className="drop-text">Drop videos here</div>
                    </div>
                </Dropzone>
                <button type="button" className="btn btn-primary upload-button" >
                    Upload Video
                </button>
            </div>
        );
    }
}

export default Uploader;