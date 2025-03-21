import { useAuthStore } from "@/store/useAuthStore";
import { Redirect } from "expo-router";
import React from "react";

const Home = () => {
  const { token } = useAuthStore();
  if (!token) return <Redirect href={"/(auth)/login"} />;
  return <Redirect href={"/(app)/dashboard"} />;
};

export default Home;
