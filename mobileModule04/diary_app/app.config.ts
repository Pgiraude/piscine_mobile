import "ts-node/register";

module.exports = () => {
  return {
    expo: {
      name: "diary_app",
      slug: "diary_app",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/images/icon.png",
      scheme: "diaryapp",
      userInterfaceStyle: "automatic",
      newArchEnabled: true,
      ios: {
        googleServicesFile: "./GoogleService-Info.plist",
        supportsTablet: true,
        bundleIdentifier: "diary.piscine.app42",
        infoPlist: {
          NSAppTransportSecurity: {
            NSAllowsArbitraryLoads: true,
          },
        },
      },
      android: {
        package: "diary.piscine.app42",
        googleServicesFile: "./google-services.json",
        adaptiveIcon: {
          foregroundImage: "./assets/images/adaptive-icon.png",
          backgroundColor: "#ffffff",
        },
        edgeToEdgeEnabled: true,
      },
      web: {
        bundler: "metro",
        output: "static",
        favicon: "./assets/images/favicon.png",
      },
      plugins: [
        "@react-native-firebase/app",
        "@react-native-firebase/auth",
        [
          "expo-build-properties",
          {
            ios: {
              useFrameworks: "static",
            },
          },
        ],
        "expo-router",
        [
          "expo-splash-screen",
          {
            image: "./assets/images/splash-icon.png",
            imageWidth: 200,
            resizeMode: "contain",
            backgroundColor: "#ffffff",
          },
        ],

        ["./plugin/withPlugin.ts"],
      ],
      experiments: {
        typedRoutes: true,
      },
    },
  };
};
