import React from 'react';
import PropTypes from 'prop-types';

const TYPE_NAME = [
  'number',
  'boolean',
  'string',
  'array',
  'object',
  'function',
  'date',
  'htmlelement',
  'jquery',
  'jqueryevent',
  'any'
];

const getClassName = (name) => {
  let replacedName = name.toLowerCase();

  return (TYPE_NAME.indexOf(replacedName) > -1 ? replacedName : 'etc');
};

class Types extends React.Component {
  makeType(name, index) {
    const className = getClassName(name);

    return (
      <span
        key={`type-${index}`}
        className={`type ${className}`}
      >
        {name}
      </span>
    );
  }

  makeTypeApplicationName(name, index) {
    const splited = name.split('.');
    const matrix = splited.length > 2;

    let prefix = splited[0]; // 'Array' or 'Object'
    let types = splited[1];

    let subPrefix;

    if (matrix) {
      subPrefix = splited[1];
      types = splited[2];
    }

    const joinedName = types.split('|').map((item, idx) => this.makeType(item, idx));

    let component;

    if (matrix) {
      component = (
        <span
          className="type"
          key={`type-${index}`}>
          {prefix}.&lt;{subPrefix}.&lt;{joinedName}&gt;&gt;
        </span>
      );
    } else {
      component = (
        <span
          className="type"
          key={`type-${index}`}>
          {prefix}.&lt;{joinedName}&gt;
        </span>
      );
    }

    return component;
  }

  makeOptionalType(types) {
    const {
      defaultVal,
      data
    } = this.props;
    const {
      prefix,
      isOptional
    } = data;
    const defaultValue = defaultVal ? ` = ${this.props.defaultVal}` : '';

    let wrapperComponent;

    if (isOptional) {
      wrapperComponent = (
        <span className="types-wrapper">
          [ {prefix}{types} ]
          {defaultValue}
        </span>
      );
    } else {
      wrapperComponent = (
        <span className="types-wrapper">
          {prefix}{types}{defaultValue}
        </span>
      );
    }

    return wrapperComponent;
  }

  render() {
    const {names} = this.props.data;

    if (names) {
      const types = names.map((name, index) => {
        if (name.indexOf('.') > -1) {
          return this.makeTypeApplicationName(name);
        }

        return this.makeType(name, index);
      });

      return (
        <p className="types">
          {this.makeOptionalType(types)}
        </p>
      );
    }

    return null;
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
