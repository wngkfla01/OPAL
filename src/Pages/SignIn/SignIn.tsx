import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

interface RequestBody {
  email: string; // 사용자 아이디 (필수!)
  password: string; // 사용자 비밀번호 (필수!)
}

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); //페이지 이동

  async function handleSignUp() {
    navigate(`/signup`);
  }

  const headers = {
    'content-type': 'application/json',
    apikey: 'KDT5_nREmPe9B',
    username: 'KDT5_Team3',
  };

  async function handleSignIn(event: FormEvent) {
    event.preventDefault();
    const requestBody: RequestBody = { email, password };
    const res = await fetch(
      'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login',
      {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
      }
    );
    const json = await res.json();
    console.log(json);
    if (res.ok) {
      localStorage.setItem('token', json.accessToken);
      navigate(`/`);
    } else {
      setMessage(
        '로그인에 실패하였습니다. 이메일과 비밀번호를 다시 확인해주세요'
      );
    }
  }

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSignIn}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <button type="submit">로그인</button>
      </form>
      <button>아이디/비밀번호 찾기</button>
      <button onClick={handleSignUp}>회원 가입</button>
      {message && <h3>{message}</h3>}
    </div>
  );
};

export default SignIn;
