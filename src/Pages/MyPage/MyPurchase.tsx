import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Button } from 'antd';

const MyPurchase: React.FC = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    getPurchase();
  }, []);
  console.log('dddd');

  type PurchaseDetail = TransactionDetail[]; // 모든 거래 내역의 목록

  interface TransactionDetail {
    // 거래 내역 정보
    detailId: string; // 거래 내역 ID
    product: {
      // 거래한 제품 정보
      productId: string;
      title: string;
      price: number;
      description: string;
      tags: string[];
      thumbnail: string | null;
      discountRate: number; // 제품 할인율
    };
    reservation: Reservation | null; // 거래한 제품의 예약 정보
    timePaid: string; // 제품을 거래한 시간
    isCanceled: boolean; // 거래 취소 여부
    done: boolean; // 거래 완료 여부
  }

  interface Reservation {
    start: string; // 예약 시작 시간
    end: string; // 예약 종료 시간
    isCanceled: boolean; // 예약 취소 여부
    isExpired: boolean; // 예약 만료 여부
  }

  const headers = {
    'content-type': 'application/json',
    apikey: 'KDT5_nREmPe9B',
    username: 'KDT5_Team3',
    Authorization:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQzUFAyeDN5MzRMcUhsdlRIOXE0IiwiaWF0IjoxNjg3NDE1ODAwLCJleHAiOjE2ODc1MDIyMDAsImlzcyI6InRoZXNlY29uQGdtYWlsLmNvbSJ9.uhDjZ10DH98UzJyGvONHqfAQuFWaVM8r-8hGaH9KYoQ',
  };

  const getPurchase = async () => {
    try {
      const res = await axios.get(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/details',
        { headers }
      );
      setPurchases(res.data);
      console.log('res전체밥그릇: ', res);
    } catch (e) {
      console.log(e);
    }
  };
  console.log('purchases밥그릇: ', purchases);

  return (
    <div>
      <div>
        <h3>현재 예약 현황</h3>
        <div style={{ border: '1px solid black' }}>
          <h4>공간이름</h4>
          <div style={{ display: 'flex', height: '40px' }}>
            <div style={{ width: '40%', border: '1px solid black' }}>
              서울 강남구
            </div>
            <div
              style={{
                width: '60%',

                border: '1px solid black',
              }}
            >
              <span>0000년 00월 00일</span>
              <span>12시~13시 10명</span>
            </div>
          </div>
          <Button block>예약 취소</Button>
        </div>
      </div>
      <div>
        <div style={{ border: '1px solid black', height: '30px' }}>
          <span>이용 완료 내역</span>
          <span>1개월 | 6개월 | 전체조회</span>
        </div>
        <div style={{ border: '1px solid black', height: '500px' }}>
          <div>
            <h4>공간이름</h4>
            <div style={{ display: 'flex', height: '40px' }}>
              <div style={{ width: '40%', border: '1px solid black' }}>
                서울 강남구
              </div>
              <div
                style={{
                  width: '60%',
                  border: '1px solid black',
                }}
              >
                <span>0000년 00월 00일</span>
                <span>12시~13시 10명</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ border: '1px solid black', height: '50px' }}>
        페이지네이션
      </div>
    </div>
  );
};

export default MyPurchase;
