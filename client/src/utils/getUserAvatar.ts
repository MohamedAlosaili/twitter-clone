const getUserAvatar = (avatar: string) => {
  if (avatar.includes("default-avatar")) {
    return `/assets/${avatar}`;
  } else {
    return avatar;
  }
};

export default getUserAvatar;
