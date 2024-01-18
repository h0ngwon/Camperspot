import styles from '../_styles/DetailHashtag.module.css';

type Props = {
  campHashtag: { tag: string | null }[] | undefined;
};

export default function DetailHashtag({ campHashtag }: Props) {
  return (
    <ul className={styles.wrap}>
      {campHashtag?.map((tag, index) => {
        return (
          <li className={styles.tag} key={index}>
            #{tag.tag}
          </li>
        );
      })}
    </ul>
  );
}
