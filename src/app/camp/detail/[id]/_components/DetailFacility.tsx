import React from 'react';

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
    <ul>
      {campFacilty?.map((item) => (
        <li key={item.facility?.id}>{item.facility?.option}</li>
      ))}
    </ul>
  );
}
