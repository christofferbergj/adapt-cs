import { useMostPaidFines } from '@adapters/fine/hooks/useMostPaidFines'

import { Container } from '@components/layout/Container'
import { SnapBox } from '@components/elements/SnapBox'

export const MostPaidFines = () => {
  const { mostPaidFines } = useMostPaidFines()

  if (!mostPaidFines) return null

  return (
    <Container>
      <h2 className="text-lg font-bold">Most paid fines</h2>

      {mostPaidFines.length > 0 ? (
        <SnapBox>
          {mostPaidFines.map((fine) => (
            <SnapBox.Item key={fine.id}>
              <SnapBox.Title>{fine.title}</SnapBox.Title>
              <span className="mt-8 text-5xl font-bold">{fine.paidTimes}</span>
            </SnapBox.Item>
          ))}
        </SnapBox>
      ) : null}
    </Container>
  )
}