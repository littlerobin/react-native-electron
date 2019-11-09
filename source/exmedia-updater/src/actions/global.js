const visibleModalTryoutAction = (visible) => dispatch =>
  dispatch({
    type: 'VISIBLE_MODAL_TRYOUT',
    payload: visible,
  });

export default {
  visibleModalTryoutAction,
}
