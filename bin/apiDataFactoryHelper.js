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
    return items.sort((a, b) => {
      const before = a.name.toUpperCase();
      const after = b.name.toUpperCase();
      const falsy = before > after ? 1 : 0;

      return before < after ? -1 : falsy;
    });
  },
  getDefaultParam: function() {
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
};
