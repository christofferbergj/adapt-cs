import { Fine } from '@app/fines'
import { Dropdown } from '@components/Dropdown'
import { IconButton } from '@components/IconButton'
import { addNotification } from '@features/notifications/notification.slice'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { useAppDispatch } from '@redux/hooks'
import { getErrorMessage } from '@utils/getErrorMessage'
import { trpc } from '@utils/trpc'
import { useState } from 'react'
import { useKeyPressEvent } from 'react-use'

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
    console.log('handlePaid', fine.id)

    try {
      await paidMutation.mutateAsync({
        id: fine.id,
      })

      await utils.invalidateQueries('fines.own')

      dispatch(
        addNotification({
          type: 'success',
          message: 'Fine paid',
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
    console.log('handleUnpay', fine.id)

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

  useKeyPressEvent(
    'b',
    (e) => {
      e.preventDefault()

      if (!e.metaKey) return
      if (!isOpen) return

      switch (fine.status) {
        case 'unpaid':
          handlePaid()
        case 'pending':
          handleUnpay()
      }
    },
    null
  )

  const payButton = (status: Fine['status']) => {
    switch (status) {
      case 'unpaid':
        return (
          <Dropdown.Item textValue="Pay" onSelect={handlePaid}>
            <span>Pay</span>
            <Dropdown.RightSlot>⌘+B</Dropdown.RightSlot>
          </Dropdown.Item>
        )

      case 'pending':
        return (
          <Dropdown.Item textValue="Unpay" onSelect={handleUnpay}>
            <span>Unpay</span>
            <Dropdown.RightSlot>⌘+B</Dropdown.RightSlot>
          </Dropdown.Item>
        )

      case 'paid':
        return (
          <Dropdown.Item>
            <span>Paid</span>
            <Dropdown.RightSlot>⌘+B</Dropdown.RightSlot>
          </Dropdown.Item>
        )

      default:
        return null
    }
  }

  return (
    <Dropdown open={isOpen} onOpenChange={toggleIsOpen}>
      <Dropdown.Trigger>
        <IconButton aria-label="Options">
          <HamburgerMenuIcon />
        </IconButton>
      </Dropdown.Trigger>

      <Dropdown.Content>
        {payButton(fine.status)}

        <Dropdown.Arrow />
      </Dropdown.Content>
    </Dropdown>
  )
}
