import React from 'react';
import { encodeString } from 'lib/string-helpers'
import 'components/selectable-list.css';

const SelectableList = ({ items, onSelect }) => (
  <ul className="selectableList">
    {items.map(item => {
      const text = item.toString();
      const key = encodeString(text);

      return (
        <li key={key}>
          <a href="#">{text}</a>
        </li>
      )
    })}
  </ul>
);

export default SelectableList;


