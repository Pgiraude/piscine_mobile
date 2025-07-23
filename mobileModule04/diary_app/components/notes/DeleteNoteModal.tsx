import { FirestoreService } from "@/db/firestore";
import LButton, { LButtonVariant } from "@/design-system/LButton";
import { Modal, Text, View } from "react-native";

type DeleteNoteModalProps = {
	noteId: string;
	isOpen: boolean;
	userId: string;
	onClose: () => void;
};

const DeleteNoteModal = ({
	noteId,
	isOpen,
	userId,
	onClose,
}: DeleteNoteModalProps) => {
	const handleDeleteNote = async () => {
		await FirestoreService.deleteNote(userId, noteId);
		onClose();
	};

	return (
		<Modal
			visible={isOpen}
			transparent
			animationType="fade"
			onRequestClose={onClose}
		>
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "rgba(0,0,0,0.5)",
				}}
			>
				<View
					style={{
						backgroundColor: "white",
						padding: 24,
						borderRadius: 12,
						alignItems: "center",
						minWidth: 250,
					}}
				>
					<Text style={{ fontSize: 18, marginBottom: 16 }}>
						Supprimer cette note ?
					</Text>
					<View style={{ flexDirection: "row", gap: 12 }}>
						<LButton variant={LButtonVariant.CANCEL} onPress={onClose}>
							Annuler
						</LButton>
						<LButton variant={LButtonVariant.DELETE} onPress={handleDeleteNote}>
							Supprimer
						</LButton>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default DeleteNoteModal;
