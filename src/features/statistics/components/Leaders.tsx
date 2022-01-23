import { useLeaders } from '@features/statistics/hooks/useLeaders'

import { Avatar } from '@app/core/components/elements/Avatar'
import { Container } from '@app/core/components/layout/Container'
import { formatCurrency } from '@utils/formatCurrency'

const Star = () => {
  return (
    <svg viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.22303 0.665992C7.32551 0.419604 7.67454 0.419604 7.77702 0.665992L9.41343 4.60039C9.45663 4.70426 9.55432 4.77523 9.66645 4.78422L13.914 5.12475C14.18 5.14607 14.2878 5.47802 14.0852 5.65162L10.849 8.42374C10.7636 8.49692 10.7263 8.61176 10.7524 8.72118L11.7411 12.866C11.803 13.1256 11.5206 13.3308 11.2929 13.1917L7.6564 10.9705C7.5604 10.9119 7.43965 10.9119 7.34365 10.9705L3.70718 13.1917C3.47945 13.3308 3.19708 13.1256 3.25899 12.866L4.24769 8.72118C4.2738 8.61176 4.23648 8.49692 4.15105 8.42374L0.914889 5.65162C0.712228 5.47802 0.820086 5.14607 1.08608 5.12475L5.3336 4.78422C5.44573 4.77523 5.54342 4.70426 5.58662 4.60039L7.22303 0.665992Z"
        fill="currentColor"
      ></path>
    </svg>
  )
}

export const Leaders = () => {
  const { leaders } = useLeaders()

  if (!leaders) return null

  return (
    <Container>
      <h2 className="text-lg font-bold">Leaderboard</h2>

      {leaders.length > 0 ? (
        <div className="mt-6 flex flex-col divide-y divide-gray-6">
          {leaders.map((leader, index) => (
            <div
              key={leader.id}
              className="first:pt-0 last:pb-0 py-3 flex gap-4"
            >
              <div className="relative">
                {index < 3 && (
                  <div className="absolute z-10 -right-2 -bottom-1 text-yellow-9 w-7">
                    <div className="absolute z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 font-mono text-black text-xs">
                      {index + 1}
                    </div>

                    <Star />
                  </div>
                )}

                <Avatar name={leader.name} imageUrl={leader.avatar} size="lg" />
              </div>

              <div className="flex flex-col leading-none">
                <h3 className="text-gray-11">{leader.name}</h3>

                <span className="mt-0.5 text-2xl text-gray-12 font-bold font-mono">
                  {formatCurrency(leader.totalPaid)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </Container>
  )
}
