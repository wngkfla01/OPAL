import React from 'react';
import { useDispatch } from 'react-redux';
import { selectTab } from 'redux/reducer/reducer';
import { useNavigate, Link } from 'react-router-dom';
import { Row, Button, Typography } from 'antd';

const { Title } = Typography;

const PaymentCheck = () => {
  const navigate = useNavigate(); //페이지 이동

  const dispatch = useDispatch();

  const goMyPurchase = () => {
    dispatch(selectTab('구매 내역'));
    navigate('/mypage');
  };

  return (
    <>
      <Row justify="center" align="middle">
        <Title level={1}>예약 확인증</Title>
      </Row>
      <Row
        justify="center"
        style={{ flexDirection: 'column', width: '500px', margin: '0 auto' }}
      >
        <Row
          className="inner"
          style={{ border: '1px solid #000', height: '500px', padding: '10px' }}
        >
          <div
            style={{ border: '1px solid #000', width: '100%', height: '25%' }}
          >
            예약 정보 컴포넌트 넣기 / 취소버튼 포함
          </div>
          <div
            style={{ border: '1px solid #000', width: '100%', height: '25%' }}
          >
            공간 소개
          </div>
          <div
            style={{ border: '1px solid #000', width: '100%', height: '25%' }}
          >
            공간 정보
          </div>
          <div
            style={{ border: '1px solid #000', width: '100%', height: '25%' }}
          >
            지도..?
          </div>
        </Row>
        <Row
          justify="center"
          align="middle"
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Button>
            <Link to="/">메인 페이지로 이동</Link>
          </Button>
          <Button onClick={goMyPurchase}>예약 목록 조회</Button>
        </Row>
      </Row>
    </>
  );
};

export default PaymentCheck;
