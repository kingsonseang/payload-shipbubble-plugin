import type { CheckboxField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Error } from '@/blocks/Form/Error'
import { Width } from '@/blocks/Form/Width'
import { FormError } from '@/components/forms/FormError'
import { Checkbox as CheckboxUi } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { capitaliseFirstLetter } from '@/utilities/capitaliseFirstLetter'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export const Checkbox: React.FC<
  {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    getValues: any
    register: UseFormRegister<FieldValues>
    setValue: any
  } & CheckboxField
> = ({ name, defaultValue, errors, label, register, required: requiredFromProps, width }) => {
  const props = register(name, {
    required: requiredFromProps
      ? `${capitaliseFirstLetter(label || name)} is required.`
      : undefined,
  })
  const { setValue } = useFormContext()

  return (
    <Width width={width}>
      <div className="flex items-center gap-2">
        <CheckboxUi
          defaultChecked={defaultValue}
          id={name}
          {...props}
          onCheckedChange={(checked) => {
            setValue(props.name, checked)
          }}
        />
        <Label htmlFor={name}>{label}</Label>
      </div>
      {errors?.[name]?.message && typeof errors?.[name]?.message === 'string' && (
        <FormError message={errors?.[name]?.message} />
      )}
    </Width>
  )
}
