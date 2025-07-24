import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
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
						color={focused ? "darkblue" : "grey"}
					/>
				);
			case "agenda":
				return (
					<AntDesign
						name="calendar"
						size={24}
						color={focused ? "darkblue" : "grey"}
					/>
				);
		}
	};

	const renderTabBar = (props: TabBarProps<{ key: string; title: string }>) => (
		<TabBar
			{...props}
			indicatorStyle={{ backgroundColor: "white" }}
			style={{ backgroundColor: "#A084E8", height: 75 }}
		/>
	);

	return (
		<TabView
			navigationState={{ index, routes }}
			renderScene={renderScene}
			onIndexChange={(i) => setIndex(i)}
			tabBarPosition="bottom"
			renderTabBar={renderTabBar}
			commonOptions={{
				icon: renderIcon,
				labelStyle: {
					color: "darkblue",
					fontSize: 15,
				},
			}}
		/>
	);
}
