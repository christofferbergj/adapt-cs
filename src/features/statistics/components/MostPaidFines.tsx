import { formatCurrency } from '@utils/formatCurrency'
import { useMostPaidFines } from '@features/statistics/hooks/useMostPaidFines'

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
              <SnapBox.Title>
                {fine.title}{' '}
                <span className="text-xs text-gray-11">({fine.paidTimes})</span>
              </SnapBox.Title>

              <span className="mt-6 text-xl font-bold">
                {formatCurrency(fine.sum)}
              </span>
            </SnapBox.Item>
          ))}
        </SnapBox>
      ) : null}
    </Container>
  )
}
