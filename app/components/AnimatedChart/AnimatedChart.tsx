import Lottie from "lottie-react";
import lottieData from "~/assets/chart.json";

export const AnimatedChart = () => {
  return (
    <Lottie
      animationData={lottieData}
      loop={false}
      style={{ width: "70%", height: "auto" }}
    />
  );
};
