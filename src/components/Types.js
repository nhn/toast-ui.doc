import React from 'react';
import PropTypes from 'prop-types';

const TYPE_NAME = [
  'number',
  'boolean',
  'string',
  'array',
  'object',
  'function'
];
const SPLITTER = `<span class="splitter">|</span>`;

const getClassName = (name) => {
  let replacedName = name.toLowerCase();

  return (TYPE_NAME.indexOf(replacedName) > -1 ? replacedName : 'etc');
};

class Types extends React.Component {
  makeTypeApplicationName(name) {
    const splited = name.split('.');
    const prefix = splited[0]; // 'Array' or 'Object'
    const joinedName = splited[1].split(',').map(item => {
      let className = getClassName(item);

      return `<span class="type ${className}">${item}</span>`;
    }).join(SPLITTER);

    return `${prefix}.<${joinedName}>`;
  }

  makeTypes() {
    const {
      data,
      defaultVal
    } = this.props;
    const {
      type,
      prefix,
      names
    } = data;

    if (names) {
      let joinedNames = names.map(name => {
        if (name.indexOf('.') > -1) {
          return this.makeTypeApplicationName(name);
        }

        let className = getClassName(name);
        let replcedName = `${prefix}<span class="type ${className}">${name}</span>`;

        if (type === 'OptionalType') {
          replcedName = `[ ${replcedName} ]`;
        }

        return replcedName;
      }).join(SPLITTER);

      let defaultValue = defaultVal ? ` = ${defaultVal}` : '';

      return `${joinedNames}${defaultValue}`;
    }

    return '';
  }

  render() {
    return (
      <p className="types" dangerouslySetInnerHTML={{__html: this.makeTypes()}} />
    );
  }
}

Types.propTypes = {
  data: PropTypes.object.isRequired,
  defaultVal: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ])
};

export default Types;
