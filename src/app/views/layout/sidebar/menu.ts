import {MenuItem} from './menu.model';

export const MENU: MenuItem[] = [
  // {
  //   label: 'Home',
  //   isTitle: true
  // },
  // {
  //   label: 'Dashboard',
  //   icon: 'home',
  //   link: '/dashboard'
  // },
  //start section
  {
    label: 'Products Management',
    isTitle: true
  },
  {
    label: 'Products',
    icon: 'tag',
    subItems: [
      {
        label: 'All',
        link: '/products',
      },
    ],
  },
//end section
// start orders section
  {
    label: 'Orders Management',
    isTitle: true
  },
  {

    label: 'Orders',
    icon: 'truck',
    subItems: [
      {
        label: 'Processing',
        link: '/orders/processing',
      },
      {
        label: 'Prepared',
        link: '/orders/picked',
      },
      {
        label: 'On-way',
        link: '/orders/onway',
      }
    ]
  },
  //end orders section
  //start user management section

  {
    label: 'User Management',
    isTitle: true
  },
  {

    label: 'Customers',
    icon: 'users',
    subItems: [
      {
        label: 'All',
        link: '/customers',
      }
    ]
  },
  {
    label: 'Sellers',
    icon: 'users',
    subItems: [
      {
        label: 'All',
        link: '/sellers/listing',
      },
    ]
  },
  {
    label: 'Admins',
    icon: 'users',
    subItems: [
      {
        label: 'All',
        link: '/admins/all',
      },
      {
        label: 'Create',
        link: '/admins/create'

      },
    ]
  },
  //end user management section
  //start locations management section
  {
    label: 'Locations Management',
    isTitle: true,

  },
  {
    label: 'Locations',
    icon: 'map-pin',
    subItems: [
      {
        label: 'All',
        link: '/governorates',
      },
    ]
  },
  //end locations management section
  //start Roles management section
  {
    label: 'Permissions Management',
    isTitle: true
  },
  {
    label: 'Roles',
    icon: 'unlock',
    subItems: [
      {
        label: 'All',
        link: '/roles/all',
      },
      {
        label: 'Create',
        link: '/roles/create',
      },
    ]
  },

  {
    label: 'Categories Management',
    isTitle: true
  },
  {
    label: 'Categories',
    icon: 'align-center',
    subItems: [
      {
        label: 'All',
        link: '/categories/all',
      },
      {
        label: 'Create',
        link: '/categories/create',
      }
    ]
  },


];
