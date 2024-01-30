export const getUserLikePost = async (userId: string) => {
  const res = await fetch(`/api/profile/${userId}/like/community`)
}