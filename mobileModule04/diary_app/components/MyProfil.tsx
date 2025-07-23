import LButton, { LButtonVariant } from "@/design-system/LButton";
import type { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Dimensions, Image, Text, View } from "react-native";

type MyProfileProps = {
	user: FirebaseAuthTypes.User;
	logout: () => void;
};

const screenWidth = Dimensions.get("window").width;
const titleWidth = screenWidth * 0.6;

const MyProfile = ({ user, logout }: MyProfileProps) => {
	const image = user.photoURL ?? "https://picsum.photos/200/300";
	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				gap: 10,
				padding: 20,
				borderRadius: 10,
				borderWidth: 1,
				borderColor: "#fff",
				backgroundColor: "#e6fff7",
			}}
		>
			<Image
				source={{ uri: image }}
				style={{ width: 100, height: 100, borderRadius: 50 }}
			/>
			<View style={{ display: "flex", flexDirection: "column", gap: 5 }}>
				<Text
					style={{
						color: "#000",
						fontSize: 16,
						fontWeight: "bold",
						overflow: "hidden",
						textOverflow: "ellipsis",
						maxWidth: titleWidth,
					}}
					numberOfLines={1}
				>
					{user.email}
				</Text>
				<Text style={{ color: "#000", fontSize: 16 }}>{user.displayName}</Text>
				<LButton
					variant={LButtonVariant.DELETE}
					style={{ alignSelf: "flex-end" }}
					onPress={logout}
				>
					Se déconnecter
				</LButton>
			</View>
		</View>
	);
};

export default MyProfile;
