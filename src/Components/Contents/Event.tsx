import React from 'react';
import { Carousel, Image, Col, Row } from 'antd';

export default function Event() {
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: 'rgba(255, 228, 214, 1)',
  };

  return (
    <>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <div>
        <Row gutter={[16, 16]}>
          <Col span={5}>
            <Image
              width={100}
              height={100}
              src="https://storage.googleapis.com/heropy-api/vobMr86tAev115027.png"
            />
          </Col>
          <Col span={8}>
            <Image
              height={200}
              src="https://storage.googleapis.com/heropy-api/vwuWRBuEm9v122556.png"
            />
          </Col>
          <Col span={5}>col-8</Col>
        </Row>
        <Row>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
        </Row>
      </div>
    </>
  );
}
