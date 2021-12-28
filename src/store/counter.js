import { createAction, handleActions } from 'redux-actions';

// 액션 타입 정의하기

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// createActions 없이 쓰는법
// export const increase = () => ({ type: INCREASE });
// export const decrease = () => ({ type: DECREASE });
// 액션 생성함수 만들기
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 초기 상태
const initialState = {
	number: 0,
};

// handleActions 없이 쓰는법
/*
function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        number: state.number + 1
      };
    case DECREASE:
      return {
        number: state.number - 1
      };
    default:
      return state;
  }
}
*/

const counter = handleActions(
	{
		[INCREASE]: (state, action) => ({ number: state.number + 1 }),
		[DECREASE]: (state, action) => ({ number: state.number - 1 }),
	},
	initialState
);

export default counter;