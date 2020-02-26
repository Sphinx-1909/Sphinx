import navType from '../type/nav.type';

const INITIAL_STATE = {
  displaySlideMenu: false,
  displayOverlay: false,
};

export const navReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
