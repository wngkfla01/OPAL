import React, { useState, useEffect } from 'react';
import {
  accountListApi,
  connectAccountApi,
  deleteAccountApi,
  authResponseData,
  bankInquiryApi,
  AddCountReqBody,
  DelAccountReqBody,
  Account,
  Bank,
} from '../../api';
import { useCookies } from 'react-cookie';
import {
  Button,
  Modal,
  Select,
  Space,
  Input,
  Checkbox,
  Radio,
  Popconfirm,
} from 'antd';
import { useDispatch } from 'react-redux';

const { Option } = Select;

const SelectedAccount: React.FC = () => {
  const [totalBalance, setTotalBalance] = useState<number>();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [digits, setDigits] = useState(0);
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [signature, setSignature] = useState<boolean>(false);
  const [cookies] = useCookies(['accessToken']);
  const accessToken: authResponseData = cookies.accessToken;
  const [selectedAccount, setSelectedAccount] = useState(null);
  const dispatch = useDispatch();
  const showAccountModal = () => {
    setIsModalVisible(true);
    getBanksList();
  };
  useEffect(() => {
    getAccounts(accessToken);
  }, []);
  const getBanksList = async () => {
    const res = await bankInquiryApi(accessToken);
    setBanks(res);
  };

  async function getAccounts(accessToken: authResponseData) {
    try {
      const res = await accountListApi(accessToken);
      setTotalBalance(res.totalBalance);
      setAccounts(res.accounts);
    } catch (e) {
      console.log(e);
    }
    setSelectedBank('');
    setAccountNumber('');
    setPhoneNumber('');
    setSignature(false);
  }
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

  function sumDigits(digitsArray: number[]) {
    let sum = 0;
    for (let i = 0; i < digitsArray.length; i++) {
      sum += digitsArray[i];
    }
    return sum;
  }
  const addNewAccount = async () => {
    try {
      const body: AddCountReqBody = {
        bankCode: code,
        accountNumber: accountNumber,
        phoneNumber: phoneNumber,
        signature: signature,
      };
      await connectAccountApi(accessToken, body);
      setIsModalVisible(false);
      getAccounts(accessToken);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteAccount = async (params: any, e: any) => {
    e.preventDefault();
    const accountId = params.id;
    const body: DelAccountReqBody = {
      accountId: accountId,
      signature: true,
    };
    await deleteAccountApi(accessToken, body);
    getAccounts(accessToken);
  };

  const handleAccountChange = (e: any) => {
    setSelectedAccount(e.target.value);
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
        <Radio.Group onChange={handleAccountChange} value={selectedAccount}>
          {accounts &&
            accounts.map((account, index) => (
              <Radio key={account.id} value={account.id}>
                <div
                  style={{
                    display: 'grid',
                    width: '100%',
                    padding: '30px',
                    gridTemplateColumns: '22% 33% 28% 17%',
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
              </Radio>
            ))}
        </Radio.Group>
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
          <Button
            key="submit"
            type="primary"
            onClick={addNewAccount}
            disabled={signature ? false : true}
          >
            계좌 등록 완료하기
          </Button>,
        ]}
      >
        <div>
          <Space direction="horizontal">
            <div>
              <span>1. 은행 선택</span>
              <Select
                value={selectedBank || null}
                onChange={(value) => {
                  const parsedValue = JSON.parse(value);
                  setCode(parsedValue.code);
                  setSelectedBank(parsedValue.name);
                  setDigits(sumDigits(parsedValue.digits));
                }}
                placeholder="선택"
                style={{ width: '130px' }}
              >
                {banks.map((bank, index) => (
                  <Option
                    value={JSON.stringify({
                      name: bank.name,
                      code: bank.code,
                      digits: bank.digits,
                    })}
                    key={index}
                    disabled={bank.disabled}
                  >
                    {bank.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div>
              <span>2. 계좌번호 입력</span>
              <Input
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                disabled={selectedBank ? false : true}
                placeholder="-를 제외한 숫자만 입력해 주세요."
              />
            </div>
          </Space>
          <div>
            <span>3. 휴대폰 번호 입력</span>
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="-를 제외한 숫자만 입력해 주세요."
              disabled={
                accountNumber.length === digits && isValidAccountNumber
                  ? false
                  : true
              }
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            개인정보 저장에 동의합니다
            <Checkbox
              disabled={
                phoneNumber.length === 11 && isValidPhoneNumber ? false : true
              }
              checked={signature}
              onChange={() => setSignature(!signature)}
            ></Checkbox>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SelectedAccount;