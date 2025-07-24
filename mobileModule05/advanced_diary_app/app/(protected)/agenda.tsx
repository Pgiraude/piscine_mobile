import AddOrEditNoteModal from "@/components/notes/AddOrEditNoteModal";
import NoteList from "@/components/notes/NoteList";
import { useAuth } from "@/context/AuthContext";
import { FirestoreService, type Note } from "@/db/firestore";
import LButton, { LButtonVariant } from "@/design-system/LButton";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";

const Agenda = () => {
	const [selected, setSelected] = useState("");
	const { user } = useAuth() || {};
	const [notes, setNotes] = useState<Note[]>([]);
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	useEffect(() => {
		const unsubscribe = FirestoreService.realtimeUserNotes(
			user?.uid || "",
			(data) => {
				setNotes(data.sort((a, b) => b.date.getTime() - a.date.getTime()));
			},
		);
		return unsubscribe;
	}, [user?.uid]);

	const formatDate = (date: Date) => date.toISOString().split("T")[0];

	const selectedNotes = notes.filter(
		(note) => formatDate(note.date) === selected,
	);

	return (
		<View style={styles.container}>
			{isOpenAddModal && (
				<AddOrEditNoteModal
					isOpen={isOpenAddModal}
					userId={user?.uid || ""}
					userEmail={user?.email || ""}
					addDate={new Date(selected)}
					onClose={() => setIsOpenAddModal(false)}
				/>
			)}
			<Text>Agenda</Text>
			<Calendar
				onDayPress={(day) => {
					setSelected(day.dateString);
				}}
				markedDates={{
					[selected]: {
						selected: true,
						disableTouchEvent: true,
					},
				}}
			/>
			<LButton
				variant={LButtonVariant.EDIT}
				onPress={() => setIsOpenAddModal(true)}
			>
				Ajouter une note
			</LButton>
			{user && <NoteList user={user} notes={selectedNotes} />}
		</View>
	);
};

export default Agenda;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		gap: 20,
	},
});
