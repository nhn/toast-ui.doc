import React from 'react';
import PropTypes from 'prop-types';

class CodeInfo extends React.Component {
  render() {
    const {
      filename,
      lineNum,
      linkUrl
    } = this.props.data;

    return linkUrl && (
      <span className="code-info">
        <span className="code">
          <a
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {filename}
          </a>
        </span>
        <span className="code">
          <a
            href={`${linkUrl}#L${lineNum}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            line {lineNum}
          </a>
        </span>
      </span>
    );
  }
}

CodeInfo.propTypes = {
  data: PropTypes.object
};

export default CodeInfo;
