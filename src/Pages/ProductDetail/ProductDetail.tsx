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
} from 'antd';
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

// 제품의 상세 내용
interface ResponseData {
  id: string; // 제품 ID
  title: string; // 제품 이름
  price: number; // 제품 가격
  description: string; // 제품 상세 설명
  tags: string[]; // 제품 태그
  thumbnail: string; // 제품 썸네일 이미지(URL)
  photo: string; // 제품 상세 이미지(URL)
  isSoldOut: boolean; // 제품 매진 여부
  reservations: Reservation[]; // 제품의 모든 예약 정보 목록
  discountRate: number; // 제품 할인율
}

// 예약 정보가 있는 경우
interface Reservation {
  start: string; // 예약 시작 시간
  end: string; // 예약 종료 시간
  isCanceled: boolean; // 예약 취소 여부
  isExpired: boolean; // 예약 만료 여부
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

  // // antd InputNumber - 예약 인원
  // const selectBefore = (
  //   <Select defaultValue="minus" style={{ width: 60 }}>
  //     <Option value="minus">-</Option>
  //   </Select>
  // );
  // const selectAfter = (
  //   <Select defaultValue="add" style={{ width: 60 }}>
  //     <Option value="add">+</Option>
  //   </Select>
  // );

  // antd Modal - 예약하기 버튼
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    navigate(`/signin`);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleProductPayment = () => {
    accessToken ? navigate(`/productpayment`) : showModal();
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
            <h1
              style={{
                display: 'inline',
                fontSize: '42px',
              }}
            >
              {product.title}
            </h1>
            <p style={{ fontSize: '20px' }}>
              {product.description.split('<br>')[0]}
            </p>
          </div>
        }
        bordered={true}
        headStyle={{ height: '130px' }}
        bodyStyle={{ height: '250px', fontSize: '18px' }}
        className={styles.product__card}
      >
        <Card.Grid hoverable={false} style={{ width: '30%' }}>
          <div>
            {/* 제품(공간) 장소 출력 */}
            <h3 className={styles.product__address}>주소</h3>
            {productAddress.map((item, i) => (
              <p key={i}>{productAddress[i]}</p>
            ))}
          </div>
        </Card.Grid>

        <Card.Grid hoverable={false} style={{ width: '40%' }}>
          <form className={styles.product__selection}>
            {/* 제품(공간)을 예약할 날짜, 시간, 인원 선택 */}
            <h3>예약 사항 선택</h3>
            <p>· 예약 날짜 : </p>
            <ConfigProvider locale={locale}>
              <DatePicker
                placement={'bottomLeft'}
                placeholder={'날짜를 선택해주세요'}
                style={{ width: '52%', margin: '5px 0' }}
              />
            </ConfigProvider>
            <br />
            <p>· 예약 시간 : </p>
            <TimePicker.RangePicker
              use12Hours
              format="h:mm a"
              placeholder={['입실 시간', '퇴실 시간']}
              style={{ width: '52%', marginBottom: '5px' }}
            />
            <br />
            <p>· 예약 인원 : </p>
            <Space direction="vertical" style={{ width: '52%' }}></Space>
          </form>
        </Card.Grid>

        <Card.Grid hoverable={false} style={{ width: '30%' }}>
          <div>
            {/* 제품(공간) 가격 (1시간 당) 출력 */}
            <h3>가격</h3>
            <strong>{product.price.toLocaleString()}</strong>
            <span>원/ 1시간 당</span>
            <p>자세한 가격은 결제 시 확인 가능!</p>
          </div>
        </Card.Grid>
      </Card>

      <Space direction="vertical">
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
