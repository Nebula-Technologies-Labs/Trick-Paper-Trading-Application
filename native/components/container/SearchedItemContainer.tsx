import { InstrumentResponse } from "@/types/InstrumentTypes";
import { FC } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import AppText from "../Common/AppText";
import { Feather } from "@expo/vector-icons";

interface SearchedItemContainerProps {
  item: InstrumentResponse;
  onSelect: () => void;
}

const SearchedItemContainer: FC<SearchedItemContainerProps> = ({ item , onSelect }) => {
  return (
    <TouchableOpacity className="flex-row items-center justify-between gap-4 border-b border-border py-4 px-4" onPress={onSelect}>
      <View className="px-2 py-1 bg-brandBg">
        <AppText className="text-brand">{item.exchangeSegment}</AppText>
      </View>
      <View className="flex-1 flex-col gap-2">
        <AppText className="text-textPrimary" textSize={14}>
          {item.symbol}
        </AppText>
        <AppText className="text-textMuted" textSize={14}>
          {item.name}
        </AppText>
      </View>
      <Pressable className="py-1 px-1 border-2 border-brand">
        <Feather name="plus" size={14} color={"#538BE3"} />
      </Pressable>
    </TouchableOpacity>
  );
};

export default SearchedItemContainer;
