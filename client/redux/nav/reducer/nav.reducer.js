import navType from '../type/nav.type';

const INITIAL_STATE = {
  displaySlideMenu: false,
  displayOverlay: false,
  currentLocation: {
    latitude: 0,
    longitude: 0,
  },
  mediaType: '',
  channel: '',
};

export const navReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case navType.SET_CHANNEL:
      return {
        ...state,
        channel: action.payload,
      };
    case navType.TOGGLE_SLIDE_MENU:
      return {
        ...state,
        displaySlideMenu: !state.displaySlideMenu,
      };
    case navType.TOGGLE_MAIN_OVERLAY:
      return {
        ...state,
        displayOverlay: !state.displayOverlay,
      };
    case navType.SET_MEDIA_TYPE:
      return {
        ...state,
        mediaType: action.payload,
      };
    case navType.SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.payload,
      };
    default:
      return state;
  }
};
