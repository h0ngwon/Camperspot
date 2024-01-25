'use client';
import React from 'react';
import styles from '../_styles/Sidebar.module.css';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const Sidebar = () => {
  const sidebarMenus = [
    {
      id: 0,
      menu: '내 정보 관리',
    },
    {
      id: 1,
      menu: '캠핑장',
      url: 'reservation',
    },
    {
      id: 2,
      menu: '캠핑톡',
      url: 'community',
    },
  ];

  const { id: userId } = useParams();

  return (
    <ul className={styles.sidebar}>
      {sidebarMenus.map((item) => {
        const url = `/profile/${userId}/${item.url ? item.url : ''}`;
        return (
          <Link href={url} key={item.id}>
            <li className={styles['sidebar-item']}>{item.menu}</li>
          </Link>
        );
      })}
    </ul>
  );
};

export default Sidebar;
