
module.exports = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Purpose & Architecture',
      collapsed: false,
      items: [
        'onchainIdentities',
        'identityClaims',
        'trex',
      ],
    },
    {
      type: 'category',
      label: 'developers',
      items: [
        {
          type: 'category',
          label: 'ONCHAINID SDK',
          collapsed: false,
          items: [
            'sdk/intro',
            'sdk/getStarted',
            'sdk/provider',
            'sdk/signature',
            'sdk/constants',
            'sdk/usageDoc',
          ],
        },
        {
          type: 'category',
          label: 'ONCHAINID API',
          collapsed: false,
          items: [
            'api/intro',
            'api/getStarted',
          ],
        },
      ],
    },
  ],
};
