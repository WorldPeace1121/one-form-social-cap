const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/HomePage.vue'),
        name: 'HomePage',
        meta: {
          title: 'Home',
        },
      },
      {
        path: '/proposal/detail/:pid',
        component: () => import('src/pages/proposals/DetailPage.vue'),
        name: 'ProposalDetailPage',
      },
      {
        path: '/proposal/form',
        component: () => import('src/pages/proposals/CreatePage.vue'),
        name: 'CreateProposalPage',
      },
      {
        path: '/my-proposal',
        component: () => import('src/pages/MyProposal.vue'),
        name: 'MyProposal',
      },
      {
        path: '/social',
        component: () => import('pages/SocialPage.vue'),
        name: 'SocialPage',
      },
    ],
  },
  {
    path: '/allocator',
    component: () => import('layouts/AllocatorLayout.vue'),
    name: 'AllocatorLayout',
    redirect: '/allocator',
    children: [
      {
        path: '',
        component: () => import('src/pages/allocator/ProposalManagement.vue'),
        name: 'ProposalManagement',
        meta: {
          title: 'Proposal Management',
        },
      },
    ],
  },
  {
    path: '/error/:code',
    component: () => import('src/pages/AppErrorPage.vue'),
    name: 'AppErrorPage',
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
