import { Container } from "@components/Container";
import { Header } from "@components/Header";
const AnimatedLottieView = require("lottie-react-native");
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
      <Header title={'tindog'} />
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