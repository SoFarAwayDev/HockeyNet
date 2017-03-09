import constants from '../constants';
import update from 'react-addons-update';

let initialState = {
  filePath: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
  timeStamps: []
};
const initialAction = { type: 'initial state'}

const common = (state = initialState, action = initialAction) => {
  
    switch (action.type) {
        case constants.VIDEO_UPLOADED:
          return update(filePath, {
              filePath: action.filePath
            });

        case constants.TIME_STAMPS_RESEVED:
          return update(filePath, {
              timeStamps: action.timeStamps
            });

        default:
          return state;
    }
}

export default common;
