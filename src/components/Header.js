import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'gatsby';

class Header extends React.Component {
  render() {
    const {
      logo,
      linkUrl,
      title,
      version
    } = this.props.data;

    return (
      <header className="header">
        <h1 className="logo">
          <Link to={`/`}>
            <img src={logo} alt="logo" />
          </Link>
        </h1>
        {title ?
          <span className="info-wrapper">
            <span className="project-name">/</span>
            <span className="project-name">
              <a
                href={linkUrl}
                target="_blank"
                rel="noreferrer noopener"
              >
                {title}
              </a>
            </span>
          </span> : null}
        <span className={`info-wrapper${title ? ' has-title' : ''}`}>
          <span className="splitter">|</span>
          <span className="version">v{version}</span>
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  data: PropTypes.object
};

export default Header;
