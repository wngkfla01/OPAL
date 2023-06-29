import React from 'react';
import { useDispatch } from 'react-redux';
import { selectTab } from 'redux/reducer/reducer';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Row, Button, Typography, Modal } from 'antd';

const { Title } = Typography;

interface VoucherModalProps {
  open: boolean;
  onCancel: () => void;
  detailId: string;
  title: string;
  description: string;
  img: string | null | undefined;
  start: string | undefined;
  end: string | undefined;
}

const VoucherModal: React.FC<VoucherModalProps> = ({
  open,
  onCancel,
  title,
  description,
  img,
  start,
  end,
}) => {
  const navigate = useNavigate(); // 페이지 이동
  const location = useLocation();
  const isMyPage = location.pathname === '/mypage';
  const dispatch = useDispatch();

  let descriptionNew = '';
  const descriptionSlice = description.split('<br>');
  if (descriptionSlice !== undefined) {
    descriptionNew = descriptionSlice[0];
  }

  const goMyPurchase = () => {
    dispatch(selectTab('구매 내역'));
    navigate('/mypage');
  };

  return (
    <Modal open={open} centered onCancel={onCancel} footer={null}>
      <Title level={1}>예약 확인증</Title>

      <Row justify="center" style={{ flexDirection: 'column' }}>
        <Row>
          <div>
            <div>
              <h2>공간이름</h2>
              <h3>{title}</h3>
              <img src={img || '이미지 없음'} alt="place img" />
            </div>
            <div>
              <h2>공간정보</h2>
              <div>{descriptionNew}</div>
            </div>
            <div>
              <h2>예약시간</h2>
              <span>
                <div></div>
                {start?.split('T')[0]} / {start?.split('T')[1].split(':')[0]}시
                ~ {end?.split('T')[1].split(':')[0]}시
              </span>
            </div>
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

          {!isMyPage && <Button onClick={goMyPurchase}>예약 목록 조회</Button>}
        </Row>
      </Row>
    </Modal>
  );
};

export default VoucherModal;
