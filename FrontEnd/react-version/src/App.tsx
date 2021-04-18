import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { Wrapper } from "./Wrapper"
import { Alerts } from './components/Alert'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Wrapper>
      <Alerts></Alerts>
    </Wrapper>
  </ChakraProvider>
)
