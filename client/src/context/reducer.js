function reducer(state, action) {
  switch (action.type) {
    case 'SETUP_USER':
      const { user, token } = action.payload;
      return {
        ...state,
        user,
        token,
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        user: null,
        token: null,
      };
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        showSidebar: !state.showSidebar,
      };
    case 'UPDATE_POSTS':
      return {
        ...state,
        posts: action.payload.posts,
      };
    case 'UPDATE_SEARCH':
      return {
        ...state,
        searchParams: action.payload.searchParams,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      throw new Error(`Action type: ${action.type} does not exist`);
  }
}

export default reducer;
