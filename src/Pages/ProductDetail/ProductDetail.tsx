import React, { useEffect, useState } from 'react';
import {
  Carousel,
  Button,
  Space,
  Card,
  DatePicker,
  TimePicker,
  Modal,
  ConfigProvider,
  InputNumber,
  DatePickerProps,
} from 'antd';
import { productDetailApi } from 'api';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  updateProductDetail,
  selectedDate,
  selectedTime,
  selectedGuests,
} from 'redux/reducer/reducer';
import { useCookies } from 'react-cookie';
import styles from 'Styles/ProductDetail.module.scss';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import locale from 'antd/locale/ko_KR';

// dayjs 라이브러리 한글화
dayjs.locale('ko');

// 예약 날짜
interface SelectedDate {
  date: string;
}

// 예약 시간
interface SelectedTime {
  start: string;
  end: string;
  timeDiffer: string;
}

// 예약 인원
interface SelectedGuests {
  guests: number;
}

// ProductDetail 컴포넌트
const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [cookies] = useCookies(['accessToken']);
  const accessToken = cookies.accessToken;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const product = useSelector((state: RootState) => state.productSlice);
  const productAddress = ['서울특별시 강남구 강남대로 364', '11층 11E 공간'];

  // 제품의 tags를 가져와 해시태그 기호를 붙여 출력
  const hashTags = product.tags.map((tag) => `#${tag}`);

  // antd DatePicker - 예약 날짜
  const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
    const isoDate = date?.toISOString();
    dispatch(selectedDate(dateString as any));
    console.log('iso형식은', isoDate); // heropy와 동일함
    console.log('dateString은', dateString); // 2023-06-21
  };

  // antd TimePicker - 예약 시간
  const onChangeTime = (
    values: [Dayjs | null, Dayjs | null],
    timeString: [string, string]
  ) => {
    // 선택한 입실 시간을 toISOString() 함수로 출력할 경우 UTC 기준 시간으로 반환함
    // antd에서 사용하고 있는 dayjs의 add() 메서드로 9시간을 추가하여
    // 대한민국 서울 기준(UTC+9) 시간으로 toISOString() 함수 적용
    const isoStartTimeString = values[0]?.add(9, 'hour').toISOString();
    const isoEndTimeString = values[1]?.add(9, 'hour').toISOString();

    // dayjs의 diff() 메서드로 선택한 입실 시간과 퇴실 시간의 시간차를 반환하지만
    // JavaScript의 Date 객체는 milliseconds 단위로 시간을 저장하기 때문에,
    // diff() 메서드의 결과값이 밀리초 단위 때문에 정확하게 나오지 않을 수 있음
    // 1시간을 밀리초로 변환하는 값으로 나누고, toFixed() 메서드로 소수점 자르기
    // 1,000ms(=1초) * 60s(=1분) * 60m(=1시간) => 1시간을 ms로 변환
    const timeOfUse = (
      (values[1]?.diff(values[0]) as number) /
      (1000 * 60 * 60)
    ).toFixed(0);

    dispatch(selectedTime(timeString as any));
    dispatch(selectedTime(timeOfUse as any));
  };

  // antd InputNumber - 예약 인원
  const onChangePerson = (value: 1 | 50 | null) => {
    dispatch(selectedGuests(value as any));
    console.log('예약 인원은? ', value);
  };

  // 제품의 description을 가져와 문자열에 포함된 <br>을 기준으로 나누고 빈 문자열만 제거
  const productInfo = (product.description || '')
    .split('<br>')
    .filter((item) => item !== '');

  // productInfo에서 '상세정보', '시설안내'의 인덱스 번호 찾기
  const detailedInfoIndex = productInfo.findIndex(
    (item) => item === '상세정보'
  );
  const facilityInfoIndex = productInfo.findIndex(
    (item) => item === '시설안내'
  );

  // productInfo에서 '상세정보', '시설안내'에 해당하는 내용만 출력
  const detailedInfo = productInfo.slice(
    detailedInfoIndex + 1,
    facilityInfoIndex
  );
  const facilityInfo = productInfo.slice(facilityInfoIndex + 1);

  // antd Modal - 예약하기 버튼
  const showLoginModal = () => {
    setIsModalOpen(true);
  };

  // 예약하기 버튼 클릭 시 비로그인 상태라면 로그인이 필요함을 안내하고 로그인 페이지로 이동
  const handleOk = async () => {
    await navigate('/signin');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleProductPayment = () => {
    accessToken ? navigate('/productpayment') : showLoginModal();
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDetailData = await productDetailApi(id as string);
        dispatch(updateProductDetail(productDetailData));
      } catch (error) {
        console.log(error as Error);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <main className={styles.inner}>
      <div className={styles.title}>{product.title}</div>
      <Carousel autoplay>
        <div>
          <img
            src={product.thumbnail as string}
            alt="공간 썸네일 이미지"
            className={styles.product__img}
          />
        </div>
        <div>
          <img
            src={product.photo as string}
            alt="공간 상세 이미지"
            className={styles.product__img}
          />
        </div>
      </Carousel>

      <aside className={styles.tags__container}>
        {hashTags.map((tag, i) => (
          <Space wrap key={i}>
            <Button
              type="primary"
              shape="round"
              size={'large'}
              className={styles.product__tag}
            >
              <span>{hashTags[i]}</span>
            </Button>
          </Space>
        ))}
      </aside>

      <Card
        title={
          <div className={styles.product__title}>
            <h1>{product.title}</h1>
            <p style={{ fontSize: '20px' }}>
              {product.description.split('<br>')[0]}
            </p>
          </div>
        }
        bordered={false}
        headStyle={{ height: '130px' }}
        bodyStyle={{ height: '250px', fontSize: '18px' }}
        className={styles.product__card}
      >
        <Card.Grid
          hoverable={false}
          style={{ width: '30%' }}
          className={styles.card__container}
        >
          <div>
            {/* 제품(공간) 장소 출력 */}
            <h3 className={styles.product__address}>주소</h3>
            {productAddress.map((item, i) => (
              <p key={i}>{productAddress[i]}</p>
            ))}
          </div>
        </Card.Grid>

        <Card.Grid
          hoverable={false}
          style={{ width: '40%' }}
          className={styles.card__container}
        >
          <form className={styles.product__selection}>
            {/* 제품(공간)을 예약할 날짜, 시간, 인원 선택 */}
            <h3>예약 사항 선택</h3>
            <p>· 예약 날짜 : </p>
            <ConfigProvider locale={locale}>
              <DatePicker
                size={'large'}
                placement={'bottomLeft'}
                placeholder={'날짜를 선택해주세요'}
                onChange={onChangeDate}
                style={{ width: '55%', margin: '5px 0' }}
              />
            </ConfigProvider>
            <br />
            <p>· 예약 시간 : </p>
            <TimePicker.RangePicker
              size="large"
              use12Hours
              format="hh a"
              placeholder={['입실 시간', '퇴실 시간']}
              onChange={
                onChangeTime as (values: unknown, timeString: unknown) => void
              }
              style={{ width: '55%', marginBottom: '5px' }}
            />
            <br />
            <p>· 예약 인원 : </p>
            <Space direction="vertical" style={{ width: '52%' }}>
              <InputNumber
                size="large"
                min={1}
                max={50}
                defaultValue={1}
                onChange={onChangePerson}
              />
              <p>(최소 1명, 최대 50명)</p>
            </Space>
          </form>
        </Card.Grid>

        <Card.Grid
          hoverable={false}
          style={{ width: '30%' }}
          className={styles.card__container}
        >
          <div>
            {/* 제품(공간) 가격 (1시간 당) 출력 */}
            <h3>가격</h3>
            <strong>{product.price.toLocaleString()}</strong>
            <span>원/ 1시간 당</span>
            <p>자세한 가격은 결제 시 확인 가능!</p>
          </div>
        </Card.Grid>
      </Card>

      <Space direction="vertical" className={styles.btn__container}>
        <Button
          type="primary"
          block
          className={styles.reservation__Btn}
          onClick={handleProductPayment}
        >
          예약하기
        </Button>
        <Modal
          title="안내메세지"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <span>로그인이 필요한 기능입니다. </span>
          <span>로그인 하시겠습니까?</span>
        </Modal>
      </Space>

      <Card
        title={<h3>상세정보</h3>}
        bordered={true}
        className={styles.detailedInfo__card}
      >
        {detailedInfo.map((item, index) => (
          <p key={index}>
            {item} <br />
          </p>
        ))}
      </Card>

      <Card title={<h3>시설안내</h3>} bordered={true}>
        {facilityInfo.map((item, index) => (
          <p key={index}>
            {item} <br />
          </p>
        ))}
      </Card>
    </main>
  );
};

export default ProductDetail;
