import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryProductApi } from 'api';
import { plist, RootState } from 'redux/reducer/reducer';
import { useSelector, useDispatch } from 'react-redux';
import 'Styles/Category.scss';

//image
import 파티룸 from 'Assets/Images/0_파티룸.png';
import 세미나실 from 'Assets/Images/1_세미나실.png';
import 촬영스튜디오 from 'Assets/Images/2_촬영스튜디오.png';
import 연습실 from 'Assets/Images/3_연습실.png';
import 라이브방송 from 'Assets/Images/4_라이브방송.png';
import 공용주방 from 'Assets/Images/5_공용주방.png';
import 운동시설 from 'Assets/Images/6_운동시설.png';
import 렌탈스튜디오 from 'Assets/Images/7_렌탈스튜디오.png';
import 강의실 from 'Assets/Images/8_강의실.png';
import 카페 from 'Assets/Images/9_카페.png';
import 공연장 from 'Assets/Images/10_공연장.png';
import 전시 from 'Assets/Images/11_전시.png';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function Category({ onSearch }: SearchBarProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchedValue = useSelector((state: RootState) => {
    return state.searchSlice.searchedValue;
  });
  useSelector((state: RootState) => {
    return state.listSlice.listValue;
  });

  useEffect(() => {
    (async () => {
      const list = await categoryProductApi(searchedValue);
      dispatch(plist(list));
    })();
  }, [searchedValue]);

  async function onClickHandler(name: string) {
    onSearch(name);
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('search', name);
    const queryString = urlSearchParams.toString();
    navigate(`/productlist?${queryString}`);
  }

  return (
    <>
      <section className="inner">
        <div className="category">
          <div className="category__container">
            <div
              className="category__item"
              onClick={async () => {
                await onClickHandler('파티룸');
              }}
            >
              <div className="category__item-name">
                <img src={파티룸} alt="파티룸" />
              </div>
            </div>

            <div
              className="category__item"
              onClick={async () => {
                await onClickHandler('세미나실');
              }}
            >
              <div className="category__item-name">
                <img src={세미나실} alt="세미나실" />
              </div>
            </div>
            <div
              className="category__item"
              onClick={async () => {
                await onClickHandler('촬영스튜디오');
              }}
            >
              <div className="category__item-name">
                <img src={촬영스튜디오} alt="촬영스튜디오" />
              </div>
            </div>
            <div
              className="category__item"
              onClick={async () => {
                await onClickHandler('연습실');
              }}
            >
              <div className="category__item-name">
                <img src={연습실} alt="연습실" />
              </div>
            </div>
          </div>

          <div className="category__container">
            <div
              className="category__item"
              onClick={async () => {
                await onClickHandler('라이브방송');
              }}
            >
              <div className="category__item-name">
                <img src={라이브방송} alt="라이브방송" />
              </div>
            </div>
            <div
              className="category__item"
              onClick={async () => {
                await onClickHandler('공용주방');
              }}
            >
              <div className="category__item-name">
                <img src={공용주방} alt="공용주방" />
              </div>
            </div>
            <div
              className="category__item"
              onClick={async () => {
                await onClickHandler('운동시설');
              }}
            >
              <div className="category__item-name">
                <img src={운동시설} alt="운동시설" />
              </div>
            </div>
            <div
              className="category__item"
              onClick={async () => {
                await onClickHandler('렌탈스튜디오');
              }}
            >
              <div className="category__item-name">
                <img src={렌탈스튜디오} alt="렌탈스튜디오" />
              </div>
            </div>
          </div>

          <div className="category__container">
            <div
              className="category__item"
              onClick={async () => {
                await onClickHandler('강의실');
              }}
            >
              <div className="category__item-name">
                <img src={강의실} alt="강의실" />
              </div>
            </div>
            <div
              className="category__item"
              onClick={async () => {
                await onClickHandler('카페');
              }}
            >
              <div className="category__item-name">
                <img src={카페} alt="카페 " />
              </div>
            </div>
            <div
              className="category__item"
              onClick={async () => {
                await onClickHandler('공연장');
              }}
            >
              <div className="category__item-name">
                <img src={공연장} alt="공연장" />
              </div>
            </div>
            <div
              className="category__item"
              onClick={async () => {
                await onClickHandler('갤러리');
              }}
            >
              <div className="category__item-name">
                <img src={전시} alt="전시" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
