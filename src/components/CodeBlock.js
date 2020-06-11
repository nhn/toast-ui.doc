import React from 'react';
import PropTypes from 'prop-types';

class CodeBlock extends React.Component {
  render() {
    return (
      <pre className="codeblock tui-language-javascript">
        <code dangerouslySetInnerHTML={{ __html: this.props.code }} />
      </pre>
    );
  }
}

CodeBlock.propTypes = {
  code: PropTypes.string
};

export default CodeBlock;
