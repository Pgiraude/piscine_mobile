import {
	FirestoreService,
	type Note,
	SatisfactionEnum,
	SatisfactionLabels,
} from "@/db/firestore";
import LButton, { LButtonVariant } from "@/design-system/LButton";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Modal, StyleSheet, Text, TextInput, View } from "react-native";

type AddOrEditNoteModalProps = {
	note?: Note;
	isOpen: boolean;
	userId: string;
	userEmail: string;
	onClose: () => void;
	addDate?: Date;
};

const AddOrEditNoteModal = ({
	note,
	isOpen,
	userId,
	userEmail,
	onClose,
	addDate,
}: AddOrEditNoteModalProps) => {
	const isNoteToEdit = !!note;

	const [title, setTitle] = useState(note?.title || "");
	const [content, setContent] = useState(note?.content || "");
	const [satisfaction, setSatisfaction] = useState<SatisfactionEnum>(
		note?.satisfaction || SatisfactionEnum.NEUTRAL,
	);
	const [date] = useState(note?.date || new Date().toLocaleString());

	const handleSubmit = async () => {
		if (isNoteToEdit) {
			const noteData = {
				title,
				content,
				satisfaction,
			};
			await FirestoreService.updateNote(userId, note.id, noteData);
		} else {
			const noteData = {
				email: userEmail,
				title,
				content,
				satisfaction,
				date: addDate ?? new Date(),
				createdAt: new Date(),
			};
			await FirestoreService.addNote(userId, noteData);
		}
		onClose();
	};

	return (
		<Modal
			visible={isOpen}
			transparent
			animationType="fade"
			onRequestClose={onClose}
		>
			<View style={styles.overlay}>
				<View style={styles.modalContent}>
					<Text style={styles.title}>
						{isNoteToEdit ? "Éditer la note" : "Ajouter une note"}
					</Text>
					<TextInput
						placeholder="Titre"
						value={title}
						onChangeText={setTitle}
						style={styles.input}
					/>
					<TextInput
						placeholder="Contenu"
						value={content}
						onChangeText={setContent}
						multiline
						numberOfLines={4}
						style={[styles.input, styles.textarea]}
					/>
					<Picker
						selectedValue={satisfaction}
						onValueChange={(itemValue: SatisfactionEnum) =>
							setSatisfaction(itemValue)
						}
						style={styles.picker}
					>
						<Picker.Item
							color="green"
							label={SatisfactionLabels[SatisfactionEnum.SATISFIED]}
							value={SatisfactionEnum.SATISFIED}
						/>
						<Picker.Item
							color="orange"
							label={SatisfactionLabels[SatisfactionEnum.NEUTRAL]}
							value={SatisfactionEnum.NEUTRAL}
						/>
						<Picker.Item
							color="red"
							label={SatisfactionLabels[SatisfactionEnum.DISSATISFIED]}
							value={SatisfactionEnum.DISSATISFIED}
						/>
					</Picker>
					{isNoteToEdit && (
						<Text style={styles.date}>Date : {date.toLocaleString()}</Text>
					)}
					<View style={styles.buttonRow}>
						<LButton variant={LButtonVariant.CANCEL} onPress={onClose}>
							Annuler
						</LButton>
						<LButton variant={LButtonVariant.EDIT} onPress={handleSubmit}>
							{isNoteToEdit ? "Éditer" : "Ajouter"}
						</LButton>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default AddOrEditNoteModal;

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalContent: {
		backgroundColor: "white",
		padding: 24,
		borderRadius: 12,
		alignItems: "center",
		minWidth: 250,
	},
	title: {
		fontSize: 18,
		marginBottom: 16,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 6,
		padding: 8,
		marginBottom: 12,
		width: 220,
	},
	textarea: {
		minHeight: 100,
	},
	picker: {
		width: 200,
		marginBottom: 12,
	},
	date: {
		marginBottom: 12,
		color: "#888",
	},
	buttonRow: {
		flexDirection: "row",
		gap: 12,
	},
});
