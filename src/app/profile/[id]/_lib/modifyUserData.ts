export type MutationType = {
  id: string;
  formData: FormData;
};

export const modifyUserData = async ({ id, formData }: MutationType) => {
  const res = await fetch(`/api/profile/${id}`, {
    method: 'POST',
    body: formData,
  });
  return res;
};
