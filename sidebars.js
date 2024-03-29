module.exports = {
  concepts: [{type: 'autogenerated', dirName: 'concepts'}],
  developers: [
     'developers/intro',
    // { type: 'category', label: 'Integrating Identities', items: [{ type: 'autogenerated', dirName: 'developers/integration' }] },
    // { type: 'category', label: 'Claim Issuers', items: [{ type: 'autogenerated', dirName: 'developers/claim-issuers' }] },
    // { type: 'category', label: 'Information Providers', items: [{ type: 'autogenerated', dirName: 'developers/information-providers' }] },
    { type: 'category', label: 'Identity SDK', collapsed: false, items: [{ type: 'autogenerated', dirName: 'developers/sdk' }] },
  ],
  about: [{ type: 'autogenerated', dirName: 'about' }],
};
