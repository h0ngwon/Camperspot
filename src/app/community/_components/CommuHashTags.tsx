import styles from '../_styles/CommuHashTags.module.css';

type Props = {
  hashTag: {
    id: string;
    post_id: string;
    tag: string;
  }[];
};

export default function CommuHashTags({ hashTag }: Props) {
  return (
    <ul className={styles.wrap}>
      {hashTag.map((tag) => {
        return (
          <li className={styles.tag} key={tag.id}>
            #{tag.tag}
          </li>
        );
      })}
    </ul>
  );
}
