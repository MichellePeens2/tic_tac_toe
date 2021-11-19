import { Player, Character } from "../../types";
import "./TextField.css";

export default function TextField({
  label,
  value,
  setValue,
}: {
  label: Character;
  value: Player | null;
  setValue: (value: Player) => void;
}) {
  const onChange = (
    label: Character,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const player: Player = {
      name: event.target.value,
      character: label,
    };
    setValue(player);
  };

  return (
    <>
      <label className="Label">{label}: </label>
      <input
        className="Input"
        type="text"
        value={value?.name || ""}
        onChange={(event) => {
          onChange(label, event);
        }}
      />
    </>
  );
}
