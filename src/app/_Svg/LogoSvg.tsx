import React from 'react';
type Props = {
  x: number;
  y: number;
};
const LogoSvg = ({ x, y }: Props) => {
  return (
    <svg
      width={x}
      height={y}
      viewBox='0 0 154 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14.9272 17.7924V20.5149C13.1846 21.5049 11.1718 21.9999 8.90228 21.9999C7.05158 21.9999 5.48456 21.6149 4.18772 20.8449C2.89088 20.0749 1.87772 19.0024 1.12123 17.6411C0.364737 16.2799 0 14.8086 0 13.2274C0 10.7111 0.864561 8.60739 2.58018 6.88863C4.29579 5.16988 6.41667 4.31738 8.94281 4.31738C10.6854 4.31738 12.6172 4.78488 14.7516 5.73363V8.38738C12.8198 7.23238 10.9151 6.65488 9.06439 6.65488C7.21368 6.65488 5.59263 7.27363 4.33632 8.52488C3.08 9.77614 2.4586 11.3436 2.4586 13.2136C2.4586 15.0836 3.08 16.6649 4.3093 17.8886C5.5386 19.1124 7.11912 19.7174 9.05088 19.7174C10.9826 19.7174 13.0225 19.0711 14.9407 17.7924H14.9272Z'
        fill='black'
      />
      <path
        d='M25.4096 4.44141H23.748L16.6289 21.8076H19.0605L21.1408 16.6789L22.0729 14.4789L24.5586 8.2364L27.2333 14.4789L28.2059 16.6789L30.4214 21.8076H32.8529L25.4096 4.44141Z'
        fill='#6FCF59'
      />
      <path
        d='M47.8478 4.53711H50.0632V21.8071H47.6722V8.37336L42.5794 15.0421H42.1336L36.9732 8.37336V21.8071H34.5957V4.53711H36.8382L42.3497 11.6321L47.8208 4.53711H47.8478Z'
        fill='black'
      />
      <path
        d='M53.5086 21.8073V4.50977H58.7635C60.3441 4.50977 61.6139 4.94977 62.546 5.84352C63.4781 6.73727 63.9644 7.93352 63.9644 9.43227C63.9644 10.436 63.7213 11.3298 63.2349 12.0998C62.7486 12.8698 62.0867 13.4335 61.2492 13.791C60.4116 14.1485 59.2093 14.3135 57.6423 14.3135H55.8862V21.8073H53.4951H53.5086ZM58.3448 6.70977H55.8862V12.1135H58.4799C59.439 12.1135 60.1955 11.8798 60.7088 11.3985C61.2356 10.931 61.4923 10.2435 61.4923 9.36352C61.4923 7.58977 60.4386 6.70977 58.3313 6.70977H58.3448Z'
        fill='black'
      />
      <path
        d='M66.0312 4.53711H75.4334V6.73711H68.4088V12.0034H75.1902V14.2171H68.4088V19.5796H75.663V21.7796H66.0448V4.53711H66.0312Z'
        fill='black'
      />
      <path
        d='M78.2565 21.8071V4.53711H82.4037C84.0788 4.53711 85.4162 4.96336 86.4023 5.82961C87.3884 6.69586 87.8748 7.86461 87.8748 9.33586C87.8748 10.3396 87.6316 11.2059 87.1453 11.9484C86.659 12.6909 85.97 13.2271 85.0649 13.5984C85.5918 13.9559 86.1186 14.4509 86.6184 15.0834C87.1183 15.7159 87.8342 16.8021 88.7528 18.3559C89.3337 19.3321 89.793 20.0746 90.1442 20.5696L91.0223 21.8071H88.199L87.483 20.6659C87.483 20.6659 87.4155 20.5559 87.3344 20.4596L86.8751 19.7859L86.1456 18.5209L85.3486 17.1734C84.8623 16.4584 84.4165 15.8946 83.9977 15.4821C83.5925 15.0559 83.2277 14.7534 82.89 14.5746C82.5658 14.3959 82.0119 14.2996 81.2284 14.2996H80.607V21.8209H78.2295L78.2565 21.8071ZM81.3365 6.64086H80.6205V12.0859H81.5256C82.7279 12.0859 83.5519 11.9759 83.9977 11.7696C84.4435 11.5634 84.7948 11.2334 85.0379 10.7934C85.2946 10.3534 85.4162 9.87211 85.4162 9.32211C85.4162 8.77211 85.2811 8.29086 84.9974 7.85086C84.7272 7.41086 84.3355 7.09461 83.8221 6.91586C83.3088 6.73711 82.4848 6.64086 81.323 6.64086H81.3365Z'
        fill='black'
      />
      <path
        d='M103.721 14.5613L101.91 13.42C100.776 12.705 99.9786 11.99 99.4923 11.2888C99.0195 10.5875 98.7764 9.79004 98.7764 8.88254C98.7764 7.52129 99.2221 6.42129 100.141 5.56879C101.059 4.71629 102.221 4.29004 103.667 4.29004C105.112 4.29004 106.314 4.68879 107.476 5.50004V8.30504C106.287 7.10879 104.99 6.50379 103.613 6.50379C102.843 6.50379 102.194 6.69629 101.708 7.06754C101.221 7.43879 100.965 7.92004 100.965 8.49754C100.965 9.02004 101.154 9.50129 101.519 9.95504C101.883 10.4088 102.478 10.8763 103.288 11.3713L105.098 12.485C107.125 13.7363 108.124 15.345 108.124 17.2838C108.124 18.6725 107.679 19.7863 106.787 20.6525C105.895 21.5188 104.734 21.945 103.315 21.945C101.681 21.945 100.181 21.4225 98.8439 20.3775V17.2425C100.127 18.9338 101.613 19.7725 103.288 19.7725C104.031 19.7725 104.653 19.5525 105.152 19.1263C105.652 18.7 105.895 18.15 105.895 17.5038C105.895 16.4588 105.166 15.455 103.707 14.5063L103.721 14.5613Z'
        fill='black'
      />
      <path
        d='M110.61 21.8073V4.50977H115.865C117.446 4.50977 118.715 4.94977 119.648 5.84352C120.58 6.73727 121.066 7.93352 121.066 9.43227C121.066 10.436 120.823 11.3298 120.337 12.0998C119.85 12.8698 119.188 13.4335 118.351 13.791C117.513 14.1485 116.311 14.3135 114.744 14.3135H112.988V21.8073H110.597H110.61ZM115.446 6.70977H112.988V12.1135H115.581C116.541 12.1135 117.297 11.8798 117.81 11.3985C118.337 10.931 118.594 10.2435 118.594 9.36352C118.594 7.58977 117.54 6.70977 115.433 6.70977H115.446Z'
        fill='black'
      />
      <path
        d='M131.265 4.29004C133.832 4.29004 135.952 5.12879 137.668 6.82004C139.384 8.51129 140.221 10.6288 140.221 13.1725C140.221 15.7163 139.357 17.82 137.641 19.4975C135.925 21.1613 133.751 22 131.13 22C128.509 22 126.55 21.1613 124.889 19.4975C123.227 17.8338 122.39 15.7438 122.39 13.2275C122.39 10.7113 123.227 8.51129 124.902 6.82004C126.577 5.12879 128.698 4.29004 131.265 4.29004ZM131.359 6.64129C129.468 6.64129 127.901 7.26004 126.685 8.49754C125.47 9.73504 124.848 11.3163 124.848 13.2275C124.848 15.1388 125.456 16.6375 126.685 17.875C127.915 19.1125 129.441 19.7313 131.292 19.7313C133.143 19.7313 134.683 19.0988 135.925 17.8338C137.168 16.5688 137.776 15.0013 137.776 13.1313C137.776 11.2613 137.155 9.76254 135.925 8.51129C134.683 7.26004 133.17 6.64129 131.373 6.64129H131.359Z'
        fill='black'
      />
      <path
        d='M140.153 4.50977H154V6.70977H148.218V21.8073H145.827V6.70977H140.14V4.50977H140.153Z'
        fill='black'
      />
      <path
        d='M24.559 8.23625L20.8711 0H23.5593L25.41 4.44125'
        fill='#6FCF59'
      />
      <path
        d='M24.4915 8.23625L28.1794 0H25.4777L23.627 4.44125'
        fill='#6FCF59'
      />
      <path
        d='M24.9104 21.0931C25.6565 21.0931 26.2613 20.4652 26.2613 19.6906C26.2613 18.916 25.6565 18.2881 24.9104 18.2881C24.1644 18.2881 23.5596 18.916 23.5596 19.6906C23.5596 20.4652 24.1644 21.0931 24.9104 21.0931Z'
        fill='#6FCF59'
      />
      <path
        d='M127.536 13.3646L130.238 16.1697L135.628 10.5459'
        stroke='#6FCF59'
        strokeWidth='2'
        strokeMiterlimit='10'
      />
    </svg>
  );
};

export default LogoSvg;
