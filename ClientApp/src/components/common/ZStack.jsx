import React from "react"
import { Flex } from "@chakra-ui/react"

const ZStackLayer = ({ children, index }) => {
  return (
    <Flex zIndex={index}>{children}</Flex>
  )
}

const ZStack = ({ children }) => {
  return <Flex>
    {
      React.Children.map(children, (child, i) => (
        <ZStackLayer index={i} />
      ))
    }
  </Flex>
}

export default ZStack