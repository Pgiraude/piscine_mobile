import AddOrEditNoteModal from "@/components/notes/AddOrEditNoteModal";
import NoteList from "@/components/notes/NoteList";
import { useAuth } from "@/context/AuthContext";
import { FirestoreService, type Note } from "@/db/firestore";
import LButton, { LButtonVariant } from "@/design-system/LButton";
import { FORMAT_DATE } from "@/utils/time";
import { format, isSameDay } from "date-fns";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";

const Agenda = () => {
	const [selected, setSelected] = useState(format(new Date(), FORMAT_DATE));
	const { user } = useAuth() || {};
	const [notes, setNotes] = useState<Note[]>([]);
	const [isOpenAddModal, setIsOpenAddModal] = useState(false);

	useEffect(() => {
		const unsubscribe = FirestoreService.getUserNotes(
			user?.uid || "",
			(data) => {
				setNotes(
					data.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
				);
			},
		);
		return unsubscribe;
	}, [user?.uid]);

	const selectedNotes = notes.filter(
		(note) => format(note.date, FORMAT_DATE) === selected,
	);

	return (
		<View style={styles.container}>
			{isOpenAddModal && (
				<AddOrEditNoteModal
					isOpen={isOpenAddModal}
					userId={user?.uid || ""}
					userEmail={user?.email || ""}
					addDate={
						isSameDay(selected, new Date()) ? new Date() : new Date(selected)
					}
					onClose={() => setIsOpenAddModal(false)}
				/>
			)}
			<View style={{ borderRadius: 10, overflow: "hidden" }}>
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
			</View>
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
