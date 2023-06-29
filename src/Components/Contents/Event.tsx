import React from 'react';
import { Carousel, Image } from 'antd';
import 'Styles/Event.scss';

import event1 from 'Assets/Images/event_001.jpeg';
import event2 from 'Assets/Images/event_002.jpeg';
import event3 from 'Assets/Images/event_003.jpeg';
import event4 from 'Assets/Images/event_004.jpeg';

import now1 from 'Assets/Images/now_001.jpeg';
import now2 from 'Assets/Images/now_002.jpeg';
import now3 from 'Assets/Images/now_003.jpeg';
import now4 from 'Assets/Images/now_004.jpeg';
import now5 from 'Assets/Images/now_005.jpeg';

export default function Event() {
  return (
    <section className="inner">
      <span className="event__title">EVENT</span>
      <Carousel autoplay className="even">
        <div className="event">
          <img className="event__img" src={event1} alt="event1" />
        </div>
        <div className="event">
          <img className="event__img" src={event2} alt="event2" />
        </div>
        <div className="event">
          <img className="event__img" src={event3} alt="event3" />
        </div>
        <div className="event">
          <img className="event__img" src={event4} alt="event4" />
        </div>
      </Carousel>

      <div className="inner">
        <span className="event__title">HOT</span>
        <div className="row">
          <div className="row__item">
            <Image src={now1} alt="now1" />
          </div>
          <div className="row__item">
            <Image src={now2} alt="now2" />
          </div>
          <div className="row__item">
            <Image src={now3} alt="now3" />
          </div>
          <div className="row__item">
            <Image src={now4} alt="now4" />
          </div>
          <div className="row__item">
            <Image src={now5} alt="now5" />
          </div>
        </div>
      </div>
    </section>
  );
}
