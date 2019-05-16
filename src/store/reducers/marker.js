import {ADD_MARKER, UPDATE_STATUS, UPDATE_MARKER} from "../actions/marker";

const initialMarker = {
    markers: [],
    currentId: null
};

const marker = (state = initialMarker, action) => {
    switch (action.type) {
        case ADD_MARKER :
            console.log(action);
            return {
                ...state,
                markers: [...state.markers, action.marker],
                currentId: action.marker.id
            };

        case UPDATE_STATUS :
            return {
                ...state,
                markers: state.markers.map(marker => {
                    if (marker.id === action.id) {
                        marker.status = action.status
                    }
                    return marker;
                })
            };

        case UPDATE_MARKER :
            return {
                ...state,
                markers: state.markers.map(marker => {
                    if (marker.id === action.id) {
                        marker.name = action.name
                    }

                    return marker;
                }),
                currentId: null
            };
        default:
            return state
    }
};

export const getMarker = state => state.marker.markers;
// export const getMarkerStatus = state => state.marker.markers.status;
export const getMarkerCurrentId = state => state.marker.currentId;

export {marker}