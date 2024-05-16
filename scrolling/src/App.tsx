import { useCallback, useState } from "react"
import { Center, Heading, VStack } from "@chakra-ui/react"
import { SwipeDirection } from 'framer-animations'
import Carousel from "../../framer-animations/src/carousels/directional/DirectionalCarousel"
import { mod } from "@haskellian/mod"

export function App() {
  const [[x, y], setPage] = useState([0, 0])
  const page = `${x},${y}`

  const elem = (
    <Center h='100%' w='100%' bg={`gray.${900 - 100 * mod(x, 4)}`} border='2px solid red' overflow='hidden'>
      <Heading>{x}, {y}</Heading>
    </Center>
  )

  const [dir, setDir] = useState<SwipeDirection>('right')

  const move = useCallback((dir: SwipeDirection) => {
    setDir(dir)
    setPage(([x, y]) =>
      dir === 'right' ? [Math.max(x - 1, -5), y] :
      dir === 'left' ? [Math.min(x + 1, 5), y] :
      dir === 'up' ? [x, Math.min(y + 1, 5)] :
      [x, Math.max(y - 1, -5)]
    )
  }, [])

  return (
    <VStack h='100vh' w='100vw' align='center' justify='center' overflow='hidden'>
      <Carousel page={page} item={elem} move={move} direction={dir} />
    </VStack>
  )
}

export default App