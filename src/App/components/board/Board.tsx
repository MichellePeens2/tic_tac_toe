import "./Board.css";
import { Button } from "../../components";

export default function Board({ onReset }: { onReset: () => void }) {
  return (
    <>
      <div className="Board">
        <div id="block0" className="Block"></div>
        <div id="block1" className="Block"></div>
        <div id="block2" className="Block"></div>
        <div id="block3" className="Block"></div>
        <div id="block4" className="Block"></div>
        <div id="block5" className="Block"></div>
        <div id="block6" className="Block"></div>
        <div id="block7" className="Block"></div>
        <div id="block8" className="Block"></div>
      </div>
      <Button type="secondary" onClick={onReset}>
        Restart
      </Button>
    </>
  );
}
