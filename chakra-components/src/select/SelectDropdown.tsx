import React from 'react';
import { HStack, Select, StackProps } from "@chakra-ui/react"
import { SelectProps } from './use-select.js'
import { OptionCard } from "./SelectCards.js"

export type SelectDropdownProps<T extends string> = StackProps & SelectProps<T> & {
  numCards: number
}

export function SelectCardsDropdown<T extends string>({ options, value, numCards, rootProps, getRadioProps, setValue, ...props }: SelectDropdownProps<T>) {
  
  const firstOptions = options.slice(0, numCards)
  const lastOptions = options.slice(numCards)

  const [cardOptions, dropdownOptions] = value === '' || firstOptions.includes(value as T)
    ? [firstOptions, lastOptions]
    : [[...options.slice(0, numCards-1), value], [firstOptions[numCards-1], ...lastOptions.filter(x => x !== value)]]

  return (
    <HStack {...rootProps} {...props}>
      {cardOptions.map(value => (
        <OptionCard key={value} {...getRadioProps({ value })}>
          {value}
        </OptionCard>
      ))}
      <Select placeholder='...' onChange={e => setValue(e.target.value as T)}>
        {dropdownOptions.map(value => (
          <option value={value} key={value}>{value}</option>
        ))}
      </Select>
    </HStack>
  )
}

export default SelectCardsDropdown