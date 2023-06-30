import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pagination, Image, Space, Modal, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import 'Styles/ProductItem.scss';
import { searchProductApi, categoryProductApi, Product } from 'api';

interface SearchValueProps {
  searchQuery: string;
}
export default function ProductItem(searchQuery: SearchValueProps) {
  const searchText = searchQuery.searchQuery;
  const [loading, setLoading] = useState<boolean>(true);
  const [productList, setProductList] = useState<Product[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  const startIndex = (currentPage - 1) * pageSize;
  const EndIndex = startIndex + pageSize;
  const display = productList.slice(startIndex, EndIndex);
  const pageChangeHandler = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getProductList(searchText);
  }, [searchQuery]);

  async function getProductList(searchText: string) {
    setLoading(true);
    const searchlist: Product[] = await searchProductApi(searchText);
    const taglist: Product[] = await categoryProductApi(searchText);
    lists(searchlist, taglist);
  }

  // searchlist, taglist를 중복값 제거하고 합침
  async function lists(searchlist: Product[], taglist: Product[]) {
    const mergelists: Product[] = searchlist.concat(taglist);
    setProductList(
      mergelists.reduce(
        (ac: Product[], v) => (ac.includes(v) ? ac : [...ac, v]),
        []
      )
    );
    setLoading(false);
  }

  const handlePreview = (imageSrc: any) => {
    setPreviewVisible(true);
    setPreviewImage(imageSrc);
  };

  const handleClosePreview = () => {
    setPreviewVisible(false);
    setPreviewImage('');
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: '170px',
          }}
        >
          <Spin
            size="large"
            indicator={
              <LoadingOutlined style={{ color: 'rgba(89, 80, 69, 1)' }} />
            }
          />
        </div>
      ) : productList.length === 0 ? (
        <h1>검색결과가 없어용...</h1>
      ) : (
        <>
          <h1 className="searchedValue">
            {searchText}의 {productList.length}개 검색결과를 찾았습니다!
          </h1>
          <div>
            {productList?.length !== 0 &&
              display?.map((list, index) => {
                const descriptionSlice = list.description.split('<br>');
                const descriptionNew = descriptionSlice[0];
                return (
                  <Space key={index} size={20} className="productItem">
                    <Image
                      width={300}
                      height={200}
                      src={list.thumbnail}
                      className="productItem__img"
                      preview={false}
                      onClick={() => handlePreview(list.thumbnail)}
                    />
                    <Modal
                      open={previewVisible}
                      onCancel={handleClosePreview}
                      footer={null}
                    >
                      <Image src={previewImage} preview={false} width="100%" />
                    </Modal>
                    <Link
                      to={`/productdetail/${list.id}`}
                      key={index}
                      className="productItem__info-container"
                    >
                      <div className="productItem__info">
                        <div className="productItem__title">{list.title}</div>
                        <div className="productItem__des">{descriptionNew}</div>
                      </div>
                      <span className="productItem__price">
                        시간당 {list.price} 원
                      </span>
                    </Link>
                  </Space>
                );
              })}
          </div>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={productList.length}
            onChange={pageChangeHandler}
          />
        </>
      )}
    </>
  );
}
