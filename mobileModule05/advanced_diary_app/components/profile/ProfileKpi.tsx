import {
	type Note,
	SatisfactionEnum,
	SatisfactionLabels,
} from "@/db/firestore";
import { StyleSheet, Text, View } from "react-native";

type ProfileKpiProps = {
	notes: Note[];
};

const ProfileKpi = ({ notes }: ProfileKpiProps) => {
	const totalNotes = notes.length;

	const satisfactionRateBySatisfaction = Object.values(SatisfactionEnum).map(
		(satisfaction) => {
			const filteredNotes = notes.filter(
				(note) => note.satisfaction === satisfaction,
			);
			return {
				satisfaction,
				count: filteredNotes.length,
				rate:
					totalNotes > 0
						? Math.round((filteredNotes.length / totalNotes) * 100)
						: 0,
			};
		},
	);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Total notes: {totalNotes}</Text>
			{satisfactionRateBySatisfaction.map((item) => (
				<View key={`${item.satisfaction}-view`} style={styles.kpiItem}>
					<Text key={`${item.satisfaction}-label`}>
						{SatisfactionLabels[item.satisfaction]}:
					</Text>
					<Text key={`${item.satisfaction}-rate`}>{item.rate}%</Text>
				</View>
			))}
		</View>
	);
};

export default ProfileKpi;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "rgba(46, 6, 116, 0.66)",
		borderRadius: 10,
		padding: 20,
		width: "100%",
	},
	title: {
		textAlign: "center",
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
	kpiItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		fontSize: 18,
	},
});
