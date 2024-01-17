import React from 'react';
import ReviewStarSvg from '../_svg/ReviewStarSvg';

type Props = {
  rating: number;
};

export default function DetailReveiwStar({ rating }: Props) {
  const fullStars = Array.from({ length: Math.floor(rating) }, (_, index) => (
    <ReviewStarSvg key={index} filled={true} />
  ));
  const emptyStars = Array.from(
    { length: 5 - Math.floor(rating) },
    (_, index) => <ReviewStarSvg key={index} filled={false} />,
  );

  return (
    <span>
      {fullStars}
      {emptyStars}
    </span>
  );
}
