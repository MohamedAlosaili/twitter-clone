import { GoCheck } from "react-icons/go";
import { Theme } from "utils/userPreference";

interface Props {
  color: string;
  colorName: Theme["accent"];
  selected: boolean;
  changeColor: (colorName: Props["colorName"]) => void;
}

const Color = ({ color, selected, colorName, changeColor }: Props) => (
  <div className="basis-1/3 sm:basis-32">
    <label
      style={{ "--bg-color": color } as any}
      className={`mx-auto grid aspect-square w-11 cursor-pointer place-items-center rounded-full bg-[var(--bg-color)]`}
    >
      <input
        type="radio"
        name="color"
        className="hidden"
        onChange={() => changeColor(colorName)}
        checked={selected}
      />
      {selected && <GoCheck size={30} className="text-white" />}
    </label>
  </div>
);

export default Color;
