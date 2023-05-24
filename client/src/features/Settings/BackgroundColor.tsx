import { GoCheck } from "react-icons/go";
import { Theme } from "utils/userPreference";

interface Props {
  color: Theme["mode"];
  selected: boolean;
  changeBgColor: (mode: Theme["mode"]) => void;
}

const colors = {
  light: {
    bg: "bg-light",
    border: "border-light-border-2",
    hover: "group-hover:bg-light-hover",
    text: "text-light-text",
  },
  dim: {
    bg: "bg-dim",
    border: "border-dim-border-2",
    hover: "group-hover:bg-dim-hover",
    text: "text-dim-text",
  },
  dark: {
    bg: "bg-dark",
    border: "border-dark-border-2",
    hover: "group-hover:bg-dark-hover",
    text: "text-dark-text",
  },
};

const BackgroundColor = ({ color, selected, changeBgColor }: Props) => (
  <div className="flex-1">
    <label
      className={`group flex h-16 w-full cursor-pointer items-center justify-center gap-4 rounded-md px-3 font-semibold ${
        selected ? "border-2 border-accent" : `border ${colors[color].border}`
      } ${colors[color].bg} ${colors[color].text}`}
    >
      <input
        type="radio"
        name="background"
        className="hidden"
        onClick={() => changeBgColor(color)}
      />
      <div
        className={`transition-colors ${
          selected ? "group-hover:bg-accent/10" : `${colors[color].hover}`
        } flex aspect-square w-10 items-center justify-center rounded-full`}
      >
        <div
          className={`grid aspect-square w-5 place-items-center rounded-full border-2 transition-colors ${
            selected ? "border-accent bg-accent" : colors[color].border
          }`}
        >
          {selected && <GoCheck size={14} className="text-white" />}
        </div>
      </div>
      <div className="px-2 capitalize">{color}</div>
    </label>
  </div>
);

export default BackgroundColor;
