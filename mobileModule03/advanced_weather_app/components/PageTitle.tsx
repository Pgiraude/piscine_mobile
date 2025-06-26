import customStyles from "@/styles/styles";
import { Text, View } from "react-native";

type PageTitleProps = {
  city?: string;
  region?: string;
  country?: string;
};

const PageTitle = ({ city, region, country }: PageTitleProps) => {
  const title = city || region || country || "Unknown";

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Text style={customStyles.title}>{title}</Text>
      {region && <Text style={customStyles.subtitle}>{`${region}`}</Text>}
      {country && <Text style={customStyles.subtitle}>{`${country}`}</Text>}
    </View>
  );
};

export default PageTitle;
