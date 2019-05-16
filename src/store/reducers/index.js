import {connectRouter} from "connected-react-router";
import {combineReducers} from 'redux'
import {text} from './text';
import {marker} from './marker';

export default (history) => combineReducers({
    text,
    marker,
    router: connectRouter(history)
})