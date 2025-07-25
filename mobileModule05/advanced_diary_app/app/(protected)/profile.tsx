import AddOrEditNoteModal from "@/components/notes/AddOrEditNoteModal";
import NoteHistory from "@/components/notes/NoteHistory";
import MyProfile from "@/components/profile/ProfileInfos";
import ProfileKpi from "@/components/profile/ProfileKpi";
import { useAuth } from "@/context/AuthContext";
import { FirestoreService, type Note } from "@/db/firestore";
import LButton, { LButtonVariant } from "@/design-system/LButton";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const Profile = () => {
	const { user, logout } = useAuth() || {};
	const [notes, setNotes] = useState<Note[]>([]);
	const [isOpenAddOrEditModal, setIsOpenAddOrEditModal] = useState(false);

	const handleLogout = async () => {
		try {
			if (logout) logout();
		} catch (error) {
			console.error("Erreur de déconnexion:", error);
		}
	};

	useEffect(() => {
		if (!user) return;
		const unsubscribe = FirestoreService.getUserNotes(
			user.uid,
			(data) => {
				setNotes(
					data.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
				);
			},
		);
		return unsubscribe;
	}, [user]);

	if (!user) {
		return (
			<View style={homeStyles.container}>
				<Text style={{ color: "#fff", fontSize: 20, textAlign: "center" }}>
					Vous avez été déconnecté
				</Text>
				<LButton
					variant={LButtonVariant.GOOGLE}
					onPress={() => {
						router.replace("/login");
					}}
				>
					Se connecter
				</LButton>
			</View>
		);
	}

	return (
		<View style={homeStyles.container}>
			{isOpenAddOrEditModal && (
				<AddOrEditNoteModal
					isOpen={isOpenAddOrEditModal}
					userId={user.uid}
					userEmail={user.email || ""}
					onClose={() => {
						setIsOpenAddOrEditModal(false);
					}}
				/>
			)}
			<MyProfile user={user} logout={handleLogout} />
			<NoteHistory notes={notes} user={user} />
			<ProfileKpi notes={notes} />
			<LButton
				style={{ width: "100%" }}
				variant={LButtonVariant.EDIT}
				onPress={() => setIsOpenAddOrEditModal(true)}
			>
				Ajouter une note
			</LButton>
		</View>
	);
};

export default Profile;

const homeStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
		backgroundColor: "transparent",
		padding: 20,
	},
});
