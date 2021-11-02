import { Player, Symbol } from "../../types";
import "./TextField.css";

export default function TextField({
  label,
  value,
  setValue,
}: {
  label: Symbol;
  value: Player | null;
  setValue: (value: Player) => void;
}) {
  const onChange = (label: Symbol, event: React.ChangeEvent<HTMLInputElement>) => {
    const player: Player = {
      name: event.target.value,
      symbol: label,
    };
    setValue(player);
  };

  return (
    <>
      <label className="Label">{label}: </label>
      <input
        className="Input"
        type="text"
        value={value?.name || ''}
        onChange={(event) => {onChange(label, event)}}
      />
    </>
  );
}
