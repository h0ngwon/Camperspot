import React from 'react';

type Props = {
  campHashtag: { tag: string | null }[] | undefined;
};

export default function DetailHashtag({ campHashtag }: Props) {
  return (
    <ul>
      {campHashtag?.map((tag, index) => {
        return <li key={index}>{tag.tag}</li>;
      })}
    </ul>
  );
}
