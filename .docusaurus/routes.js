
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/',
    component: ComponentCreator('/','deb'),
    exact: true
  },
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug','3d6'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config','914'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content','c28'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData','3cf'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata','31b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry','0da'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes','244'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page','be1'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs','84a'),
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
        path: '/docs/developers/claim-issuers/intro',
        component: ComponentCreator('/docs/developers/claim-issuers/intro','a69'),
        exact: true,
        'sidebar': "developers"
      },
      {
        path: '/docs/developers/information-providers/intro',
        component: ComponentCreator('/docs/developers/information-providers/intro','21e'),
        exact: true,
        'sidebar': "developers"
      },
      {
        path: '/docs/developers/integration/intro',
        component: ComponentCreator('/docs/developers/integration/intro','c32'),
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
