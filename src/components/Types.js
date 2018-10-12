import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';

const TYPE_NAME = [
  'number',
  'boolean',
  'string',
  'array',
  'object',
  'function',
  'htmlelement',
  'jquery',
  'any'
];

const getClassName = (name) => {
  let replacedName = name.toLowerCase();

  return (TYPE_NAME.indexOf(replacedName) > -1 ? replacedName : 'etc');
};

class Types extends React.Component {
  makeType(name, index) {
    const className = getClassName(name);

    let component;

    if (className === 'etc') {
      component = (
        <Link
          to={`/${name}`}
          key={`type-${index}`}
          className={`type ${className}`}
        >
          {name}
        </Link>
      );
    } else {
      component = (
        <span
          key={`type-${index}`}
          className={`type ${className}`}
        >
          {name}
        </span>
      );
    }

    return component;
  }

  makeTypeApplicationName(name, index) {
    const splited = name.split('.');
    const prefix = splited[0]; // 'Array' or 'Object'
    const joinedName = splited[1].split(',').map((item, idx) => this.makeType(item, idx));

    return (
      <span key={`type-${index}`}>
        {prefix}.&lt;{joinedName}&gt;
      </span>
    );
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
