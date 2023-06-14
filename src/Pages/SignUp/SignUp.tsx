import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from 'Components/Header/Header';
interface RequestBody {
  email: string; // 사용자 아이디 (필수!)
  password: string; // 사용자 비밀번호, 8자 이상 (필수!)
  passwordCheck: string; // 비밀번호 확인 값 추가
  displayName: string; // 사용자 이름, 20자 이하 (필수!)
  profileImgBase64?: string; // 사용자 프로필 이미지(base64) - jpg, jpeg, webp, png, gif, svg
}

interface ResponseData {
  accessToken: string; // 액세스 토큰
}

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); //페이지 이동

  async function handleSignIn() {
    navigate(`/signin`);
  }

  const headers = {
    'content-type': 'application/json',
    apikey: 'KDT5_nREmPe9B',
    username: 'KDT5_Team3',
  };

  //회원가입
  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    //비밀번호 확인
    if (password !== passwordCheck) {
      setMessage('비밀번호를 확인해주세요.');
      return;
    }

    const requestBody: RequestBody = {
      email,
      password,
      passwordCheck,
      displayName,
    };
    const res = await fetch(
      'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup',
      {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
      }
    );
    const json = await res.json();
    console.log(json);
    if (res.ok) {
      authenticate(json.accessToken);
    } else {
      setMessage(
        '회원가입에 실패하였습니다. 이메일과 비밀번호를 다시 확인해주세요.'
      );
    }
  }

  //인증
  async function authenticate(accessToken: string) {
    try {
      const res = await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me',
        {
          method: 'POST',
          headers: {
            ...headers,
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const json: ResponseData = await res.json();
      console.log(json);
      setMessage('회원가입이 완료되었습니다.');
    } catch (error) {
      console.error(error);
      setMessage('인증에 실패하였습니다');
    }
  }

  return (
    <div>
      <Header />
      <h1>회원가입</h1>
      <form onSubmit={handleSignUp}>
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          type="text"
          placeholder="UserName"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="아이디(email)"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="비밀번호"
        />
        <input
          value={passwordCheck}
          onChange={(e) => {
            setPasswordCheck(e.target.value);
          }}
          type="password"
          placeholder="비밀번호 확인"
        />
        <button type="submit">회원가입하기</button>
      </form>

      {message && (
        <>
          <h3>{message}</h3>
          {message !== '비밀번호를 확인해주세요.' && (
            <button onClick={handleSignIn}>로그인하기</button>
          )}
        </>
      )}
    </div>
  );
};

export default SignUp;
