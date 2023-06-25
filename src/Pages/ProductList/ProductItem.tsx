import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer/reducer';
import { Pagination, Image, Space } from 'antd';

export default function ProductItem() {
  const searchedValue = useSelector((state: RootState) => {
    return state.searchSlice.searchedValue;
  });
  const listValue = useSelector((state: RootState) => {
    return state.listSlice.listValue;
  });
  return (
    <>
      <h1>{searchedValue}</h1>
      <div>
        {listValue?.length !== 0 &&
          listValue?.map((list) => (
            <Space key={list.id} size={50}>
              <Image width={200} src={list.thumbnail} />
              <div>{list.title}</div>
              <div>{list.description}</div>
              <div>{list.price}</div>
            </Space>
          ))}
      </div>
      <Pagination defaultCurrent={1} total={listValue.length} pageSize={7} />;
    </>
  );
}
