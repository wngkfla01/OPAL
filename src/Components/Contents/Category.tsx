import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryProductApi } from 'api';
import { plist, RootState } from 'redux/reducer/reducer';
import { useSelector, useDispatch } from 'react-redux';
import 'Styles/Category.scss';

//image
import partyRoom from 'Assets/Images/0_partyRoom.png';
import seminarRoom from 'Assets/Images/1_seminarRoom.png';
import filmStudio from 'Assets/Images/2_filmStudio.png';
import practiceRoom from 'Assets/Images/3_practiceRoom.png';
import livebroadCast from 'Assets/Images/4_livebroadCast.png';
import publicKitchen from 'Assets/Images/5_publicKitchen.png';
import athleticFacilities from 'Assets/Images/6_athleticFacilities.png';
import rentalStudio from 'Assets/Images/7_rentalStudio.png';
import classRoom from 'Assets/Images/8_classRoom.png';
import cafe from 'Assets/Images/9_cafe.png';
import hall from 'Assets/Images/10_hall.png';
import gallery from 'Assets/Images/11_gallery.png';

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
      <section className="inner shadow">
        <div className="category">
          <div className="category__container">
            <div>
              <div
                className="category__item"
                onClick={async () => {
                  await onClickHandler('파티룸');
                }}
              >
                <div className="category__item-name">
                  <img src={partyRoom} alt="partyRoom" />
                </div>
              </div>
              <p className="category__item-title">파티룸</p>
            </div>

            <div>
              <div
                className="category__item"
                onClick={async () => {
                  await onClickHandler('세미나실');
                }}
              >
                <div className="category__item-name">
                  <img src={seminarRoom} alt="seminarRoom" />
                </div>
              </div>
              <p className="category__item-title">세미나실</p>
            </div>

            <div>
              <div
                className="category__item"
                onClick={async () => {
                  await onClickHandler('촬영스튜디오');
                }}
              >
                <div className="category__item-name">
                  <img src={filmStudio} alt="filmStudio" />
                </div>
              </div>
              <p className="category__item-title">촬영스튜디오</p>
            </div>

            <div>
              <div
                className="category__item"
                onClick={async () => {
                  await onClickHandler('연습실');
                }}
              >
                <div className="category__item-name">
                  <img src={practiceRoom} alt="practiceRoom" />
                </div>
              </div>
              <p className="category__item-title">연습실</p>
            </div>
          </div>

          <div className="category__container">
            <div>
              <div
                className="category__item"
                onClick={async () => {
                  await onClickHandler('라이브방송');
                }}
              >
                <div className="category__item-name">
                  <img src={livebroadCast} alt="livebroadCast" />
                </div>
              </div>
              <p className="category__item-title">라이브방송</p>
            </div>

            <div>
              <div
                className="category__item"
                onClick={async () => {
                  await onClickHandler('공용주방');
                }}
              >
                <div className="category__item-name">
                  <img src={publicKitchen} alt="publicKitchen" />
                </div>
              </div>
              <p className="category__item-title">공용주방</p>
            </div>

            <div>
              <div
                className="category__item"
                onClick={async () => {
                  await onClickHandler('운동시설');
                }}
              >
                <div className="category__item-name">
                  <img src={athleticFacilities} alt="athleticFacilities" />
                </div>
              </div>
              <p className="category__item-title">운동시설</p>
            </div>

            <div>
              <div
                className="category__item"
                onClick={async () => {
                  await onClickHandler('렌탈스튜디오');
                }}
              >
                <div className="category__item-name">
                  <img src={rentalStudio} alt="rentalStudio" />
                </div>
              </div>
              <p className="category__item-title">렌탈스튜디오</p>
            </div>
          </div>

          <div className="category__container">
            <div>
              <div
                className="category__item"
                onClick={async () => {
                  await onClickHandler('강의실');
                }}
              >
                <div className="category__item-name">
                  <img src={classRoom} alt="classRoom" />
                </div>
              </div>
              <p className="category__item-title">강의실</p>
            </div>

            <div>
              <div
                className="category__item"
                onClick={async () => {
                  await onClickHandler('카페');
                }}
              >
                <div className="category__item-name">
                  <img src={cafe} alt="cafe " />
                </div>
              </div>
              <p className="category__item-title">카페</p>
            </div>

            <div>
              <div
                className="category__item"
                onClick={async () => {
                  await onClickHandler('공연장');
                }}
              >
                <div className="category__item-name">
                  <img src={hall} alt="hall" />
                </div>
              </div>
              <p className="category__item-title">공연장</p>
            </div>

            <div>
              <div
                className="category__item"
                onClick={async () => {
                  await onClickHandler('전시');
                }}
              >
                <div className="category__item-name">
                  <img src={gallery} alt="gallery" />
                </div>
              </div>
              <p className="category__item-title">전시</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
