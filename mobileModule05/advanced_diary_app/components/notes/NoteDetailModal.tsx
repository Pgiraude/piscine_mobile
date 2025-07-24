import { type Note, SatisfactionLabels } from "@/db/firestore";
import LButton, { LButtonVariant } from "@/design-system/LButton";
import { Dimensions, Modal, ScrollView, Text, View } from "react-native";

const screenWidth = Dimensions.get("window").width;
const modalWidth = screenWidth - 100;

const NoteDetailModal = ({
	note,
	isOpen,
	onClose,
}: {
	note: Note;
	isOpen: boolean;
	onClose: () => void;
}) => (
	<Modal
		visible={isOpen}
		transparent
		onRequestClose={onClose}
		animationType="slide"
	>
		<View
			style={{
				justifyContent: "center",
				alignItems: "center",
				flex: 1,
				backgroundColor: "rgba(0,0,0,0.5)",
			}}
		>
			<View
				style={{
					backgroundColor: "white",
					borderRadius: 10,
					padding: 20,
					maxWidth: modalWidth,
				}}
			>
				<Text
					style={{
						fontSize: 20,
						fontWeight: "bold",
						marginBottom: 10,
						maxWidth: modalWidth,
					}}
					numberOfLines={1}
				>
					{note.title}
				</Text>
				<ScrollView style={{ marginBottom: 10, maxHeight: 200 }}>
					<Text>{note.content}</Text>
				</ScrollView>
				<Text style={{ marginBottom: 10 }}>
					Date : {note.date.toLocaleString()}
				</Text>
				<Text style={{ marginBottom: 20 }}>
					Satisfaction : {SatisfactionLabels[note.satisfaction]}
				</Text>
				<LButton variant={LButtonVariant.CANCEL} onPress={onClose}>
					Fermer
				</LButton>
			</View>
		</View>
	</Modal>
);

export default NoteDetailModal;
