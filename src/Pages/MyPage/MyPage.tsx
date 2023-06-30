import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTab, RootState } from 'redux/reducer/reducer';
import { Tabs } from 'antd';
import MyInfo from './MyInfo';
import MyAccount from './MyAccount';
import MyPurchase from './MyPurchase';
import { useCookies } from 'react-cookie';
import NotFound from 'Components/Common/NotFound';
import 'Styles/MyPage.scss';

const MyPage: React.FC = () => {
  const dispatch = useDispatch();
  const selectedTab = useSelector(
    (state: RootState) => state.tabSlice.selectedTab
  );

  const handleTabClick = (tab: string) => {
    dispatch(selectTab(tab));
  };
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  // interface TabsProps {}
  const items = [
    {
      key: '내 정보',
      label: `내 정보`,
      children: <MyInfo />,
    },
    {
      key: '내 계좌',
      label: `내 계좌`,
      children: <MyAccount />,
    },
    {
      key: '구매 내역',
      label: `구매 내역`,
      children: <MyPurchase />,
    },
  ];
  return (
    <>
      <div className="inner"></div>
      {accessToken ? (
        <div style={{ width: '1100px', margin: '50px auto' }}>
          <Tabs
            tabBarStyle={{
              fontSize: '20px',
              color: 'rgba(89, 80, 69, 1)',
              textAlign: 'center',
              border: 'none',
              margin: '0 auto',
              marginBottom: '40px',
            }}
            tabBarGutter={40}
            className="mypage"
            activeKey={selectedTab}
            onChange={(key: string) => handleTabClick(key)}
            type="line"
            items={items}
          />
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default MyPage;
