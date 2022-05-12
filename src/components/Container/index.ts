import styled from "styled-components/native";

import { StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled(LinearGradient).attrs(({ theme }) => ({
  colors: ['#dbe9f4', '#fff'],
  start: { x: 0, y: 0},
  end: { x: 1, y: 1 }
}))`
  flex: 1;
  padding: 24px;
  padding-top: ${StatusBar.currentHeight! + 24}px;
`