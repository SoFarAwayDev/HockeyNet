import constants from '../constants';
import update from 'react-addons-update';

let initialState = {
  filePath: '',
  timeStamps: []
};
const initialAction = { type: 'initial state'}

const common = (state = initialState, action = initialAction) => {
  
    switch (action.type) {
        case constants.VIDEO_UPLOADED:
            return update(state, {
                filePath: { $set: action.filePath }
            });

        case constants.TIME_STAMPS_RESEVED:
            return update(state, {
                timeStamps: { $set: action.timeStamps }
            });

        default:
          return state;
    }
}

export default common;
