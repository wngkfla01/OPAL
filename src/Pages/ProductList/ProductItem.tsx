import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer/reducer';
import { Pagination, Image, Space } from 'antd';
import 'Styles/ProductItem.scss';

export default function ProductItem() {
  const searchedValue = useSelector((state: RootState) => {
    return state.searchSlice.searchedValue;
  });
  const listValue = useSelector((state: RootState) => {
    return state.listSlice.listValue;
  });
  console.log(listValue);
  return (
    <>
      <h1 className="searchedValue">
        {searchedValue}의 {listValue.length}개 검색결과를 찾았습니다!
      </h1>
      <div>
        {listValue?.length !== 0 &&
          listValue?.map((list) => {
            const descriptionSlice = list.description.split('<br>');
            const descriptionNew = descriptionSlice[0];
            return (
              <Space key={list.id} size={20} className="productItem">
                <Image
                  width={300}
                  height={200}
                  src={list.thumbnail}
                  className="productItem__img"
                />
                <Link
                  to={`/productdetail/${list.id}`}
                  key={list.id}
                  className="productItem__info-container"
                >
                  <div className="productItem__info">
                    <div className="productItem__title">{list.title}</div>
                    <div className="productItem__des">{descriptionNew}</div>
                  </div>
                  <span className="productItem__price">
                    시간당 {list.price} 원
                  </span>
                </Link>
              </Space>
            );
          })}
      </div>
      <Pagination defaultCurrent={1} total={listValue.length} pageSize={7} />;
    </>
  );
}
