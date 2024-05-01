import { Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react'
import { Direction, Slideshow } from 'framer-animations/slideshow'
import { useState, lazy, Suspense } from 'react'
const Swipe = lazy(() => import('./components/Swipe'));
const Touch = lazy(() => import('./components/Touch'));
const Loader = lazy(() => import('./components/Loader'));
const PreviewedCarousel = lazy(() => import('./components/PreviewedCarousel'));
const FullSlideshow = lazy(() => import('./components/FullSlideshow'));
const ElemHighlight = lazy(() => import('./components/ElemHighlight'));
const Confirmation = lazy(() => import('./components/Confirmation'));
const Select = lazy(() => import('./components/Select'));

type TabT = {
  display: string
  elem: JSX.Element
}

const tabs: TabT[] = [
  { display: 'Preview Carousel', elem: <PreviewedCarousel /> },
  { display: 'Swipe', elem: <Swipe /> },
  { display: 'Touch', elem: <Touch /> },
  { display: 'Loader', elem: <Loader /> },
  { display: 'Full Slideshow', elem: <FullSlideshow /> },
  { display: 'Highlight', elem: <ElemHighlight /> },
  { display: 'Confirmation', elem: <Confirmation /> },
  { display: 'Single Select', elem: <Select /> },
]


export function App() {
  const [tab, setTab] = useState(0)
  const [dir, setDir] = useState<Direction>('right')
  function changeTab(idx: number) {
    setTab(i => {
      const dir: Direction =
        idx === 4 ? 'down' :
        i < idx ? 'left' : 'right'
      setDir(dir)
      return idx
    })
  }

  return (
    <VStack h='100vh' w='100vw' justify='start' align='center' overflow='hidden'>
      <Tabs w='100%' h='100%' isLazy display='flex' flexDir='column' align='center' onChange={changeTab}>
        <TabList>
          {tabs.map((t, i) => (
            <Tab key={i} fontSize='1.5rem'>{t.display}</Tab>
          ))}
        </TabList>
        <TabPanels w='100%' h='100%' display='flex' pos='relative'>
          {tabs.map((t, i) => (
            <Slideshow key={i} pageKey={tab} direction={dir} style={{zIndex: i === tab ? 1: -1}}>
              <TabPanel w='100%' h='100%' display='flex'>
                <VStack w='100%' h='100%' align='center'>
                  <Suspense>
                    {t.elem}
                  </Suspense>
                </VStack>
              </TabPanel>
            </Slideshow>
          ))}
        </TabPanels>
      </Tabs>
    </VStack>
  )
}

export default App