import { AuthProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";
import { ImageBackground } from "react-native";

export default function RootLayout() {
	return (
		<AuthProvider>
			<ImageBackground
				style={{
					flex: 1,
				}}
				resizeMode="cover"
				source={require("@/assets/images/night-sky.png")}
			>
				<Slot />
			</ImageBackground>
		</AuthProvider>
	);
}
