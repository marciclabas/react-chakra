import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react'
import { useConfirmationModal } from 'chakra-components/confirmation'
import { useState } from 'react'
import { CopyBlock, dracula } from 'react-code-blocks'

const CODE = `import { useConfirmationModal } from 'chakra-components/confirmation'

const { ConfirmationModal, confirm, confirmationProps } = useConfirmationModal()

const result = await confirm()

<ConfirmationModal {...confirmationProps}
    title='Confirmation'
    body='Are you sure?'
/>`

export function Confirmation() {
  const { ConfirmationModal, confirm, confirmationProps } = useConfirmationModal()

  const [result, setResult] = useState<string | null>(null)

  async function confirmation() {
    const result = await confirm()
    if (result !== null)
      setResult(result ? 'YES' : 'NO')
  }

  return (
    <>
      <VStack h='100vh' w='100vw' align='end' justify='center' pr='10vw'>
        <HStack gap='2rem'>
          <VStack>
            <Button onClick={confirmation}>Trigger confirmation</Button>
            <Text>Result: {result ?? 'Pending'}</Text>
          </VStack>
          <Box textAlign='start'>
            <CopyBlock
              text={CODE} language='tsx' showLineNumbers={false} theme={dracula}
              customStyle={{ padding: '2rem' }}
              />
          </Box>
        </HStack>
      </VStack>
      <ConfirmationModal {...confirmationProps}
        title='Confirmation'
        body='Are you sure?'
      />
    </>
  )
}
export default Confirmation
