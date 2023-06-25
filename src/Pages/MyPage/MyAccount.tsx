import React, { useState, useEffect } from 'react';
import { accountListApi, authResponseData } from '../../api';
import axios, { AxiosResponse } from 'axios';
import { useCookies } from 'react-cookie';
import {
  Button,
  Modal,
  Select,
  Space,
  Input,
  Checkbox,
  Popconfirm,
} from 'antd';

const { Option } = Select;

const MyAccount: React.FC = () => {
  const [totalBalance, setTotalBalance] = useState<number>();
  const [accounts, setAccounts] = useState<Bank[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [signature, setSignature] = useState<boolean>(false);
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;

  console.log('토큰: ', accessToken);
  // interface
  interface GetAccountsResVal {
    totalBalance: number; // 사용자 계좌 잔액 총합
    accounts: Bank[]; // 사용자 계좌 정보 목록
  }

  interface Bank {
    // 사용자 계좌 정보
    id: string; // 계좌 ID
    bankName: string; // 은행 이름
    bankCode: string; // 은행 코드
    accountNumber: string; // 계좌 번호
    balance: number; // 계좌 잔액
  }

  interface AddCountReqBody {
    bankCode: string; // 연결할 은행 코드 (필수!)
    accountNumber: string; // 연결할 계좌번호 (필수!)
    phoneNumber: string; // 사용자 전화번호 (필수!)
    signature: boolean; // 사용자 서명 (필수!)
  }

  interface DelAccountReqBody {
    accountId: string; // 계좌 ID (필수!)
    signature: boolean; // 사용자 서명 (필수!)
  }

  const showAccountModal = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    getAccounts;
  }, []);

  const headers = {
    'content-type': 'application/json',
    apikey: 'KDT5_nREmPe9B',
    username: 'KDT5_Team3',
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IldBM3NEMENYOXJzYjJWWTZIdkVGIiwiaWF0IjoxNjg3NDIzNzE2LCJleHAiOjE2ODc1MTAxMTYsImlzcyI6InRoZXNlY29uQGdtYWlsLmNvbSJ9.e-45zyRPHG9ceUVsyanIk5k188v6uFUHQG8hzyhv0UE',
  };

  const getAccounts = async (accessToken: authResponseData) => {
    try {
      const res = await accountListApi();
      console.log(res);
      // const data: GetAccountsResVal = res.data;
      // setTotalBalance(data.totalBalance);
      // setAccounts(data.accounts);
    } catch (e) {
      console.log(e);
    }
    setSelectedBank('');
    setAccountNumber('');
    setPhoneNumber('');
    setSignature(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedBank('');
    setAccountNumber('');
    setPhoneNumber('');
    setSignature(false);
  };

  // 계좌 등록 Modal창 숫자 입력값 체크
  const numberRegex = /^\d+$/;
  const isValidAccountNumber = numberRegex.test(accountNumber);
  const isValidPhoneNumber = numberRegex.test(phoneNumber);

  const addNewAccount = async () => {
    if (
      selectedBank &&
      isValidAccountNumber &&
      isValidPhoneNumber &&
      signature
    ) {
      try {
        const data: AddCountReqBody = {
          bankCode: selectedBank,
          accountNumber: accountNumber,
          phoneNumber: phoneNumber,
          signature: signature,
        };
        const res = await axios.post(
          'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account',
          data,
          { headers }
        );
        setIsModalVisible(false);
        getAccounts;
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('모든 값을 정확하게 입력해 주세요.');
    }
  };

  const deleteAccount = async (params: any, e: any) => {
    e.preventDefault();
    console.log(params);
    const accountId = params.id;
    const data: DelAccountReqBody = {
      accountId: accountId,
      signature: true,
    };
    const res = await axios.delete(
      'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account',
      {
        data: data,
        headers: headers,
      }
    );
    console.log(res.data);

    getAccounts;
  };

  return (
    <div style={{ textAlign: 'center', padding: '0 100px' }}>
      <h2>내 계좌 목록</h2>
      <div
        style={{
          border: '1px solid black',
          margin: '20px 0',
        }}
      >
        <h3>내 계좌 총 잔액: {totalBalance}원</h3>
        {accounts &&
          accounts.map((account, index) => (
            <div
              style={{
                display: 'grid',
                width: '100%',
                padding: '30px',
                gridTemplateColumns: '15% 30% 20% 20%',
                columnGap: '20px',
              }}
              key={index}
            >
              <span style={{ border: '1px solid black' }}>
                {account.bankName}
              </span>
              <span style={{ border: '1px solid black' }}>
                {account.accountNumber}
              </span>
              <span style={{ border: '1px solid black' }}>
                잔액: {account.balance}원
              </span>
              <Popconfirm
                title="계좌 삭제"
                description="계좌 정보가 삭제됩니다. 계속하시겠습니까?"
                onConfirm={(e) => deleteAccount(account, e)}
                okText="삭제하기"
                cancelText="취소"
              >
                <Button type="primary" danger>
                  삭제
                </Button>
              </Popconfirm>
            </div>
          ))}
      </div>
      <Button type="primary" block size="large" onClick={showAccountModal}>
        계좌 등록
      </Button>

      {/* 계좌 등록 버튼 클릭시 나타나는 Modal */}
      <Modal
        title="새로운 계좌등록"
        open={isModalVisible}
        centered
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={addNewAccount}>
            계좌 등록 완료하기
          </Button>,
        ]}
      >
        <div>
          <Space direction="horizontal">
            <div>
              <span>은행을 선택해 주세요.</span>
              <Select
                value={selectedBank || null}
                onChange={(value: string) => setSelectedBank(value)}
                placeholder="은행선택"
                style={{ width: '130px' }}
              >
                <Option value="004">KB국민은행</Option>
                <Option value="088">신한은행</Option>
                <Option value="020">우리은행</Option>
                <Option value="081">하나은행</Option>
                <Option value="089">케이뱅크</Option>
                <Option value="090">카카오뱅크</Option>
                <Option value="011">NH농협은행</Option>
              </Select>
            </div>
            <div>
              <span>-를 제외한 숫자만 입력해 주세요.</span>
              <Input
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="계좌번호입력"
              />
            </div>
          </Space>
          <div>
            <span>-를 제외한 숫자만 입력해주세요.</span>
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="전화번호입력"
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            개인정보 저장에 동의합니다
            <Checkbox
              checked={signature}
              onChange={() => setSignature(!signature)}
            ></Checkbox>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyAccount;
