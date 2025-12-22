import { InstrumentDTO } from "./Instrument";
import { OrderDTO, orderType } from "./Order";
import { UserDTO } from "./User";

type positionStatus = "ACTIVE" | "EXITED";

export interface PositionParams {
  user: UserDTO;
  instrument: InstrumentDTO;
  order: OrderDTO;
}

export interface PositionDTO {
  userId: string;
  token: string;
  quantity: number;
  symbol: string;
  type: orderType;
  createdAt: Date;
  exitedAt: Date | null;
  totalAmount: number;
  average: number;
  exitedAverage: number | null;
  status: positionStatus;
}
