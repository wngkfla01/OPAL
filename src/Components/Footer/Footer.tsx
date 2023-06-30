import React from 'react';
import 'Styles/Footer.scss';
import { GithubOutlined } from '@ant-design/icons';

import donghun from '../../Assets/Images/donghun.png';
import eunji from '../../Assets/Images/eunji.png';
import geumyeop from '../../Assets/Images/geumyeop.png';
import harim from '../../Assets/Images/harim.png';
import siwoo from '../../Assets/Images/siwoo.png';
// import github from '../../Assets/Images/github.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          OP-AL
          <a href="https://github.com/OP-AL">
            <GithubOutlined style={{ fontSize: '40px' }} />
          </a>
        </div>

        <div className="footer__opal">
          <h3>developers</h3>
          <div className="icon">
            <a className="icon-link" href="https://github.com/wngkfla01">
              <img src={harim} alt="Harim" />
            </a>
            <a className="icon-link" href="https://github.com/dmswl2030">
              <img src={eunji} alt="Eunji" />
            </a>
            <a className="icon-link" href="https://github.com/DevYBecca">
              <img src={geumyeop} alt="Geumyeop" />
            </a>
            <a
              className="icon-link"
              href="https://github.com/cuconveniencestore"
            >
              <img src={siwoo} alt="Siwoo" />
            </a>
            <a className="icon-link" href="https://github.com/nangkong98">
              <img src={donghun} alt="Donghun" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
