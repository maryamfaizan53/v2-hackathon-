
import Herosection from "../app/component/herosection";
import Arrival from "../app/component/arrival";
import Topsell from "../app/component/topsell";
import Browser from "../app/component/browser";

export default function Home() {
  return (
      <div>
        <Herosection />
        <Arrival />
        <Topsell />
        <Browser />
      </div>
  );
}
