import { useAuthStore } from "@/store/useAuthStore";
import { Redirect } from "expo-router";
import React from "react";

const Home = () => {
  const { token } = useAuthStore();
  console.log('Token',token)

  if (token) return <Redirect href={"/(auth)/login"} />;
  if (!token) return <Redirect href={"/(app)/dashboard"} />;
};

export default Home;
