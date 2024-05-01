# Chakra Components

> React components and hooks over ChakraUI

### [Live Demo](https://marciclabas.github.io/react-chakra/)

## Confirmation Modal

```jsx
import { useConfirmationModal } from 'chakra-components/confirmation'

const { ConfirmationModal, confirm, confirmationProps } = useConfirmationModal()

const result = await confirm()

<ConfirmationModal {...confirmationProps}
    title='Confirmation'
    body='Are you sure?'
/>
```