import Left from "../components/left/Left";
import Right from "../components/right/Right";

function Home() {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Left />
      <Right />
    </div>
  );
}

export default Home;
