import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { plist } from 'redux/reducer/reducer';
import { DatePicker, Space } from 'antd';
import { Product, searchProductApi, categoryProductApi } from 'api';
import Counter from 'Components/Contents/Counter';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'Styles/SearchBar.scss';

dayjs.extend(customParseFormat);
const dateFormat = 'YYYY/MM/DD';
interface SearchBarProps {
  onSearch: (query: string) => void;
}
function SearchBar({ onSearch }: SearchBarProps) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [searchValue, setSearchValue] = useState(
    searchParams.get('search') || ''
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function gotoProductlist() {
    // URL 생성
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('search', searchValue);
    const queryString = urlSearchParams.toString();
    navigate(`/productlist?${queryString}`);
  }

  async function lists(searchlist: Product[], taglist: Product[]) {
    const mergelists: Product[] = searchlist.concat(taglist);
    const merged: Product[] = mergelists.reduce(
      (ac: Product[], v) => (ac.includes(v) ? ac : [...ac, v]),
      []
    );
    {
      setlist(merged);
    }
  }
  async function setlist(lists: Product[]) {
    dispatch(plist(lists));
  }
  async function pressEnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      if (!searchValue.trim()) return;
      onSearch(searchValue);
      const searchlist: Product[] = await searchProductApi(searchValue);
      const taglist: Product[] = await categoryProductApi(searchValue);
      lists(searchlist, taglist);
      await gotoProductlist();
    }
  }
  async function clickSearchButton() {
    if (!searchValue.trim()) return;
    onSearch(searchValue);
    const searchlist: Product[] = await searchProductApi(searchValue);
    const taglist: Product[] = await categoryProductApi(searchValue);
    lists(searchlist, taglist);
    await gotoProductlist();
  }

  return (
    <>
      <form className="searchBar">
        <Space className="searchBar__inner">
          <input
            type="text"
            value={searchValue}
            className="searchBar__input"
            placeholder="검색어를 입력해주세요"
            onChange={(e) => {
              setSearchValue(e.target.value);
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
            onClick={clickSearchButton}
          />
        </Space>
      </form>
    </>
  );
}

export default React.memo(SearchBar);
