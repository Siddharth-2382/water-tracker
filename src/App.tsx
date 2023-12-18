import Dropdown from "./components/dropdown";
import Main from "./components/main";

export default function App() {
  return (
    <div className="flex flex-col items-center p-12">
      <Dropdown />
      <Main />
    </div>
  );
}
