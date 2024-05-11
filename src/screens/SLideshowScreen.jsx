import { Slider } from "../components";
import { sliderImages } from "../constants";

const SLideshowScreen = () => {
  return (
    <div className="flex items-center justify-center  min-h-screen bg-zinc-900 w-screen p-8">
      <Slider
        className="border border-zinc-300 rounded-lg w-[90%] md:w-1/2 aspect-video"
        images={sliderImages}
      />
    </div>
  );
};

export default SLideshowScreen;
