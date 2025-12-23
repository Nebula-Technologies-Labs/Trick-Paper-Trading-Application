import { View } from "react-native";
import React from "react";
import AppText from "../Common/AppText";
import { PositionResponse } from "@/types/PositionType";
import { FormatNumber } from "@/utils/Formatter";

interface StatmentContainerProps {
  item: PositionResponse;
}

export default function StatementContainer({ item }: StatmentContainerProps) {
  const pnlChange =
    item.average * item.quantity - (item.exitedAverage ?? 0) * item.quantity;
  return (
    <View className="py-6 px-4 border-t border border-border gap-2">
      <View className="flex-row items-center justify-between">
        <AppText
          className="text-textPrimary"
          style={{ fontFamily: "interSemiBold" }}
          textSize={14}
        >
          {item.symbol}
        </AppText>
        <View className="flex-row items-center gap-2">
          <AppText className="text-textMuted" textSize={14}>
            Qty.
          </AppText>
          <AppText className="text-textPrimary" textSize={14}>
            {item.quantity}
          </AppText>
        </View>
      </View>
      <View className="flex-row gap-2 items-center">
        <AppText
          className="text-textSecondary"
          style={{ fontFamily: "interSemiBold" }}
          textSize={14}
        >
          Realised
        </AppText>
        <View className="flex-row gap-2 items-center">
          <AppText
            className={`${pnlChange > 0 ? "text-sucess" : pnlChange === 0 ? "text-textMuted" : "text-danger"}`}
            textSize={14}
            style={{ fontFamily: "interSemiBold" }}
          >
            {FormatNumber(pnlChange)}
          </AppText>
          <AppText
            className={`${pnlChange > 0 ? "text-sucess" : pnlChange === 0 ? "text-textMuted" : "text-danger"}`}
          >
            ({FormatNumber(pnlChange / 100)}%)
          </AppText>
        </View>
      </View>
      <View className="flex-row items-center justify-between">
        <View className="flex-col gap-2 flex-1">
          <View className="flex-row gap-4 items-center">
            <AppText className="text-textMuted" textSize={14}>
              Buy avg.
            </AppText>
            <AppText className="text-textSecondary" textSize={14}>
              {FormatNumber(item.average)}
            </AppText>
          </View>
          <View className="flex-row gap-4 items-center">
            <AppText className="text-textMuted" textSize={14}>
              Sell avg.
            </AppText>
            <AppText className="text-textSecondary" textSize={14}>
              {FormatNumber(item.exitedAverage ?? 0)}
            </AppText>
          </View>
        </View>
        <View className="flex-col gap-2 flex-1">
          <View className="flex-row gap-2 items-center justify-between">
            <AppText className="text-textMuted" textSize={14}>
              Buy value
            </AppText>
            <AppText className="text-textSecondary" textSize={14}>
              {FormatNumber(item.average * item.quantity)}
            </AppText>
          </View>
          <View className="flex-row gap-2 items-center justify-between">
            <AppText className="text-textMuted" textSize={14}>
              Sell value
            </AppText>
            <AppText className="text-textSecondary" textSize={14}>
              {FormatNumber((item.exitedAverage ?? 0) * item.quantity)}
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
}
