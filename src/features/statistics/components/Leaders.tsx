import { useLeaders } from '@adapters/fine/hooks/useLeaders'

import { Avatar } from '@components/elements/Avatar'
import { Container } from '@components/layout/Container'
import { SnapBox } from '@components/elements/SnapBox'
import { formatCurrency } from '@utils/formatCurrency'

export const Leaders = () => {
  const { leaders } = useLeaders()

  if (!leaders) return null

  return (
    <Container>
      <h2 className="text-lg font-bold">Leaderboard</h2>

      {leaders.length > 0 ? (
        <SnapBox>
          {leaders.map((leader) => (
            <SnapBox.Item key={leader.id}>
              <div className="flex gap-4 items-center w-full justify-center">
                <Avatar name={leader.name} imageUrl={leader.avatar} />
                <SnapBox.Title>{leader.name}</SnapBox.Title>
              </div>

              <span className="mt-8 text-4xl font-bold">
                {formatCurrency(leader.totalPaid)}
              </span>
            </SnapBox.Item>
          ))}
        </SnapBox>
      ) : null}
    </Container>
  )
}