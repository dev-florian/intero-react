export const CREATE_MARKER = 'CREATE_MARKER';
export const UPDATE_STATUS = 'UPDATE_STATUS';
export const ADD_MARKER = 'ADD_MARKER';
export const UPDATE_MARKER = 'UPDATE_MARKER';

export const updateStatus = (id, status) => ({
    type: UPDATE_STATUS,
    id,
    status
});

export const addMarker = (marker) => ({
    type: ADD_MARKER,
    marker
});

export const updateMarker = (id, name) => ({
    type: UPDATE_MARKER,
    id,
    name,
});