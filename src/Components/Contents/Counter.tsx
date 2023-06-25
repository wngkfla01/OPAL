import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { up, down, RootState } from 'redux/reducer/reducer';
import { InputNumber } from 'antd';

export default function Counter() {
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
