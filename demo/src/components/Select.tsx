import { Box, HStack, Text, VStack } from "@chakra-ui/react"
import { useSelect, SelectCards } from 'chakra-components/select'
import { CopyBlock, dracula } from "react-code-blocks"

const CODE = `import { useSelect, SelectCards } from 'chakra-components/select'

const { selectProps, value } = useSelect(
  ['Coffee', 'Tea', 'Milk', 'Water'],
  { default: 'Coffee' }
)

<p>Selected: {value}</p>
<SelectCards {...selectProps} />
`

export function Select() {

  const { selectProps, value } = useSelect(['Coffee', 'Tea', 'Milk', 'Water'], { default: 'Coffee' })

  return (
    <HStack h='100vh' w='100vw' align='center' justify='center'>
      <VStack>
        <Text>Selected: {value}</Text>
        <SelectCards gap='1rem' w='fit-content' {...selectProps} />
      </VStack>
      <Box textAlign='start'>
        <CopyBlock
          text={CODE} language='tsx' showLineNumbers={false} theme={dracula}
          customStyle={{ padding: '2rem' }}
        />
      </Box>
    </HStack>
  )
}

export default Select