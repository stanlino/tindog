import { Container } from "@components/Container";
import AnimatedLottieView from "lottie-react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { 
  Content, 
  NoHaveMoreProfiles, 
  Title, 
  TopDetail 
} from "./styles";

export function Loading() {
  return (
    <Container>
      <TopDetail />
      <Title>
        tindog
      </Title>
      <Content>
        <AnimatedLottieView 
          source={require('@assets/lottie/cat-loading.json')}
          style={{
            width: RFPercentage(40),
          }}
          autoPlay
          loop
          speed={2}
        />
        <NoHaveMoreProfiles>
          Aguarde
        </NoHaveMoreProfiles>
      </Content>
    </Container>
  )
}