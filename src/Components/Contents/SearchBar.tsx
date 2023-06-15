import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { up, down, RootState } from 'redux/reducer/reducer';
import { DatePicker, Space, InputNumber } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
const dateFormat = 'YYYY/MM/DD';

// const counterSlice = createSlice({
//   name: 'counterSlice',
//   initialState: { value: 0 },
//   reducers: {
//     up: (state, action) => {
//       state.value = state.value + action.payload;
//     },
//     down: (state, action) => {
//       state.value = state.value - action.payload;
//     },
//   },
// });
// const store = configureStore({
//   reducer: {
//     counter: counterSlice.reducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type Dispatch = typeof store.dispatch;
// export const useAppDisptch: () => Dispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

function Counter() {
  const dispatch = useDispatch();
  const clickedCounter = useSelector((state: RootState) => {
    return state.counterSlice.clickedCounter;
  });

  return (
    <>
      <input
        type="button"
        value={'-'}
        onClick={() => {
          dispatch(down(1));
          console.log(down(1));
          console.log(clickedCounter);
        }}
      />
      <InputNumber
        min={1}
        value={clickedCounter}
        controls={false}
        bordered={false}
      />
      명
      <input
        type="button"
        value={'+'}
        onClick={() => {
          dispatch(up(1));
          console.log(up(1));
        }}
      />
    </>
  );
}

export default function SearchBar() {
  return (
    <>
      <form>
        <input
          type="text"
          className="searsh__input"
          placeholder="검색어를 입력해주세요"
        />
        <Space direction="vertical" size={13}>
          <DatePicker
            defaultValue={dayjs('2015/01/01', dateFormat)}
            format={dateFormat}
          />
        </Space>
        <div>
          <Counter />
        </div>
        <input type="submit" className="searsh__btn btn" value={'검색하기'} />
      </form>
    </>
  );
}
