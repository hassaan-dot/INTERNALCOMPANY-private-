import { useAuthStore } from "@/store/useAuthStore";
import { Redirect } from "expo-router";
import React from "react";
import '@/src/i18n';

const Home = () => {
  const { token } = useAuthStore();

  if (!token) return <Redirect href={"/(auth)/login"} />;
  if (token) return <Redirect href={"/(app)/dashboard"} />;
};

export default Home;
