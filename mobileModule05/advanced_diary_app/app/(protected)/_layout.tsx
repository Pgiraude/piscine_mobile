import { colors } from "@/design-system/Colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { SafeAreaView } from "react-native";
import {
	SceneMap,
	TabBar,
	type TabBarProps,
	TabView,
} from "react-native-tab-view";
import Agenda from "./agenda";
import Profile from "./profile";

export default function ProtectedLayout() {
	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: "profile", title: "Profile" },
		{ key: "agenda", title: "Agenda" },
	]);

	const renderScene = SceneMap({
		profile: Profile,
		agenda: Agenda,
	});

	const renderIcon = ({
		focused,
		route,
	}: {
		focused: boolean;

		
		route: { key: string };
	}) => {
		switch (route.key) {
			case "profile":
				return (
					<FontAwesome5
						name="user-alt"
						size={24}
						color={focused ? "white" : "black"}
					/>
				);
			case "agenda":
				return (
					<FontAwesome5
						name="calendar-day"
						size={24}
						color={focused ? "white" : "black"}
					/>
				);
		}
	};

	const renderTabBar = (props: TabBarProps<{ key: string; title: string }>) => (
		<TabBar
			{...props}
			indicatorStyle={{ backgroundColor: "white" }}
			style={{ backgroundColor: colors.primary }}
		/>
	);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={(i) => setIndex(i)}
				tabBarPosition="bottom"
				renderTabBar={renderTabBar}
				commonOptions={{
					icon: renderIcon,
					labelStyle: {
						color: "white",
						fontSize: 15,
					},
				}}
			/>
		</SafeAreaView>
	);
}
