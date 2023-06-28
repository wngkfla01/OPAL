import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { allBuyProductApi } from 'api';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { selectTab } from 'redux/reducer/reducer';
import '../../Styles/QuickMenu.scss';

export default function QuickMenu() {
  const [cookies, , removeCookie] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;
  const [userData, setUserData] = useState<any>();
  const navigate = useNavigate(); //페이지 이동

  const dispatch = useDispatch();

  const goMyPurchase = () => {
    dispatch(selectTab('구매 내역'));
    navigate('/mypage');
  };

  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          const data = await allBuyProductApi(accessToken);
          const firstData = data[0];
          setUserData(firstData);
        } catch (error) {
          console.error('구매 내역이 없습니다:', error);
        }
      };

      fetchData();
    } else {
      removeCookie('accessToken');
    }
  }, [accessToken, removeCookie]);

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
              <a>{userData?.product.title}</a>
            </Card>
          </div>
        ) : null
      ) : null}
    </>
  );
}
