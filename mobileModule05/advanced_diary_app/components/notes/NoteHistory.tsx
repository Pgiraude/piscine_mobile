import type { Note } from "@/db/firestore";
import { colors } from "@/design-system/Colors";
import type { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AddOrEditNoteModal from "./AddOrEditNoteModal";
import DeleteNoteModal from "./DeleteNoteModal";
import NoteCard from "./NoteCard";
import NoteDetailModal from "./NoteDetailModal";

type NoteHistoryProps = {
	notes: Note[];
	user: FirebaseAuthTypes.User;
};

const NoteHistory = ({ notes, user }: NoteHistoryProps) => {
	const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
	const [isOpenAddOrEditModal, setIsOpenAddOrEditModal] = useState(false);
	const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
	const [selectedNote, setSelectedNote] = useState<Note | undefined>(undefined);

	const lastTwoNotes = notes.slice(0, 2);

	return (
		<View style={styles.container}>
			{isOpenDeleteModal && selectedNote && (
				<DeleteNoteModal
					noteId={selectedNote.id}
					isOpen={isOpenDeleteModal}
					userId={user.uid}
					onClose={() => setIsOpenDeleteModal(false)}
				/>
			)}
			{isOpenAddOrEditModal && (
				<AddOrEditNoteModal
					note={selectedNote}
					isOpen={isOpenAddOrEditModal}
					userId={user.uid}
					userEmail={user.email || ""}
					onClose={() => {
						setIsOpenAddOrEditModal(false);
						setSelectedNote(undefined);
					}}
				/>
			)}
			{isOpenDetailModal && selectedNote && (
				<NoteDetailModal
					note={selectedNote}
					isOpen={isOpenDetailModal}
					onClose={() => setIsOpenDetailModal(false)}
				/>
			)}
			<Text style={styles.title}>Deux dernières notes</Text>
			<View>
				{lastTwoNotes.length > 0 ? (
					lastTwoNotes.map((note) => (
						<NoteCard
							key={note.id}
							note={note}
							onPress={() => {
								setSelectedNote(note);
								setIsOpenDetailModal(true);
							}}
							onEdit={() => {
								setSelectedNote(note);
								setIsOpenAddOrEditModal(true);
							}}
							onDelete={() => {
								setSelectedNote(note);
								setIsOpenDeleteModal(true);
							}}
						/>
					))
				) : (
					<Text style={styles.title}>
						Aucune note trouvée, ajoutez une note pour commencer
					</Text>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.nightBlue,
		borderRadius: 10,
		padding: 20,
	},
	title: {
		textAlign: "center",
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
});

export default NoteHistory;
