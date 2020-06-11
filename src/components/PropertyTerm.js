import React from 'react';
import PropTypes from 'prop-types';

import Types from '../components/Types';
import CodeInfo from '../components/CodeInfo';

class PropertyTerm extends React.Component {
  render() {
    const { deprecated, name, types, codeInfo } = this.props;

    return (
      <h4 className="title">
        {deprecated ? <span className="signiture deprecated">deprecated</span> : null}
        <span className="name">{name}: </span> <Types data={types} />
        <CodeInfo data={codeInfo} />
      </h4>
    );
  }
}

PropertyTerm.propTypes = {
  deprecated: PropTypes.bool,
  name: PropTypes.string,
  types: PropTypes.object,
  codeInfo: PropTypes.object
};

export default PropertyTerm;
