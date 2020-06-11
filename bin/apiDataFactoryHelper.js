function makePid(name) {
  return `${name}`.replace('/', '_');
}

function makeChildPid(name, parentId, kind) {
  const prefix = kind ? `${kind}-` : '';

  return `${parentId}#${prefix}${name}`.replace('/', '_');
}

function getMixesTag(tags) {
  return tags.filter((tag) => {
    return tag.title === 'mixes';
  });
}

function sort(items) {
  return items.sort((a, b) => {
    const before = a.name.toUpperCase();
    const after = b.name.toUpperCase();
    const falsy = before > after ? 1 : 0;

    return before < after ? -1 : falsy;
  });
}

function getDefaultParam() {
  return {
    name: '',
    description: '',
    defaultVal: '',
    types: {
      prefix: '',
      names: [''],
      isOptional: false
    },
    properties: [
      {
        name: '',
        description: '',
        defaultVal: '',
        types: {
          prefix: '',
          names: [''],
          isOptional: false
        },
        properties: [
          {
            name: '',
            description: '',
            defaultVal: '',
            types: {
              prefix: '',
              names: [''],
              isOptional: false
            },
            properties: [
              {
                name: '',
                description: '',
                defaultVal: '',
                types: {
                  prefix: '',
                  names: [''],
                  isOptional: false
                }
              }
            ]
          }
        ]
      }
    ]
  };
}

module.exports = {
  makePid,
  makeChildPid,
  getMixesTag,
  sort,
  getDefaultParam
};
