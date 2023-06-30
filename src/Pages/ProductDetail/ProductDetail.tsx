import React, { useEffect, useState } from 'react';
import {
  Carousel,
  Button,
  Space,
  Card,
  DatePicker,
  Modal,
  ConfigProvider,
  InputNumber,
} from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import { productDetailApi } from 'api';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, updateProductDetail } from 'redux/reducer/reducer';
import { useCookies } from 'react-cookie';
import styles from 'Styles/ProductDetail.module.scss';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import locale from 'antd/locale/ko_KR';

// dayjs 라이브러리 한글화
dayjs.locale('ko');

const { RangePicker } = DatePicker;

// ProductDetail 컴포넌트
const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [accessCookies] = useCookies(['accessToken']);
  const accessToken = accessCookies.accessToken;
  const [dateCookies, setDateCookies] = useCookies(['selectedDateTime']);
  const [productInfoCookies, setProductInfoCookies] = useCookies([
    'productInfo',
  ]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [timeDiffer, setTimeDiffer] = useState(0);
  const [guests, setGuests] = useState(1);
  const product = useSelector((state: RootState) => state.productSlice);
  const productAddress = ['서울특별시 강남구 강남대로 364', '11층 11E 공간'];

  // 제품의 tags를 가져와 해시태그 기호를 붙여 출력
  const hashTags = product.tags.map((tag) => `#${tag}`);

  // antd DatePicker - 예약 날짜 및 시간
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current < dayjs().startOf('day');
  };

  const disabledRangeTime: RangePickerProps['disabledTime'] = (_, type) => {
    if (type === 'start') {
      return {
        disabledHours: () => [],
      };
    }
    return {
      disabledHours: () => [],
    };
  };

  const handleRangeChange = (dates: any) => {
    if (dates && dates.length >= 2) {
      const [start, end] = dates;

      // 선택한 입실, 퇴실 시간을 toISOString() 함수로 출력할 경우 UTC 기준 시간으로 반환함
      // antd에서 사용하고 있는 dayjs의 add() 메서드로 9시간을 추가하여
      // 대한민국 서울 기준(UTC+9) 시간으로 toISOString() 함수 적용
      const isoStartString = start.add(9, 'hour').toISOString();
      const isoEndString = end.add(9, 'hour').toISOString();

      // dayjs의 diff() 메서드로 선택한 입실 시간과 퇴실 시간의 시간차를 반환하지만
      // JavaScript의 Date 객체는 milliseconds 단위로 시간을 저장하기 때문에,
      // diff() 메서드의 결과값이 밀리초 단위 때문에 정확하게 나오지 않을 수 있음
      // 1시간을 밀리초로 변환하는 값으로 나누고, toFixed() 메서드로 소수점 자르기
      // 1,000ms(=1초) * 60s(=1분) * 60m(=1시간) => 1시간을 ms로 변환
      const timeOfUse = (end.diff(start) / (1000 * 60 * 60)).toFixed(0);
      setStartTime(isoStartString);
      setEndTime(isoEndString);
      setTimeDiffer(Number(timeOfUse));
    }
  };

  // antd InputNumber - 예약 인원
  const onChangePerson = (value: number | null) => {
    // dispatch(selectedGuests(value || 1));
    setGuests(value || 1);
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
    if (accessToken) {
      setDateCookies(
        'selectedDateTime',
        {
          startTime: startTime,
          endTime: endTime,
          timeDiffer: timeDiffer,
        },
        { path: '/' }
      );
      setProductInfoCookies('productInfo', {
        id: product.id,
        title: product.title,
        photo: product.thumbnail,
        guests: guests,
        price: product.price,
      });

      navigate('/productpayment');
    } else {
      showLoginModal();
    }
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
        bodyStyle={{
          height: '230px',
          fontSize: '18px',
          overflow: 'hidden',
          border: 'none',
        }}
        className={styles.product__card}
      >
        <Card.Grid hoverable={false} className={styles.product__address}>
          <div>
            {/* 제품(공간) 장소 출력 */}
            <h3 className={styles.product__address}>주소</h3>
            {productAddress.map((item, i) => (
              <p key={i}>{productAddress[i]}</p>
            ))}
          </div>
        </Card.Grid>

        <Card.Grid hoverable={false} className={styles.product__selection}>
          <form className={styles.product__selection}>
            {/* 제품(공간)을 예약할 날짜, 시간, 인원 선택 */}
            <h3>예약 사항 선택</h3>
            <p style={{ display: 'block', marginBottom: '10px' }}>
              · 예약 날짜 및 시간 :
            </p>
            <ConfigProvider locale={locale}>
              <RangePicker
                size="large"
                disabledDate={disabledDate}
                disabledTime={disabledRangeTime}
                placeholder={['입실 날짜 및 시간', '퇴실 날짜 및 시간']}
                showTime={{
                  hideDisabledOptions: true,
                  defaultValue: [dayjs('00', 'HH'), dayjs('11', 'HH')],
                }}
                format="YYYY년 MM월 DD일 HH시"
                onChange={handleRangeChange}
                style={{ width: '360px', marginBottom: '15px' }}
              />
            </ConfigProvider>
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

        <Card.Grid hoverable={false} className={styles.product__info}>
          <div>
            {/* 제품(공간) 가격 (1시간 당) 출력 */}
            <h3>가격</h3>
            <strong>{product.price.toLocaleString()}</strong>
            <span>원/ 1시간 당</span>
          </div>
        </Card.Grid>
      </Card>

      <Space direction="vertical" className={styles.btn__container}>
        <Button
          type="primary"
          block
          className={styles.reservation__Btn}
          onClick={handleProductPayment}
          disabled={endTime.length === 0 ? true : false}
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
        title={<span className={styles.card__title}>상세정보</span>}
        bordered={false}
        className={styles.detailedInfo__card}
      >
        {detailedInfo.map((item, index) => (
          <p key={index}>
            {item} <br />
          </p>
        ))}
      </Card>

      <Card
        title={<span className={styles.card__title}>시설안내</span>}
        bordered={false}
        className={styles.detailedInfo__card}
      >
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
