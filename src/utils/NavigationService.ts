  import { CommonActions, createNavigationContainerRef } from '@react-navigation/native';

// Define the type for your navigation params
export type RootStackParamList = {
  Home: undefined; // Example of a screen with no params
  Login: undefined;
  CelebrateTogether: { eventId: string }; // Example of a screen with params
  Welcome: undefined;
  DeleteAccount: undefined;
  MenuScreen: undefined;
  Signup: undefined;
  ReportProblem: undefined;
  CashGift: undefined;
  YourContributions: undefined;
  Gift: undefined;
  OurStory: undefined;
  CreatePost: undefined;
  Profile: undefined;
  HomeScreen_Iternity: undefined;
  Splash: undefined;
  HelpAndSupport: undefined;
  Verification: undefined;
  PostScreen: undefined;
  IntroScreen: undefined;
  Feed: undefined;
  Dashboard:undefined
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

// Overloaded navigate function
export function navigate<T extends keyof RootStackParamList>(
  name: T
): void;
export function navigate<T extends keyof RootStackParamList>(
  name: T,
  params: RootStackParamList[T]
): void;
export function navigate<T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T]
): void {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as any, params as any); // Safely cast types
  }
}

// Overloaded replace function
export function replace<T extends keyof RootStackParamList>(
  name: T
): void;
export function replace<T extends keyof RootStackParamList>(
  name: T,
  params: RootStackParamList[T]
): void;
export function replace<T extends keyof RootStackParamList>(
  name: T,
  params?: RootStackParamList[T]
): void {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name, params }],
      })
    );
  }
}

// Go back function
export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}
