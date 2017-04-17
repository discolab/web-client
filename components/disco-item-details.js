import React from 'react';
import 'components/disco-item-details.css';

const List = ({ items }) => (
  <ul className="disco-item-details--list">{
    items.map((item) => (
      <li key={item}>{item}</li>
    ))
  }</ul>
);

const DiscoItemDetails = ({ item }) => {
  const details = [
    [ 'Artists',    item.artists     ],
    [ 'With',       item.with        ],
    [ 'Label',      item.label       ],
    [ 'Year',       item.year        ],
    [ 'Tags',       item.tags        ],
    [ 'Composers',  item.composers   ],
    [ 'Conductors', item.conductors  ]
  ].filter(([name, value]) => Array.isArray(value) ? !!value.length : !!value);

  return (
    <div className="disco-item-details">
      <h1>{item.artist}</h1>
      <h2>{item.title}</h2>
      <img src={item.artworkUrl}/>
      <dl>
        {
          details.map(([ name, value ]) => (
            <span key={name.toLowerCase()}>
              <dt>{name}</dt>
              <dd>{ Array.isArray(value) ? <List items={value}/> : value }</dd>
            </span>
          ))
        }
      </dl>
    </div>
  );
};

export default DiscoItemDetails;
