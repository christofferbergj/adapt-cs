import Image from 'next/image'

import { Container } from '@components/layout/Container'
import { SnapBox } from '@components/elements/SnapBox'
import { useLeaders } from '@features/fine/use-cases/useLeaders'

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
                {leader.avatar && (
                  <div className="w-[24px] h-[24px] rounded-full overflow-hidden">
                    <Image
                      width={24}
                      height={24}
                      src={leader.avatar}
                      alt="avatar"
                    />
                  </div>
                )}
                <SnapBox.Title>{leader.name}</SnapBox.Title>
              </div>

              <span className="mt-8 text-4xl font-bold">
                {new Intl.NumberFormat('da-DK', {
                  style: 'currency',
                  currency: 'DKK',
                }).format(leader.totalPaid)}
              </span>
            </SnapBox.Item>
          ))}
        </SnapBox>
      ) : null}
    </Container>
  )
}
