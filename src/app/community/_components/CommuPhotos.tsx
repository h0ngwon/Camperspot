import Image from 'next/image';

type Props = {
  photo: {
    id: string;
    photo_url: string | null;
    post_id: string;
  }[];
};

export default function CommuPhotos({ photo }: Props) {
  return (
    <ul>
      {photo.map((pic) => (
        <li key={pic.id}>
          <Image
            src={pic.photo_url || '/default-image.jpg'}
            alt=''
            width={100}
            height={100}
          />
        </li>
      ))}
    </ul>
  );
}
