'use client'
import type { Address } from '@/payload-types'
import type { DefaultDocumentIDType } from 'payload'

import { AddressForm } from '@/components/forms/AddressForm'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import React, { useState } from 'react'

type Props = {
  addressID?: DefaultDocumentIDType
  buttonText?: string
  callback?: (address: Partial<Address>) => void
  disabled?: boolean
  initialData?: { country?: string } & Partial<Omit<Address, 'country'>>
  modalTitle?: string
  skipSubmission?: boolean
}

export const CreateAddressModal: React.FC<Props> = ({
  addressID,
  buttonText = 'Add a new address',
  callback,
  disabled,
  initialData,
  modalTitle = 'Add a new address',
  skipSubmission,
}) => {
  const [open, setOpen] = useState(false)
  const handleOpenChange = (state: boolean) => {
    setOpen(state)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const handleCallback = (data: Partial<Address>) => {
    closeModal()

    if (callback) {
      callback(data)
    }
  }

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogTrigger asChild disabled={disabled}>
        <Button variant={'outline'}>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>This address will be connected to your account.</DialogDescription>
        </DialogHeader>

        <AddressForm
          addressID={addressID}
          callback={handleCallback}
          initialData={initialData}
          skipSubmission={skipSubmission}
        />
      </DialogContent>
    </Dialog>
  )
}
