import { useState } from 'react'
import { useAppDispatch } from '@redux/hooks'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'

import { Fine } from '@app/fines'
import { addNotification } from '@features/notifications/notification.slice'

import { Dropdown } from '@components/Dropdown'
import { IconButton } from '@components/IconButton'

import { getErrorMessage } from '@utils/getErrorMessage'
import { trpc } from '@utils/trpc'

type Props = {
  fine: Fine
}

export const FineActions = ({ fine }: Props) => {
  const dispatch = useAppDispatch()
  const paidMutation = trpc.useMutation('fines.pay')
  const unpayMutation = trpc.useMutation('fines.unpay')
  const utils = trpc.useContext()
  const [isOpen, setIsOpen] = useState(false)

  const toggleIsOpen = () => setIsOpen(!isOpen)

  const handlePaid = async () => {
    try {
      await paidMutation.mutateAsync({
        id: fine.id,
      })

      await Promise.all([
        utils.invalidateQueries('fines.own'),
        utils.invalidateQueries('fines.own-unpaid'),
      ])

      dispatch(
        addNotification({
          type: 'success',
          message: 'Fine pending validation',
        })
      )
    } catch (error) {
      const message = getErrorMessage(error)

      dispatch(
        addNotification({
          type: 'error',
          message: message,
        })
      )
    }
  }

  const handleUnpay = async () => {
    try {
      await unpayMutation.mutateAsync({
        id: fine.id,
      })

      await utils.invalidateQueries('fines.own')

      dispatch(
        addNotification({
          type: 'success',
          message: 'Fine unpaid',
        })
      )
    } catch (error) {
      const message = getErrorMessage(error)

      dispatch(
        addNotification({
          type: 'error',
          message: message,
        })
      )
    }
  }

  const payButton = (status: Fine['status']) => {
    switch (status) {
      case 'unpaid':
        return (
          <Dropdown.Item textValue="Pay" onSelect={handlePaid}>
            <span>Pay</span>
          </Dropdown.Item>
        )

      case 'pending':
        return (
          <Dropdown.Item textValue="Unpay" onSelect={handleUnpay}>
            <span>Unpay</span>
          </Dropdown.Item>
        )

      case 'paid':
        return (
          <Dropdown.Item textValue="Already paid" disabled>
            <span>Already paid</span>
          </Dropdown.Item>
        )

      default:
        return null
    }
  }

  return (
    <Dropdown open={isOpen} onOpenChange={toggleIsOpen}>
      <Dropdown.Trigger asChild>
        <IconButton aria-label="Options">
          <HamburgerMenuIcon />
        </IconButton>
      </Dropdown.Trigger>

      <Dropdown.Content>
        {payButton(fine.status)}

        <Dropdown.Arrow className="-translate-x-3 lg:translate-x-0" />
      </Dropdown.Content>
    </Dropdown>
  )
}
