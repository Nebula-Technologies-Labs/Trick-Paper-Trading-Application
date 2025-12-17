import { TouchableOpacity, View } from "react-native";
import AppText from "../Common/AppText";
import { FC } from "react";
import { InstrumentResponse } from "@/types/InstrumentTypes";

interface WatchlistItemContainerProps {
  item: InstrumentResponse;
  onSelect: () => void;
}

const WatchlistItemContainer: FC<WatchlistItemContainerProps> = ({
  item,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      className="flex-col border-b border-border py-4 gap-2"
      onPress={onSelect}
    >
      <View className="flex-row justify-between items-center">
        <AppText className="text-textSecondary" textSize={14}>
          {item.symbol}
        </AppText>
        <AppText className="text-sucess" textSize={15}>
          3,1234
        </AppText>
      </View>
      <View className="flex-row item-center justify-between">
        <AppText className="text-textMuted" textSize={13}>
          {item.exchangeSegment}
        </AppText>
        <View className="flex-row gap-2 items-center">
          <AppText className="text-textSecondary" textSize={13}>
            0.00
          </AppText>
          <AppText className="text-textSecondary" textSize={13}>
            (0.00)
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WatchlistItemContainer;
