import { useState} from "react";
import { COOLDOWN, COOLDOWN_TICK } from "@/utils/constants";

export const useCooldown = () => {
  const [cdAlert, setCdAlert] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const setCooldownAlert = (res, time = 60) => {
    setCooldown(time);
    setCdAlert(res);
  };

  return { cooldown, cdAlert, setCooldownAlert };
};
