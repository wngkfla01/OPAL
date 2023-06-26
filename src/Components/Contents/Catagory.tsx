import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Divider, Row, Space } from 'antd';
import { categoryProductApi } from 'api';
import { category, plist, RootState } from 'redux/reducer/reducer';
import { useSelector, useDispatch } from 'react-redux';

export default function Catagory() {
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

  function gotoProductlist() {
    navigate(`/productlist`);
  }
  async function onClickHendler(name: string) {
    dispatch(category(name));
    gotoProductlist();
  }

  return (
    <>
      <Divider orientation="center">Catagory</Divider>
      <Space direction="vertical">
        <Row gutter={[20, 24]}>
          <Col className="gutter-row" span={6}>
            <button
              onClick={async () => {
                await onClickHendler('파티룸');
              }}
            >
              파티룸
            </button>
          </Col>
          <Col className="gutter-row" span={6}>
            <button
              onClick={async () => {
                await onClickHendler('세미나실');
              }}
            >
              세미나실
            </button>
          </Col>
          <Col className="gutter-row" span={6}>
            <button
              onClick={async () => {
                await onClickHendler('촬영스튜디오');
              }}
            >
              촬영스튜디오
            </button>
          </Col>
          <Col className="gutter-row" span={6}>
            <button
              onClick={async () => {
                await onClickHendler('연습실');
              }}
            >
              연습실
            </button>
          </Col>

          <Col className="gutter-row" span={6}>
            <button
              onClick={async () => {
                await onClickHendler('라이브방송');
              }}
            >
              라이브방송
            </button>
          </Col>
          <Col className="gutter-row" span={6}>
            <button
              onClick={async () => {
                await onClickHendler('공용주방');
              }}
            >
              공용주방
            </button>
          </Col>
          <Col className="gutter-row" span={6}>
            <button
              onClick={async () => {
                await onClickHendler('운동시설');
              }}
            >
              운동시설
            </button>
          </Col>
          <Col className="gutter-row" span={6}>
            <button
              onClick={async () => {
                await onClickHendler('운동시설');
              }}
            >
              렌탈스튜디오
            </button>
          </Col>

          <Col className="gutter-row" span={6}>
            <button
              onClick={async () => {
                await onClickHendler('강의실');
              }}
            >
              강의실
            </button>
          </Col>
          <Col className="gutter-row" span={6}>
            <button
              onClick={async () => {
                await onClickHendler('카페');
              }}
            >
              카페
            </button>
          </Col>
          <Col className="gutter-row" span={6}>
            <button
              onClick={async () => {
                await onClickHendler('공연장');
              }}
            >
              공연장
            </button>
          </Col>
          <Col className="gutter-row" span={6}>
            <button
              onClick={async () => {
                await onClickHendler('갤러리');
              }}
            >
              갤러리
            </button>
          </Col>
        </Row>
      </Space>
    </>
  );
}
