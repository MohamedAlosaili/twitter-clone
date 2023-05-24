import getUserAvatar from "utils/getUserAvatar";

interface Props {
  avatarUrl: string;
  username: string;
  className?: string;
  layer?: boolean;
  onClick?: () => void;
}

const Avatar = ({
  avatarUrl,
  username,
  className,
  onClick,
  layer = true,
}: Props) => (
  <div
    className="relative cursor-pointer overflow-hidden rounded-full"
    onClick={onClick}
  >
    <img
      src={getUserAvatar(avatarUrl)}
      alt={`${username} avatar`}
      className={`aspect-square ${className}`}
    />
    {layer && (
      <div className="absolute inset-0 bg-black opacity-0 transition-opacity hover:opacity-25"></div>
    )}
  </div>
);

export default Avatar;
