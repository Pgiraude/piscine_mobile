import { LinearGradient } from "expo-linear-gradient";
import {
	type ColorValue,
	Pressable,
	type StyleProp,
	StyleSheet,
	Text,
	type ViewStyle,
} from "react-native";

export enum LButtonVariant {
	EDIT = "edit",
	DELETE = "delete",
	CANCEL = "cancel",
	GOOGLE = "google",
	GITHUB = "github",
}

type LButtonProps = {
	children: React.ReactNode;
	variant: LButtonVariant;
	onPress: () => void;
	style?: StyleProp<ViewStyle>;
};

const LButtonColors: Record<
	LButtonVariant,
	readonly [ColorValue, ColorValue, ...ColorValue[]]
> = {
	[LButtonVariant.EDIT]: ["#6a11cb", "#2575fc", "#43cea2"],
	[LButtonVariant.DELETE]: ["#ff5858", "#f857a6"],
	[LButtonVariant.CANCEL]: ["#b0b0b0", "#888888", "#e0e0e0"],
	[LButtonVariant.GOOGLE]: ["#4285F4", "#34A853"],
	[LButtonVariant.GITHUB]: ["#000", "#24292E"],
};

const LButton = ({
	children,
	variant = LButtonVariant.EDIT,
	onPress,
	style,
}: LButtonProps) => {
	const isLoginButton =
		variant === LButtonVariant.GOOGLE || variant === LButtonVariant.GITHUB;

	return (
		<Pressable onPress={onPress} style={style}>
			<LinearGradient
				colors={LButtonColors[variant]}
				style={
					isLoginButton ? lButtonStyles.loginGradient : lButtonStyles.gradient
				}
			>
				<Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
					{children}
				</Text>
			</LinearGradient>
		</Pressable>
	);
};

export default LButton;

const lButtonStyles = StyleSheet.create({
	gradient: {
		padding: 10,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	loginGradient: {
		padding: 15,
		borderRadius: 8,
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "center",
	},
});
