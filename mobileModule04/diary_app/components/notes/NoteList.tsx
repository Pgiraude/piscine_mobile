import { FirestoreService, type Note } from "@/db/firestore";
import LButton, { LButtonVariant } from "@/design-system/LButton";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AddOrEditNoteModal from "./AddOrEditNoteModal";
import DeleteNoteModal from "./DeleteNoteModal";
import NoteCard from "./NoteCard";
import NoteDetailModal from "./NoteDetailModal";

type NoteListProps = {
	userId: string;
	userEmail: string;
};

const NoteList = ({ userId, userEmail }: NoteListProps) => {
	const [notes, setNotes] = useState<Note[]>([]);
	const [selectedNote, setSelectedNote] = useState<Note | undefined>(undefined);
	const [isOpenDeleteModal, setisOpenDeleteModal] = useState(false);
	const [isOpenAddOrEditModal, setisOpenAddOrEditModal] = useState(false);
	const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);

	useEffect(() => {
		const unsubscribe = FirestoreService.realtimeUserNotes(userId, (data) => {
			setNotes(data);
		});
		return unsubscribe;
	}, [userId]);

	return (
		<View style={noteListStyles.container}>
			{isOpenDeleteModal && selectedNote && (
				<DeleteNoteModal
					noteId={selectedNote.id}
					isOpen={isOpenDeleteModal}
					userId={userId}
					onClose={() => setisOpenDeleteModal(false)}
				/>
			)}
			{isOpenAddOrEditModal && (
				<AddOrEditNoteModal
					note={selectedNote}
					isOpen={isOpenAddOrEditModal}
					userId={userId}
					userEmail={userEmail}
					onClose={() => {
						setisOpenAddOrEditModal(false);
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
			<LButton
				variant={LButtonVariant.EDIT}
				onPress={() => setisOpenAddOrEditModal(true)}
			>
				Ajouter une note
			</LButton>
			<ScrollView style={{ gap: 10, flex: 1 }}>
				{notes.map((note: Note) => (
					<NoteCard
						key={note.id}
						note={note}
						onPress={() => {
							setSelectedNote(note);
							setIsOpenDetailModal(true);
						}}
						onEdit={() => {
							setSelectedNote(note);
							setisOpenAddOrEditModal(true);
						}}
						onDelete={() => {
							setSelectedNote(note);
							setisOpenDeleteModal(true);
						}}
					/>
				))}
			</ScrollView>
		</View>
	);
};

export default NoteList;

const noteListStyles = StyleSheet.create({
	container: {
		padding: 20,
		gap: 10,
		height: "50%",
	},
	note: {
		display: "flex",
		flexDirection: "row",
		padding: 10,
		borderRadius: 10,
		backgroundColor: "#e6fff7",
		width: "100%",
		alignSelf: "stretch",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	gradient: {
		padding: 10,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center",
	},
});
