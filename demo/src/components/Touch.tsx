import { Button, ButtonGroup, Text, VStack } from "@chakra-ui/react"
import { delay } from "@haskellian/async/promises/single"
import { useTouchAnimation } from "framer-animations"
import { useCallback } from "react"

export function Touch() {
  const { animate, animation } = useTouchAnimation()

  const run = useCallback(async () => {
    await animate('show', 'press')
    await delay(0.4)
    await animate('lift', 'hide')
    await delay(1)
  }, [animate])

  return (
    <>
      <VStack border='1px solid white' w='10rem' h='10rem' mt='4rem' align='center' justify='center' pos='relative'>
        {animation}
      </VStack>
      <Text>A simple yet very useful animation.</Text>
      <Button onClick={run}>Run</Button>
      <Text>Completely controllable:</Text>
      <ButtonGroup isAttached variant='outline'>
        <Button onClick={() => animate('show')}>Show</Button>
        <Button onClick={() => animate('press')}>Press</Button>
        <Button onClick={() => animate('lift')}>Lift</Button>
        <Button onClick={() => animate('hide')}>Hide</Button>
      </ButtonGroup>
    </>
  )
}

export default Touch