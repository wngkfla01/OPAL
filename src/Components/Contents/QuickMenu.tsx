import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { allBuyProductApi } from 'api';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { selectTab } from 'redux/reducer/reducer';
import VoucherModal from 'Components/Contents/VoucherModal';
import '../../Styles/QuickMenu.scss';

export default function QuickMenu() {
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;
  const [userData, setUserData] = useState<any>();
  const navigate = useNavigate(); //페이지 이동

  const [isOpenVoucher, setIsOpenVoucher] = useState<boolean>(false);
  const [voucherModalDetailId, setVoucherModalDetailId] = useState<string>('');
  const [voucherModalTitle, setVoucherModalTitle] = useState<string>('');
  const [voucherModalDes, setVoucherModalDes] = useState<string>('');
  const [voucherModalImg, setVoucherModalImg] = useState<
    string | null | undefined
  >('');
  const [voucherModalSt, setVoucherModalSt] = useState<string | undefined>();
  const [voucherModalEn, setVoucherModalEn] = useState<string | undefined>();

  const dispatch = useDispatch();

  const goMyPurchase = () => {
    dispatch(selectTab('구매 내역'));
    navigate('/mypage');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await allBuyProductApi(accessToken);
      setUserData(
        data.filter(
          (purchase) =>
            !purchase.done &&
            !purchase.isCanceled &&
            !purchase.reservation?.isExpired
        )[0]
      );
    } catch (error) {
      console.error('구매 내역이 없습니다:', error);
    }
  };

  const openVoucherModal = (
    detailId: string,
    title: string,
    description: string,
    img: string | null | undefined,
    start: string | undefined,
    end: string | undefined
  ) => {
    setVoucherModalDetailId(detailId);
    setVoucherModalTitle(title);
    setVoucherModalDes(description);
    setVoucherModalImg(img);
    setVoucherModalSt(start);
    setVoucherModalEn(end);
    setIsOpenVoucher(true);
  };
  const closeVoucherModal = () => {
    setIsOpenVoucher(false);
  };

  return (
    <>
      {accessToken ? (
        userData ? (
          <div className="QuickMenu-inner">
            <Card
              title="다가오는 예약"
              className="QuickMenu-container"
              extra={<a onClick={goMyPurchase}>+ 더보기</a>}
            >
              <a
                onClick={() =>
                  openVoucherModal(
                    userData.detailId,
                    userData.product.title,
                    userData.product.description,
                    userData.product.thumbnail,
                    userData.reservation?.start,
                    userData.reservation?.end
                  )
                }
              >
                {userData?.product.title}
              </a>
              <VoucherModal
                open={isOpenVoucher}
                onCancel={closeVoucherModal}
                detailId={voucherModalDetailId}
                title={voucherModalTitle}
                description={voucherModalDes}
                img={voucherModalImg}
                start={voucherModalSt}
                end={voucherModalEn}
              />
            </Card>
          </div>
        ) : null
      ) : null}
    </>
  );
}
