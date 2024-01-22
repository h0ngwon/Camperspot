export const modifyUserData = async (
  id: string,
  nickname: string,
  file: string,
) => {
  const data = {
    id,
    nickname,
    file,
  };
  const res = await fetch(`/api/profile/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
      file,
      nickname,
    }),
  });
  console.log('hihihihihihihiihihi', await res.json());
  return await res.json();
};
