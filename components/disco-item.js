import React from 'react';
import Icon from 'components/icon';
import Image from 'components/image';
import 'components/disco-item.css';

const DiscoItem = ({ onClick = () => {}, item, visible }) => {
  const { artist, title, artworkUrl } = item;

  return (
      visible ?
        <div className="disco-item">
          <Image src={artworkUrl} width={175} height={175}/>
          <div className="disco-item--overlay">
            <Icon item={item} type="info"/>
            <Icon item={item} type="like"/>
            <Icon item={item} type="open"/>
            <Icon item={item} type="cast"/>
          </div>
          <div className="disco-item--caption">
            <span className="disco-item--title">{title}</span>
            <span className="disco-item--artist">{artist}</span>
          </div>
        </div>
        :
        <div className="disco-item"/>
  )
};

export default DiscoItem;
