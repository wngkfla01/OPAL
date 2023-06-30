import React, { useState, useEffect } from 'react';
import { Button, Popconfirm } from 'antd';
import { useCookies } from 'react-cookie';
import { authenticateApi, userModifyApi, userModifyRequestBody } from 'api';
import 'Styles/MyInfo.scss';

const MyInfo: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [defaultEmail, setDefaultEmail] = useState(''); //처음 불러오는 이메일

  const [defaultName, setDefaultName] = useState(''); //처음 불러오는 닉네임
  const [displayName, setDisplayName] = useState('');
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
        setDisplayName(userData.displayName);
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
    <div className="myinfo">
      {defaultName.length === 0 ? (
        isLoading
      ) : (
        <div className="myinfo__container">
          <div className="myinfo__input">
            <label className="myinfo__input--label">닉네임</label>
            <input
              className="myinfo__input--input"
              value={displayName}
              onChange={(e) => {
                setDisplayName(e.target.value);
              }}
              disabled={!editProfile}
            />
          </div>
          <div className="myinfo__input">
            <label className="myinfo__input--label">아이디</label>
            <input
              className="myinfo__input--input"
              type="email"
              defaultValue={defaultEmail}
              disabled
            />
          </div>
          {editProfile === false ? (
            <Button
              className="btn"
              style={{ textAlign: 'center' }}
              type="primary"
              block
              onClick={() => setEditProfile(!editProfile)}
            >
              내 정보 수정
            </Button>
          ) : (
            <>
              <div className="myinfo__input">
                <label className="myinfo__input--label">비밀번호 입력</label>
                <input
                  className="myinfo__input--input"
                  type="password"
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                  disabled={!editProfile}
                  minLength={8}
                />
              </div>
              <div className="myinfo__input">
                <label className="myinfo__input--label">새 비밀번호 입력</label>
                <input
                  className="myinfo__input--input"
                  type="password"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                  disabled={!editProfile}
                  minLength={8}
                />{' '}
              </div>
              <Popconfirm
                className="btn"
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
              <Button
                className="btn"
                danger
                block
                onClick={cancelEditProfileHandler}
              >
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
