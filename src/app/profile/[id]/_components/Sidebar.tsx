import React from 'react';
import styles from '../_styles/Sidebar.module.css';

const Sidebar = () => {
  const sidebarMenus = [
    {
      id: 0,
      menu: '내 정보 관리',
    },
    {
      id: 1,
      menu: '캠핑장',
    },
    {
      id: 2,
      menu: '캠핑톡',
    },
  ];
  return (
    <ul className={styles.sidebar}>
      {sidebarMenus.map((item) => (
        <li key={item.id} className={styles['sidebar-item']}>
          {item.menu}
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
