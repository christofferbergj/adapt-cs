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
  const payMutation = trpc.useMutation('fines.pay')
  const utils = trpc.useContext()
  const [isOpen, setIsOpen] = useState(false)

  const toggleIsOpen = () => setIsOpen(!isOpen)

  const handlePaid = async () => {
    try {
      await payMutation.mutateAsync({
        id: fine.id,
      })

      await utils.invalidateQueries('fines.pending')

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

  return (
    <Dropdown open={isOpen} onOpenChange={toggleIsOpen}>
      <Dropdown.Trigger>
        <IconButton aria-label="Options">
          <HamburgerMenuIcon />
        </IconButton>
      </Dropdown.Trigger>

      <Dropdown.Content>
        <Dropdown.Item textValue="Paid" onSelect={handlePaid}>
          <span>Paid</span>
        </Dropdown.Item>

        <Dropdown.Arrow className="-translate-x-3 lg:translate-x-0" />
      </Dropdown.Content>
    </Dropdown>
  )
}
