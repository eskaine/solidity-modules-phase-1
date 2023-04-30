import { useState} from "react";
import { COOLDOWN, COOLDOWN_TICK } from "@/utils/constants";

export const useCooldown = () => {
  const [cdAlert, setCdAlert] = useState(false);
  const [cooldown, setCooldown] = useState(COOLDOWN);
  const [isRunning, setIsRunning] = useState(false);

  const setCooldownAlert = (res) => {
    setCdAlert(res);
  };

  function startCooldown() {
    setIsRunning(true);

    const timeout = setInterval(() => {
      setCooldown((prevState) => {
        // close alert early to compensate for dom refresh timing
        if(prevState <= 1000) {
          setCdAlert(false);
        }

        if (!prevState) {
          setIsRunning(false);
        }

        if (!isRunning && !prevState) {
          setCooldown(COOLDOWN);
          return clearInterval(timeout);
        }

        return prevState - COOLDOWN_TICK;
      });
    }, COOLDOWN_TICK);
  }

  return { isRunning, cooldown, startCooldown, cdAlert, setCooldownAlert };
};
