import type { NextPage } from 'next'

import { Layout } from '@components/common/Layout'
import { OwnFinesOverview } from '@components/pages/me/OwnFinesOverview'

const Me: NextPage = () => {
  return (
    <Layout>
      <Layout.Space>
        <OwnFinesOverview />
      </Layout.Space>
    </Layout>
  )
}

export default Me
