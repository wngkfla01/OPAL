import React, { useState, useEffect } from 'react';
import { Input, Button, Popconfirm } from 'antd';
import { useCookies } from 'react-cookie';
import { authenticateApi, userModifyApi, userModifyRequestBody } from 'api';

const MyInfo: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [defaultEmail, setDefaultEmail] = useState(''); //처음 불러오는 이메일

  const [defaultName, setDefaultName] = useState(''); //처음 불러오는 닉네임
  const [displayName, setDisplayName] = useState(defaultName);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [editProfile, setEditProfile] = useState(false); //편집 수정모드

  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await authenticateApi(accessToken);
        setDefaultName(userData.displayName);
        setDefaultEmail(userData.email);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  //취소버튼을 눌렀을 때
  const cancelEditProfileHandler = () => {
    setDisplayName(defaultName);
    setEditProfile(!editProfile);
  };

  //수정완료 버튼을 눌렀을 때
  const updateProfileHandler = async () => {
    setDisplayName(defaultName);
    setOldPassword(oldPassword);
    setNewPassword(newPassword);

    const requestBody: userModifyRequestBody = {
      displayName: displayName || defaultName,
      oldPassword,
      newPassword,
    };
    try {
      await userModifyApi(accessToken, requestBody);
    } catch (error) {
      console.log(error);
    }
    setEditProfile(!editProfile);
    window.location.reload();
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
      {defaultName.length === 0 ? (
        isLoading
      ) : (
        <div
          style={{ width: '400px', height: '500px', border: '1px solid black' }}
        >
          <Input
            addonBefore="닉네임"
            value={displayName || defaultName}
            onChange={(e) => {
              setDisplayName(e.target.value);
            }}
            allowClear={true}
            disabled={!editProfile}
          />
          <Input
            addonBefore="아이디"
            type="email"
            defaultValue={defaultEmail}
            allowClear={true}
            disabled
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
              <Input
                addonBefore="기존 비밀번호 입력"
                type="password"
                onChange={(e) => {
                  setOldPassword(e.target.value);
                }}
                allowClear={true}
                disabled={!editProfile}
                minLength={8}
              />
              <Input
                addonBefore="새 비밀번호 입력"
                type="password"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                allowClear={true}
                disabled={!editProfile}
                minLength={8}
              />
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
      )}
    </div>
  );
};

export default MyInfo;
