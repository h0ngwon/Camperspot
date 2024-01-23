'use client';
import React from 'react';
import styles from '../_styles/Sidebar.module.css';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';

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
  const pathName = usePathname();

  return (
    <ul className={styles.sidebar}>
      {sidebarMenus.map((item) => {
        const url = `/profile/${userId}/${item.url ? item.url : ''}`;
        return (
          <Link href={url}>
            <li
              key={item.id}
              className={`${styles['sidebar-item']} ${
                pathName === url ? styles.active : ''
              }`}
            >
              {item.menu}
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default Sidebar;
