import React, { useState } from 'react';
import { Button, Card, Image } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer/reducer';
import { productPaymentApi, PaymentRequestBody, accountListApi } from 'api';
import { useCookies } from 'react-cookie';
import styles from 'Styles/ProductPayment.module.scss';
import SelectionAccount from 'Components/Contents/SelectionAccount';

const ProductPayment = () => {
  const pickedAccount = useSelector(
    (state: RootState) => state.selectAccountSlice.pickedAccount
  );
  console.log('account? :', pickedAccount);
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;
  const dateTimeOption = useSelector(
    (state: RootState) => state.reserveOptionSlice
  );
  const guestsOption = useSelector((state: RootState) => state.guestsSlice);
  const product = useSelector((state: RootState) => state.productSlice);
  const productAddress = ['서울특별시 강남구 강남대로 364', '11층 11E 공간'];

  // 선택한 예약 날짜 및 시간에서 날짜만 반환
  const reserveStartDate = dateTimeOption.start.split('T')[0];
  const reserveEndDate = dateTimeOption.end.split('T')[0];

  const formatStartDate = new Date(reserveStartDate);
  const formatEndDate = new Date(reserveEndDate);

  const startYear = formatStartDate.getFullYear();
  const startMonth = formatStartDate.getMonth() + 1;
  const startDay = formatStartDate.getDate();

  const endYear = formatEndDate.getFullYear();
  const endMonth = formatEndDate.getMonth() + 1;
  const endDay = formatEndDate.getDate();

  const formattedStartDate = `${startYear}년 ${startMonth}월 ${startDay}일`;
  const formattedEndDate = `${endYear}년 ${endMonth}월 ${endDay}일`;

  // 선택한 예약 입실 시간, 퇴실 시간 반환
  const reserveStartTime = dateTimeOption.start.split('T')[1].split(':')[0];
  const reserveEndTime = dateTimeOption.end.split('T')[1].split(':')[0];

  const handlePayment = async () => {
    // 계좌 목록 및 잔액 조회
    const accountList = await accountListApi(accessToken);
    console.log('accountList: ', accountList);
    if (pickedAccount.length === 0 && accountList.accounts.length !== 0) {
      alert('결제하실 계좌를 선택해 주세요.');
    } else if (accountList.accounts.length === 0) {
      alert(
        '등록된 계좌가 없습니다.[계좌 등록]버튼을 눌러 계좌를 추가해 주세요.'
      );
    } else if (
      accountList.accounts.length !== 0 &&
      pickedAccount.length !== 0
    ) {
      try {
        const requestBody: PaymentRequestBody = {
          productId: product.id,
          accountId: pickedAccount,
          reservation: {
            start: dateTimeOption.start,
            end: dateTimeOption.end,
          },
        };
        console.log('request? :', requestBody);

        // 제품(공간) 구매 신청(결제)
        const paymentResult = await productPaymentApi(accessToken, requestBody);
        console.log(paymentResult);
      } catch {
        alert('결제실패');
      }
    }

    // !accountList ? console.log('계좌를 등록해야 합니다!') : null;

    // setSelectedAccount(
    //   accountList.accounts.find(
    //     (account: any) => account.id === selectedAccount
    //   )
    // );

    // !selectedAccount ? console.log('계좌를 선택해야 합니다!') : null;

    // if (paymentResult) {
    //   console.log('결제에 성공했습니다!');
    // } else {
    //   console.log('결제에 실패했습니다!');
    // }
  };

  return (
    <main className={styles.inner}>
      <Card
        title={
          <div className={styles.preview__title}>
            <h1>예약 희망 옵션 확인</h1>
            <p>선택한 옵션이 맞는지 확인해 주세요</p>
          </div>
        }
        bordered={true}
        headStyle={{ height: '130px' }}
        bodyStyle={{ height: '420px' }}
      >
        <figure className={styles.preview__card}>
          <Image
            width={500}
            height={350}
            preview={false}
            src={product.thumbnail as string}
            className={styles.product__img}
            alt={'공간 이미지'}
          />
          <div className={styles.product__info}>
            <h1>{product.title}</h1>
            <div>
              {/* 제품(공간) 주소 출력 */}
              {productAddress.map((item, i) => (
                <p key={i}>{productAddress[i]}</p>
              ))}
            </div>
            <div className={styles.product__reserve}>
              <p>예약 날짜 : {formattedStartDate}</p>
              <p>
                예약 시간 : <br />
                {formattedStartDate} {reserveStartTime}시<br />~{' '}
                {formattedEndDate} {reserveEndTime}시 (
                {dateTimeOption.timeDiffer}시간)
              </p>
              <p>예약 인원 : {guestsOption.guests}명</p>
              <p>
                가격 : {(product.price * guestsOption.guests).toLocaleString()}
                원
              </p>
            </div>
          </div>
        </figure>
      </Card>

      <h1 style={{ textAlign: 'center' }}>결제하기</h1>

      <Card
        title={'계좌정보'}
        bordered={true}
        headStyle={{ height: '130px' }}
        bodyStyle={{ height: '250px' }}
      >
        <SelectionAccount />
        <Button
          type="primary"
          size="large"
          style={{ width: '50%' }}
          onClick={handlePayment}
        >
          결제하기
        </Button>
      </Card>
    </main>
  );
};

export default ProductPayment;
