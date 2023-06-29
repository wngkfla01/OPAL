import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { search, plist, RootState } from 'redux/reducer/reducer';
import { DatePicker, Space } from 'antd';
import { Product, searchProductApi, categoryProductApi } from 'api';
import Counter from 'Components/Contents/Counter';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'Styles/SearchBar.scss';

dayjs.extend(customParseFormat);
const dateFormat = 'YYYY/MM/DD';

function SearchBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchedValue = useSelector((state: RootState) => {
    return state.searchSlice.searchedValue;
  });
  const listValue = useSelector((state: RootState) => {
    return state.listSlice.listValue;
  });
  async function gotoProductlist() {
    navigate(`/productlist`);
  }

  async function lists(searchlist: Product[], taglist: Product[]) {
    const mergelists: Product[] = searchlist.concat(taglist);
    const merged: Product[] = mergelists.reduce(
      (ac: Product[], v) => (ac.includes(v) ? ac : [...ac, v]),
      []
    );
    console.log('확인', merged);
    {
      setlist(merged);
    }
  }
  async function setlist(lists: Product[]) {
    dispatch(plist(lists));
  }

  async function pressEnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      if (!searchedValue.trim()) return;
      const searchlist: Product[] = await searchProductApi(searchedValue);
      const taglist: Product[] = await categoryProductApi(searchedValue);
      lists(searchlist, taglist);
      console.log('검색+태그', listValue);
      console.log(listValue);
      console.log('검색어', searchlist);
      console.log('태그', taglist);
      await gotoProductlist();
    }
    console.log('리스트 스테이트 저장', listValue);
  }

  return (
    <>
      <form className="searchBar">
        <Space className="searchBar__inner">
          <input
            type="text"
            value={searchedValue}
            className="searchBar__input"
            placeholder="검색어를 입력해주세요"
            onChange={(e) => {
              dispatch(search(e.target.value));
              console.log(searchedValue);
            }}
            onKeyDown={pressEnterKey}
          />
          <Space direction="vertical" size={13}>
            <DatePicker
              defaultValue={dayjs('2023/07/07', dateFormat)}
              format={dateFormat}
            />
          </Space>
          <div>
            <Counter />
          </div>
          <input
            type="button"
            className="searchBar__btn btn"
            value={'검색하기'}
            onClick={gotoProductlist}
          />
        </Space>
      </form>
    </>
  );
}

export default React.memo(SearchBar);
