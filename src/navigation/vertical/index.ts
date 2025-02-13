// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Users',
      path: '/home',
      icon: 'tabler:smart-home'
    },
    {
      title: 'Activity Log',
      path: '/second-page',
      icon: 'tabler:mail'
    },
    {
      path: '/supplier',
      action: 'read',
      subject: 'acl-page',
      title: 'Supplier',
      icon: 'tabler:shield'
    },
    {
      title: 'Color',
      path: '/color',
      icon: 'tabler:shield'
    },
    {
      title: 'Product',
      path: '/product',
      icon: 'tabler:shield'
    }
  ]
}

export default navigation
