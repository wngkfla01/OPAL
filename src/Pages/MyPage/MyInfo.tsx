import React, { useState } from 'react';
import { Image, Input, Button, Popconfirm } from 'antd';
const MyInfo: React.FC = () => {
  // 사용자가 수정하는 닉네임 및 아이디 관리 상태값입니다.
  // 초깃값은 redux에서 받아온걸로 주면 되고, 수정완료 버튼을 눌렀을때 최종 상태값을 redux로 다시 넘겨주시면 됩니다.
  const [nickName, setNickname] = useState('임시닉네임');
  const [username, setUsername] = useState('임시유저네임');
  // 닉네임과 아이디 input창 활성/비활성 상태를 컨트롤하기위한 상태값입니다.
  const [editProfile, setEditProfile] = useState(false);

  const cancelEditProfileHandler = () => {
    // 취소 버튼을 누르면, 편집중인 input이 disabled 되어야하며,
    // disabled된 input의 value값은 기존의 닉네임과 아이디로 다시 돌아와야합니다.
    setEditProfile(!editProfile);

    // >> 기존 닉네임과 아이디로 되돌아가는 코드 추가해야함 <<
  };
  const updateProfileHandler = () => {
    // 수정완료->수정완료 버튼을 누르면, 사용자가 변경한 닉네임과 아이디를 '프로필수정 api'로 전송해야 합니다.
    // >> 프로필수정 전송 코드 추가해야함 <<
    console.log('프로필수정!');
    // 전송이 완료되면, input창은 다시 disabled로 바뀌어야합니다.
    setEditProfile(!editProfile);
  };

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '0 100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{ width: '400px', height: '900px', border: '1px solid black' }}
      >
        <Image
          className="profile-image"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          alt="profileImg"
        />
        <Input
          addonBefore="닉네임"
          defaultValue={nickName}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
          allowClear={true}
          disabled={!editProfile}
        />
        <Input
          addonBefore="아이디"
          defaultValue={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          allowClear={true}
          disabled={!editProfile}
        />
        {editProfile === false ? (
          <Button
            type="primary"
            block
            onClick={() => setEditProfile(!editProfile)}
          >
            내 정보 수정
          </Button>
        ) : (
          <>
            <Popconfirm
              title="프로필 수정"
              description="정말 수정하시겠습니까?"
              onConfirm={updateProfileHandler}
              okText="수정완료"
              cancelText="취소"
            >
              <Button type="primary" block>
                수정완료
              </Button>
            </Popconfirm>
            <Button danger block onClick={cancelEditProfileHandler}>
              취소
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default MyInfo;
