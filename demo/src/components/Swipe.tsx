import { Button, Text, VStack } from "@chakra-ui/react"
import { useSwipeAnimation } from "framer-animations"

export function Swipe() {

  const { animation, run } = useSwipeAnimation({
    divProps: {style: {scale: 3}}
  })

  return (
    <>
      <VStack border='1px solid white' w='10rem' h='10rem' mt='4rem' align='center' justify='center'>
        {animation}
      </VStack>
      <Text>A simple yet very useful animation</Text>
      <Button onClick={run}>Run</Button>
    </>
  )
}

export default Swipe
