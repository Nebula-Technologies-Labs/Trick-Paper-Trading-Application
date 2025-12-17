import AppHeader from "@/components/Common/AppHeader";
import AppTab from "@/components/Common/AppTab";
import { useAppDispatch } from "@/redux/hook";
import { fetchInstruments } from "@/redux/slices/InstrumentSlice";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchInstruments());
  }, [dispatch]);
  
  return (
    <SafeAreaView className="gap-2 flex-1 ">
      <AppHeader />
      <AppTab />
    </SafeAreaView>
  );
}
