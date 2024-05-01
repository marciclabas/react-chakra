import { useRadioGroup } from "@chakra-ui/react"

export type SelectProps<T extends string> = {
  options: T[]
  value?: T
  setValue(x: T): void
  rootProps: any
  getRadioProps: any
}

export type SelectConfig<T extends string> = {
  default?: T
}

export type SelectHook<T extends string> = {
  value?: T
  selectProps: SelectProps<T>
}

export function useSelect<T extends string>(options: T[], config: Required<SelectConfig<T>>): Required<SelectHook<T>>;
export function useSelect<T extends string>(options: T[], config?: SelectConfig<T>): SelectHook<T>;
export function useSelect<T extends string>(options: T[], config?: any) {
  const { getRootProps, getRadioProps, value, setValue } = useRadioGroup({ defaultValue: config?.default })
  return {
    selectProps: { rootProps: getRootProps(), getRadioProps, options, value: value as T, setValue },
    value: value as T
  }
}
