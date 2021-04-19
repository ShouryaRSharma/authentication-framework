import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { Wrapper } from "./Wrapper"
import { Alerts } from './components/Alert/Alert'
import { Navbar } from './components/Nav/Nav'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Wrapper>
      <Alerts />
      <Navbar>
        <Alerts />
      </Navbar>
    </Wrapper>
  </ChakraProvider>
)
