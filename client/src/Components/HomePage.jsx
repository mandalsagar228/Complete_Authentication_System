import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";

const HomePage = () => {
  const navigateComponent = () => {
    navigate("/LoginPage");
  };
  const navigate = useNavigate();
  return (
    <>
      <div className=" flex justify-center flex-col items-center w-[100wh] h-[100vh] bg-custom-image bg-cover bg-center ">
        <div className="text-xl text-gray-900 font-medium">WELCOME</div>
        <div className="text-[50px] font-medium">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .pauseFor(1000)
                .typeString("Complete Authentication System")
                .pauseFor(2000)

                .start();
            }}
            options={{
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <button
          onClick={navigateComponent}
          type="submit"
          className="hover:cursor-pointer font-inter font-medium bg-black text-white px-6 py-2 rounded-md  ease-in-out delay-150 hover:bg-blue-600 hover:-translate-y-1 hover:scale-110 duration-300 hover:px-8"
        >
          Login
        </button>
      </div>
    </>
  );
};

export default HomePage;
