import React from 'react';

import 'components/link.css';

const Link = ({ active, onClick, children }) => (
  <a href="#"
     className={active ? 'link m-active' : 'link'}
     onClick={e => {
       e.preventDefault();
       onClick();
     }}
  >
    {children}
  </a>
);

export default Link;

