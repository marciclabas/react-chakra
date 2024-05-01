import React, { ReactNode } from "react"
import { Box, HStack, StackProps, UseRadioProps, useRadio } from "@chakra-ui/react"
import { SelectProps } from './use-select.js'

export type OptionProps = UseRadioProps & {
  children?: ReactNode
  colorScheme?: string
}

export function OptionCard({ colorScheme, ...props }: OptionProps) {
  const { getInputProps, getRadioProps } = useRadio(props)

  const color = colorScheme ?? `gray`

  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderRadius='0.4rem'
        _hover={{
          bg: `${color}.600`,
          color: 'white'
        }}
        _checked={{
          bg: `${color}.600`,
          color: 'white'
        }}
        _focus={{
          bg: `${color}.600`,
          color: 'white'
        }}
        _focusVisible={{
          bg: `${color}.600`,
          color: 'white'
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}

export function SelectCards<T extends string>({ options, rootProps, getRadioProps, ...props }: StackProps & SelectProps<T>) {
  return (
    <HStack {...rootProps} {...props}>
      {options.map(value => (
        <OptionCard key={value} {...getRadioProps({ value })}>
          {value}
        </OptionCard>
      ))}
    </HStack>
  )
}

export default SelectCards