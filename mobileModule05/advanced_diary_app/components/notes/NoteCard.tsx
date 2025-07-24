import { type Note, SatisfactionLabels } from "@/db/firestore";
import { colors } from "@/design-system/Colors";
import LButton, { LButtonVariant } from "@/design-system/LButton";
import { Dimensions, Pressable, Text, View } from "react-native";

const screenWidth = Dimensions.get("window").width;
const titleWidth = screenWidth * 0.6;

type NoteCardProps = {
	note: Note;
	onPress: () => void;
	onEdit: () => void;
	onDelete: () => void;
};

const NoteCard = ({ note, onPress, onEdit, onDelete }: NoteCardProps) => (
	<Pressable
		style={{
			display: "flex",
			flexDirection: "row",
			padding: 10,
			borderRadius: 10,
			backgroundColor: colors.lightGreen,
			width: "100%",
			alignSelf: "stretch",
			justifyContent: "space-between",
			marginBottom: 10,
		}}
		onPress={onPress}
	>
		<View
			style={{
				display: "flex",
				flexDirection: "column",
				gap: 10,
				marginBottom: 10,
			}}
		>
			<Text
				style={{
					fontSize: 18,
					fontWeight: "bold",
					overflow: "hidden",
					textOverflow: "clip",
					width: titleWidth,
				}}
				numberOfLines={1}
				ellipsizeMode="tail"
			>
				{note.title}
			</Text>
			<Text>{note.date.toLocaleString()}</Text>
			<Text>{SatisfactionLabels[note.satisfaction]}</Text>
		</View>
		<View style={{ display: "flex", gap: 10 }}>
			<LButton variant={LButtonVariant.EDIT} onPress={onEdit}>
				Edit
			</LButton>
			<LButton variant={LButtonVariant.DELETE} onPress={onDelete}>
				Delete
			</LButton>
		</View>
	</Pressable>
);

export default NoteCard;
