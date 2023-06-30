import React from 'react';
import { useDispatch } from 'react-redux';
import { selectTab } from 'redux/reducer/reducer';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Row, Button, Modal } from 'antd';
import '../../Styles/Modal.scss';

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
    <Modal
      width={800}
      // style={{ justifyContent: 'center' }}
      open={open}
      footer={null}
      centered
      onCancel={onCancel}
      className="voucherModal"
    >
      <div className="modal__title">예약 확인증</div>

      <Row className="voucherModal__row">
        <div>
          <div className="voucherModal__info">
            <h3 className="voucherModal__info-title">{title}</h3>
            <img
              className="voucherModal__info-img"
              width={450}
              src={img || '이미지 없음'}
              alt="place img"
            />
          </div>
          <div className="voucherModal__info">
            <h2 className="voucherModal__info-title">공간정보</h2>
            <div className="voucherModal__info-item">{descriptionNew}</div>
          </div>
          <div className="voucherModal__info">
            <h2 className="voucherModal__info-title">예약시간</h2>
            <span className="voucherModal__info-item">
              {start?.split('T')[0]} / {start?.split('T')[1].split(':')[0]}시 ~{' '}
              {end?.split('T')[1].split(':')[0]}시
            </span>
          </div>
        </div>
      </Row>
      <Row className="voucherModal__btn">
        <Button className="btn">
          <Link to="/">메인 페이지로 이동</Link>
        </Button>

        {!isMyPage && (
          <Button className="btn btn__purchaseList" onClick={goMyPurchase}>
            예약 목록 조회
          </Button>
        )}
      </Row>
    </Modal>
  );
};

export default VoucherModal;
