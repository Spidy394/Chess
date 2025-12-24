import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Landing = () => {
    const navigate = useNavigate();
  return (
    <div className="flex justify-center px-4">
      <div className="pt-8 w-full max-w-5xl">
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="flex justify-center">
            <img src={"/chessboard.jpeg"} className="w-full max-w-96" />
          </div>
          <div className="space-y-6">
            <div className="flex justify-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center">
                Play chess online.
              </h1>
            </div>

            <div className="flex justify-center">
             <Button onClick={() => navigate("/game")}>
              Play Online
             </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
