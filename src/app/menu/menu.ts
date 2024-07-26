import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    icon: 'home',
    url: 'dashboard'
  },
  {
    id: 'users',
    title: 'Users',
    type: 'item',
    icon: 'users',
    url: 'users'
  },
  // {
  //   id: 'plans',
  //   title: 'Plans',
  //   type: 'item',
  //   icon: 'book-open',
  //   url: '#'
  // },
  {
    id: 'meals',
    title: 'Meals',
    type: 'collapsible',
    icon: 'archive',
    children: [
      {
        id: 'categories',
        title: 'Categories',
        type: 'item',
        icon: 'circle',
        url: 'meals/categories'
      },
      {
        id: 'items',
        title: 'Items',
        type: 'item',
        icon: 'circle',
        url: 'meals/items'
      },
      {
        id: 'nutrients',
        title: 'Nutrients',
        type: 'item',
        icon: 'circle',
        url: 'meals/nutrient'
      },
      {
        id: 'meals',
        title: 'Meals',
        type: 'item',
        icon: 'circle',
        url: 'meals/meals-list'
      }
    ]
  },
  {
    id: 'weekly-menu',
    title: 'Weekly Menu',
    type: 'item',
    icon: 'users',
    url: 'weekly-menu'
  },
  
]
