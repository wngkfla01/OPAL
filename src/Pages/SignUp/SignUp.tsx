import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {
  signUpApi,
  authenticateApi,
  signUpRequestBody,
  authResponseData,
} from 'api';
import { Form, Input, Button, Typography, Col, Space } from 'antd';
import '../../Styles/Sign.scss';

const { Title, Text } = Typography;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const [cookies, setCookies] = useCookies(['accessToken']);
  const navigate = useNavigate(); //페이지 이동

  async function goToMain() {
    navigate(`/`);
  }
  //회원가입
  async function handleSignUp(event: FormEvent) {
    event.preventDefault();
    // 비밀번호 확인
    if (password !== passwordCheck) {
      setMessage('비밀번호가 일치하지 않습니다. 확인해주세요.');
      return;
    }
    const requestBody: signUpRequestBody = {
      email,
      password,
      passwordCheck,
      displayName,
    };

    try {
      const signUpData = await signUpApi(requestBody);
      await authenticateCheck(signUpData.accessToken);
      const accessToken = signUpData.accessToken;
      setCookies('accessToken', accessToken, { path: '/' });
      setMessage('회원가입 & 로그인이 완료되었습니다.');
    } catch (error) {
      setMessage('회원가입에 실패하였습니다. 이미 존재하는 아이디 입니다.');
    }
  }

  //인증
  async function authenticateCheck(accessToken: authResponseData) {
    try {
      await authenticateApi(accessToken);
    } catch (error) {
      setMessage('인증에 실패하였습니다.');
    }
  }
  return (
    <div className="inner">
      <div className="title">회원가입</div>
      <Space>
        <div className="container">
          <Col>
            <Form onSubmitCapture={handleSignUp}>
              <Form.Item>
                <Input
                  className="container__input"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  type="text"
                  placeholder="사용자 이름"
                  size="large"
                  required={true}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  className="container__input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="아이디(email)"
                  size="large"
                  required={true}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  className="container__input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="비밀번호"
                  size="large"
                  minLength={8}
                  required={true}
                />
              </Form.Item>
              <Form.Item>
                <Input
                  className="container__input"
                  value={passwordCheck}
                  onChange={(e) => setPasswordCheck(e.target.value)}
                  type="password"
                  placeholder="비밀번호 확인"
                  size="large"
                  minLength={8}
                  required={true}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  className="btn__sign btn"
                  type="primary"
                  htmlType="submit"
                >
                  회원가입하기
                </Button>
              </Form.Item>
            </Form>
          </Col>
          {message && (
            <>
              <Text>{message}</Text>
              {message !== '비밀번호가 일치하지 않습니다. 확인해주세요.' && (
                <Button onClick={goToMain}>메인으로 가기</Button>
              )}
            </>
          )}
        </div>
      </Space>
    </div>
  );
};

export default SignUp;
