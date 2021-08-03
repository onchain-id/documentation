
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/',
    component: ComponentCreator('/','deb'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page','be1'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs','a7d'),
    routes: [
      {
        path: '/docs/about/license',
        component: ComponentCreator('/docs/about/license','dcc'),
        exact: true,
        'sidebar': "about"
      },
      {
        path: '/docs/concepts/identityClaims',
        component: ComponentCreator('/docs/concepts/identityClaims','4cf'),
        exact: true,
        'sidebar': "concepts"
      },
      {
        path: '/docs/concepts/intro',
        component: ComponentCreator('/docs/concepts/intro','e01'),
        exact: true,
        'sidebar': "concepts"
      },
      {
        path: '/docs/concepts/onchainIdentities',
        component: ComponentCreator('/docs/concepts/onchainIdentities','8bc'),
        exact: true,
        'sidebar': "concepts"
      },
      {
        path: '/docs/concepts/trex',
        component: ComponentCreator('/docs/concepts/trex','6c5'),
        exact: true,
        'sidebar': "concepts"
      },
      {
        path: '/docs/developers/api/getStarted',
        component: ComponentCreator('/docs/developers/api/getStarted','8de'),
        exact: true,
        'sidebar': "developers"
      },
      {
        path: '/docs/developers/api/intro',
        component: ComponentCreator('/docs/developers/api/intro','2fd'),
        exact: true,
        'sidebar': "developers"
      },
      {
        path: '/docs/developers/intro',
        component: ComponentCreator('/docs/developers/intro','718'),
        exact: true,
        'sidebar': "developers"
      },
      {
        path: '/docs/developers/sdk/constants',
        component: ComponentCreator('/docs/developers/sdk/constants','0d2'),
        exact: true,
        'sidebar': "developers"
      },
      {
        path: '/docs/developers/sdk/getStarted',
        component: ComponentCreator('/docs/developers/sdk/getStarted','814'),
        exact: true,
        'sidebar': "developers"
      },
      {
        path: '/docs/developers/sdk/intro',
        component: ComponentCreator('/docs/developers/sdk/intro','7a8'),
        exact: true,
        'sidebar': "developers"
      },
      {
        path: '/docs/developers/sdk/provider',
        component: ComponentCreator('/docs/developers/sdk/provider','0fe'),
        exact: true,
        'sidebar': "developers"
      },
      {
        path: '/docs/developers/sdk/signature',
        component: ComponentCreator('/docs/developers/sdk/signature','d66'),
        exact: true,
        'sidebar': "developers"
      },
      {
        path: '/docs/developers/sdk/usageDoc',
        component: ComponentCreator('/docs/developers/sdk/usageDoc','10a'),
        exact: true,
        'sidebar': "developers"
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
