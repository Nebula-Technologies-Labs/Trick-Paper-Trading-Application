import { InstrumentResponse } from "@/types/InstrumentTypes";
import { UserResponse } from "@/types/UserTypes";
import useSocketTick from "./useSocketTicks";

interface useCalculationParameters {
  instrument: InstrumentResponse | null;
  profile: UserResponse | null;
  lotQuantity: number;
}

interface useCalculationReturnType {
  margin: number;
  brokerage: number;
  totalAmount: number;
}

const OPTION_SEGMENTS = new Set(["OPTIDX", "OPTSTK", "OPTFUT"]);
const FUTURE_SEGMENTS = new Set(["FUTIDX", "FUTSTK", "FUTCOM"]);

const useCalculation = ({
  instrument,
  profile,
  lotQuantity,
}: useCalculationParameters): useCalculationReturnType => {
  const { tick } = useSocketTick();

  if (!instrument || !profile) {
    return { margin: 0, brokerage: 0, totalAmount: 0 };
  }

  const item = tick[instrument.token];
  const ltp = Number(item?.last_traded_price ?? 0);

  let margin = 0;
  let brokerage = 0;

  if (OPTION_SEGMENTS.has(instrument.instrumentType)) {
    margin =
      ((ltp / 100) * (lotQuantity * instrument.lotSize)) / profile.optMargin;

    brokerage = lotQuantity * profile.optBrokerage;
  }

  if (FUTURE_SEGMENTS.has(instrument.instrumentType)) {
    margin = profile.futMargin * lotQuantity;
    brokerage = lotQuantity * profile.futBrokerage;
  }

  const totalAmount = margin + brokerage;

  return { margin, brokerage, totalAmount };
};

export default useCalculation;
