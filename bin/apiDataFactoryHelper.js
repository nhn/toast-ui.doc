function handleSort(a, b) {
  const before = a.name;
  const after = b.name;
  const falsy = before > after ? 1 : 0;

  return before < after ? -1 : falsy;
}

module.exports = {
  makePid: function(name) {
    return `${name}`.replace('/', '_');
  },
  makeChildPid: function(name, parentId, kind) {
    let prefix = kind ? `${kind}-` : '';

    return `${parentId}#${prefix}${name}`.replace('/', '_');
  },
  getMixesTag: function(tags) {
    return tags.filter((tag) => {
      return tag.title === 'mixes';
    });
  },
  sort: function(items) {
    return items.sort(handleSort);
  },
  getDefaultParam: function() {
    return {
      name: '',
      description: '',
      defaultVal: '',
      types: {
        prefix: '',
        type: '',
        names: ['']
      },
      properties: [
        {
          name: '',
          description: '',
          defaultVal: '',
          types: {
            prefix: '',
            type: '',
            names: ['']
          },
          properties: [
            {
              name: '',
              description: '',
              defaultVal: '',
              types: {
                prefix: '',
                type: '',
                names: ['']
              },
              properties: [
                {
                  name: '',
                  description: '',
                  defaultVal: '',
                  types: {
                    prefix: '',
                    type: '',
                    names: ['']
                  }
                }
              ]
            }
          ]
        }
      ]
    };
  }
};
