import React from 'react';
import PropTypes from 'prop-types';

import CodeInfo from '../components/CodeInfo';

class FunctionTerm extends React.Component {
  getFunctionNameComponent(name) {
    return name.replace(/\((.*?)\)/g, (value, params) => {
      const replacedName = params.split(',').map((param) => {
        return `<span class="param">${param}</span>`;
      });

      return `(${replacedName})`;
    });
  }

  render() {
    const { deprecated, override, name, codeInfo } = this.props;

    return (
      <h4 className="title">
        {deprecated ? <span className="signiture deprecated">deprecated</span> : null}
        {override ? <span className="signiture override">override</span> : null}
        <span
          className="name"
          dangerouslySetInnerHTML={{ __html: this.getFunctionNameComponent(name) }}
        />
        <CodeInfo data={codeInfo} />
      </h4>
    );
  }
}

FunctionTerm.propTypes = {
  deprecated: PropTypes.bool,
  override: PropTypes.bool,
  name: PropTypes.string,
  codeInfo: PropTypes.object
};

export default FunctionTerm;
