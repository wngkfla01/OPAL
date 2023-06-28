import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTab, RootState } from 'redux/reducer/reducer';
import { Tabs } from 'antd';
import MyInfo from './MyInfo';
import MyAccount from './MyAccount';
import MyPurchase from './MyPurchase';

const MyPage: React.FC = () => {
  // useSelector와 useDispatch는 React Redux 라이브러리에서 제공하는 훅(Hook)으로, Redux 상태 관리와 액션 디스패치를 간편하게 처리할 수 있도록 도와줍니다.

  // 1. 'useSelector'
  // - useSelector 훅은 Redux 상태(store)에서 필요한 상태값을 선택(select)하는 데 사용됩니다.
  // - useSelector은 컴포넌트 내부에서 Redux 상태를 읽을 수 있게 해주며, 상태 값의 변경을 감지하여 해당 컴포넌트를 리렌더링합니다.
  // - 사용법: const selectedData = useSelector((state) => state.data);
  // - 위 예제에서 state는 Redux 스토어의 상태 객체를 의미하고, state.data는 스토어 상태에서 data 속성을 선택한 것입니다.
  // - useSelector의 콜백 함수는 선택한 상태 값을 반환하고, 해당 값은 컴포넌트 내부에서 사용할 수 있습니다.

  // 2. 'useDispatch'
  // - useDispatch 훅은 Redux 액션을 디스패치(dispatch)하는 데 사용됩니다.
  // - useDispatch를 사용하여 액션을 디스패치하면, 액션은 리듀서에 전달되어 상태를 업데이트하고, 이에 따라 컴포넌트가 리렌더링될 수 있습니다.
  // - 사용법: const dispatch = useDispatch();
  // - dispatch를 이용하여 액션을 디스패치할 수 있으며, 액션은 일반적으로 객체 형태로 정의되고, dispatch(action) 형태로 사용됩니다.
  // - 액션을 디스패치하는 것은 상태 변경을 트리거하는 역할을 하므로, 상태 업데이트나 비동기 작업을 처리하는 데 사용됩니다.
  const dispatch = useDispatch();
  const selectedTab = useSelector(
    (state: RootState) => state.tabSlice.selectedTab
  );

  const handleTabClick = (tab: string) => {
    dispatch(selectTab(tab));
  };

  return (
    <div style={{ width: '1100px', margin: '50px auto' }}>
      <div style={{ border: '1px solid black' }}>
        <Tabs
          activeKey={selectedTab}
          onChange={(key: string) => handleTabClick(key)}
          type="card"
          items={['내 정보', '내 계좌', '구매 내역'].map((title) => {
            return {
              label: `${title}`,
              key: title,
              children:
                selectedTab === '내 정보' ? (
                  <MyInfo />
                ) : selectedTab === '내 계좌' ? (
                  <MyAccount />
                ) : (
                  <MyPurchase />
                ),
            };
          })}
        />
      </div>
    </div>
  );
};

export default MyPage;
