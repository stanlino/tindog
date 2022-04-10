import { Container } from "@components/Container";
import AnimatedLottieView from "lottie-react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

import { 
  Content, 
  NoHaveMoreProfiles, 
  Title,
  TopDetail
} from "./styles";

export function NoMoreProfiles({ text } : { text: string }) {
  return (
    <Container>
      <TopDetail />
      <Title>
        tindog
      </Title>
      <Content>
        <AnimatedLottieView
          source={require('@assets/lottie/cat-in-box.json')}
          style={{
            width: RFPercentage(40),
          }}
          autoPlay
          loop
          speed={0.5}
        />
        <NoHaveMoreProfiles>
          {text}
        </NoHaveMoreProfiles>
      </Content>
    </Container>
  )
}