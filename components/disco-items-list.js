import React from 'react';
import 'components/disco-items-list.css';
import DiscoItem from 'components/disco-item';
import LazyRenderedView from 'components/lazy-rendered-view';

const DiscoItemsList = ({ items }) => (
  <div className="disco-items-list">
    {items.map(item =>
      <div className="disco-items-list--item" key={item.hash}>
        <LazyRenderedView>
          {(visible) => (
            <DiscoItem item={item} visible={visible}/>
          )}
        </LazyRenderedView>
      </div>
    )}
  </div>
);

export default DiscoItemsList;
