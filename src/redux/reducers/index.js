import { combineReducers} from 'redux';
import setUserReducer from './setUserReducer';

const rootReduser = combineReducers({
    user: setUserReducer
});

export default rootReduser;