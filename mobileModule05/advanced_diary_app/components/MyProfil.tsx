import LButton, { LButtonVariant } from "@/design-system/LButton";
import type { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Image, Text, View } from "react-native";

type MyProfileProps = {
	user: FirebaseAuthTypes.User;
	logout: () => void;
};

const MyProfile = ({ user, logout }: MyProfileProps) => {
	const image = user.photoURL ?? "https://picsum.photos/200/300";
	return (
		<View
			style={{
				gap: 10,
				borderRadius: 10,
				backgroundColor: "#e6fff7",
				padding: 20,
				width: "100%",
			}}
		>
			<View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
				<Image
					source={{ uri: image }}
					style={{ width: 100, height: 100, borderRadius: 50 }}
				/>
				<View
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 5,
						flex: 1,
					}}
				>
					<Text
						style={{
							color: "#000",
							fontSize: 16,
							fontWeight: "bold",
							overflow: "hidden",
							textOverflow: "ellipsis",
							width: "100%",
						}}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{user.email}
					</Text>
					<Text style={{ color: "#000", fontSize: 16 }}>
						{user.displayName}
					</Text>
					<LButton
						variant={LButtonVariant.DELETE}
						style={{ alignSelf: "flex-end" }}
						onPress={logout}
					>
						Se déconnecter
					</LButton>
				</View>
			</View>
		</View>
	);
};

export default MyProfile;
