import navType from '../type/nav.type';

export const setToggleSlideMenu = () => ({
  type: navType.TOGGLE_SLIDE_MENU,
});

export const setToggleDisplayOverlay = () => ({
  type: navType.TOGGLE_SLIDE_MENU,
});

export const setCurrentLocation = location => ({
  type: navType.SET_CURRENT_LOCATION,
  payload: location,
});

export const setMediaType = media => ({
  type: navType.SET_MEDIA_TYPE,
  payload: media,
});

export const setChannel = channel => ({
  type: navType.SET_CHANNEL,
  payload: channel,
});
