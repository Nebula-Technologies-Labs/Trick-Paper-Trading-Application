import { useAppDispatch } from "@/redux/hook";
import { fetchPositionStatement } from "@/redux/slices/PositionSlice";
import { Slot } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const StatementLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPositionStatement());
  }, [dispatch]);
  return (
    <SafeAreaView className="flex-1">
      <Slot />
    </SafeAreaView>
  );
};

export default StatementLayout;
