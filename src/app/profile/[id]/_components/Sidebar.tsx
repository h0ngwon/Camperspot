'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import icon_camp from '../../../../asset/icon_camp.svg';
import icon_community from '../../../../asset/icon_community.svg';
import icon_profile_setting from '../../../../asset/icon_profile_setting.svg';
import styles from '../_styles/Sidebar.module.css';

const Sidebar = () => {
  const sidebarMenus = [
    {
      id: 0,
      menu: '계정 관리',
      icon: icon_profile_setting,
    },
    {
      id: 1,
      menu: '캠핑장 이용',
      url: 'reservation',
      icon: icon_camp,
    },
    {
      id: 2,
      menu: '커뮤니티',
      url: 'community',
      icon: icon_community,
    },
  ];

  const { id: userId } = useParams();

  return (
    <ul className={styles.sidebar}>
      {sidebarMenus.map((item) => {
        const url = `/profile/${userId}/${item.url ? item.url : ''}`;
        return (
          <Link className={styles['sidebar-link']} href={url} key={item.id}>
            <li className={styles['sidebar-item']}>
              <Image src={item.icon} width={24} height={24} alt='image' />
              {item.menu}
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default React.memo(Sidebar);
