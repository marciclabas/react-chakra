import React from 'react';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Button, useDisclosure } from '@chakra-ui/react'
import { managedPromise } from '@haskellian/async/promises/single'
import { useCallback, useRef } from 'react'

export type CustomProps = {
  title: string
  body: string
  yesMsg?: string
  noMsg?: string
}
export type ControlProps = {
  isOpen: boolean
  onCancel(): void
  onNo(): void
  onYes(): void
  isCentered?: boolean
}
export type Props = CustomProps & ControlProps
export function ConfirmationModal({ title, body, yesMsg, noMsg, onYes, onNo, onCancel, ...props }: Props) {
  return (
    <Modal {...props} onClose={onCancel}>
        <ModalOverlay />
        <ModalContent m='1rem'>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>{body}</ModalBody>
          <ModalFooter gap='1rem'>
            <Button onClick={onCancel} variant='ghost'>Cancel</Button>
            <Button onClick={() => { onNo(); onCancel() }} variant='ghost' colorScheme='red'>{noMsg ?? 'NO'}</Button>
            <Button onClick={() => { onYes(); onCancel() }} variant='ghost' colorScheme='green'>{yesMsg ?? 'YES'}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export type Hook = {
  confirm(): Promise<boolean|null>
  confirmationProps: ControlProps
  ConfirmationModal(props: Props): JSX.Element
}

export function useConfirmationModal(): Hook {
  const { onClose, onOpen, isOpen} = useDisclosure()
  const result = useRef(managedPromise<boolean|null>())

  const confirm = useCallback(() => {
    result.current = managedPromise()
    onOpen()
    return result.current
  }, [onOpen])

  const onCancel = useCallback(() => {
    result.current.resolve(null)
    onClose()
  }, [onClose])
  const onYes = useCallback(() => {
    result.current.resolve(true)
    onClose()
  }, [onClose])
  const onNo = useCallback(() => {
    result.current.resolve(false)
    onClose()
  }, [onClose])

  return {
    ConfirmationModal, confirm,
    confirmationProps: { onCancel, isOpen, onNo, onYes },
  }
}

export default ConfirmationModal