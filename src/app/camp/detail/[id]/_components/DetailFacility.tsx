import styles from '../_styles/DetailFacility.module.css';

interface Props {
  campFacilty:
    | {
        camp_id: string | null;
        facility_id: number | null;
        id: string;
        facility: {
          id: number;
          option: string | null;
        } | null;
      }[]
    | undefined;
}

export default function DetailFacility({ campFacilty }: Props) {
  return (
    <ul className={styles.wrap}>
      {campFacilty?.map((item) => (
        <li key={item.facility?.id}>
          <p>{item.facility?.option}</p>
        </li>
      ))}
    </ul>
  );
}
