import Navbar from "./components/navbar";
import Main from "./components/main";

export default function App() {
  return (
    <div className="flex flex-col items-center p-12">
      <Navbar />
      <Main />
    </div>
  );
}
