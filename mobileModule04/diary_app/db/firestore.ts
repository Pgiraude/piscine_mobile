import { getApp } from "@react-native-firebase/app";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	getFirestore,
	onSnapshot,
	updateDoc,
} from "@react-native-firebase/firestore";

export enum SatisfactionEnum {
	DISSATISFIED = "Dissatisfied",
	NEUTRAL = "Neutral",
	SATISFIED = "Satisfied",
}

export const SatisfactionLabels: Record<SatisfactionEnum, string> = {
	[SatisfactionEnum.DISSATISFIED]: "Insatisfait",
	[SatisfactionEnum.NEUTRAL]: "Neutre",
	[SatisfactionEnum.SATISFIED]: "Satisfait",
};

export type Note = {
	id: string;
	email: string;
	date: Date;
	content: string;
	title: string;
	satisfaction: SatisfactionEnum;
};

export const FirestoreService = {
	async getUserNotes(userId: string): Promise<Note[]> {
		const userData = getFirestore(getApp());
		const ref = collection(userData, "users", userId, "notes");
		const querySnapshot = await getDocs(ref);

		return querySnapshot.docs.map((doc: any) => ({
			id: doc.id,
			...doc.data(),
			date: new Date(doc.data().date._seconds * 1000),
		}));
	},

	async addNote(userId: string, note: Omit<Note, "id">) {
		const userData = getFirestore(getApp());
		const ref = collection(userData, "users", userId, "notes");
		const docRef = await addDoc(ref, note);

		return docRef;
	},

	async deleteNote(userId: string, noteId: string) {
		const userData = getFirestore(getApp());
		const ref = doc(userData, "users", userId, "notes", noteId);
		await deleteDoc(ref);
	},

	async updateNote(
		userId: string,
		noteId: string,
		note: Partial<Omit<Note, "id">>,
	) {
		const userData = getFirestore(getApp());
		const ref = doc(userData, "users", userId, "notes", noteId);
		await updateDoc(ref, note);
	},

	realtimeUserNotes: (userId: string, callback: (notes: Note[]) => void) => {
		const userData = getFirestore(getApp());
		const ref = collection(userData, "users", userId, "notes");
		const unsubscribe = onSnapshot(ref, (querySnapshot) => {
			const notes = querySnapshot.docs.map((doc: any) => ({
				id: doc.id,
				...doc.data(),
				date: new Date(doc.data().date._seconds * 1000),
			}));
			callback(notes);
		});

		return unsubscribe;
	},
};
