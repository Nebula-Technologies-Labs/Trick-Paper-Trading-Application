import PositionModel from "@models/positionModel";
import { PositionDTO, PositionParams } from "types/position";

let positionMap = new Map<string, PositionDTO>();
export const positionService = async ({
  user,
  instrument,
  order,
}: PositionParams) => {
  if (!positionMap.has(`${user._id}:${instrument.token}:${order.orderType}`)) {
    positionMap.set(`${user._id}:${instrument.token}:${order.orderType}`, {
      userId: String(user._id),
      token: instrument.token,
      quantity: order.quantity,
      symbol: order.symbol,
      type: order.orderType,
      createdAt: new Date(),
      exitedAt: null,
      totalAmount: order.price * order.quantity,
      average: order.price,
      exitedAverage: null,
      status: "ACTIVE",
    });
  } else {
    const existedPosition = positionMap.get(
      `${user._id}:${instrument.token}:${order.orderType}`
    );

    if (existedPosition.type === order.orderType) {
      existedPosition.quantity = existedPosition.quantity + order.quantity;
      existedPosition.totalAmount =
        existedPosition.totalAmount + order.price * order.quantity;
      existedPosition.average =
        existedPosition.totalAmount / existedPosition.quantity;
    } else {
      if (existedPosition.quantity - order.quantity === 0) {
        existedPosition.status = "EXITED";
        existedPosition.exitedAt = new Date();
        existedPosition.exitedAverage = order.price;
        // Save this Position in DB or Redis
        await PositionModel.create({
          userId: existedPosition.userId,
          token: existedPosition.token,
          quantity: existedPosition.quantity,
          symbol: existedPosition.symbol,
          type: existedPosition.type,
          createdAt: existedPosition.createdAt,
          exitedAt: existedPosition.exitedAt,
          average: existedPosition.average,
          exitedAverage: existedPosition.exitedAt,
          status: existedPosition.status,
        });
      } else if (existedPosition.quantity - order.quantity < 0) {
        const leftQty = order.quantity - existedPosition.quantity;

        existedPosition.status = "EXITED";
        existedPosition.exitedAt = new Date();
        existedPosition.exitedAverage = order.price;
        // Save this Position in DB or Redis
        await PositionModel.create({
          userId: existedPosition.userId,
          token: existedPosition.token,
          quantity: existedPosition.quantity,
          symbol: existedPosition.symbol,
          type: existedPosition.type,
          createdAt: existedPosition.createdAt,
          exitedAt: existedPosition.exitedAt,
          average: existedPosition.average,
          exitedAverage: existedPosition.exitedAt,
          status: existedPosition.status,
        });

        // Now New Positionw ill be created here
        positionMap.set(`${user._id}:${instrument.token}:${order.orderType}`, {
          userId: String(user._id),
          token: instrument.token,
          quantity: leftQty,
          symbol: order.symbol,
          type: order.orderType,
          createdAt: new Date(),
          exitedAt: null,
          totalAmount: order.price * leftQty,
          average: order.price,
          exitedAverage: null,
          status: "ACTIVE",
        });
      } else {
        existedPosition.quantity = existedPosition.quantity - order.quantity;
        existedPosition.totalAmount =
          existedPosition.totalAmount - order.price * order.quantity;
        existedPosition.average =
          existedPosition.totalAmount / existedPosition.quantity;
      }
    }
  }
};
