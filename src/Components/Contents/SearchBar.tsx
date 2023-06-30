import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { plist } from 'redux/reducer/reducer';
import { ConfigProvider, DatePicker, InputNumber, Space } from 'antd';
import { Product, searchProductApi, categoryProductApi } from 'api';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import locale from 'antd/locale/ko_KR';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'Styles/SearchBar.scss';

dayjs.extend(customParseFormat);
dayjs.locale('ko');

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
  async function setlist(merged: Product[]) {
    dispatch(plist(merged));
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
            <ConfigProvider locale={locale}>
              <DatePicker
                size="large"
                placement={'bottomLeft'}
                placeholder={'날짜를 선택해주세요'}
                style={{
                  width: '200px',
                  height: '45px',
                  margin: '5px 0',
                  padding: '5px 20px',
                  border: 'none',
                  borderRadius: '25px',
                  verticalAlign: 'middle',
                  boxShadow: 'inset 2px 1px 8px rgba(223, 223, 223, 0.496)',
                }}
              />
            </ConfigProvider>
          </Space>
          <div>
            <span
              style={{
                margin: '5px 20px',
                color: 'rgba(89, 80, 69, 1)',
                fontSize: '17px',
              }}
            >
              인원
            </span>
            <InputNumber
              style={{
                width: '100px',
                height: '45px',
                margin: '5px 0',
                padding: '5px 20px',
                border: 'none',
                borderRadius: '25px',
                verticalAlign: 'middle',
                boxShadow: 'inset 2px 1px 8px rgba(223, 223, 223, 0.496)',
              }}
              min={1}
              max={50}
              defaultValue={1}
            />
          </div>
          <input
            type="button"
            className="btn"
            value={'검색하기'}
            onClick={clickSearchButton}
          />
        </Space>
      </form>
    </>
  );
}

export default React.memo(SearchBar);
