import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { TextInputProps } from 'react-native'

import { Input } from '@components/Input'
import { Error, TextArea } from './styles'

interface TextInput extends TextInputProps {
  control: Control
  name: string
  error: string
  defaultValue: string
}

export function TextInput({ control, name, error, defaultValue, ...rest } : TextInput){
  return (
    <>
      <Controller
        defaultValue={defaultValue ?? ''}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input {...rest} value={value} onChangeText={onChange} />
        )}
        name={name}
      />
      { error && <Error>{ error }</Error> }
    </>
  )
}

export function TextAreaInput({ control, name, error, defaultValue, ...rest } : TextInput){
  return (
    <>
      <Controller
        defaultValue={defaultValue ?? ''}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextArea multiline={true} {...rest} value={value} onChangeText={onChange} />
        )}
        name={name}
      />
      { error && <Error>{ error }</Error> }
    </>
  )
}