import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

class Header extends React.Component {
  render() {
    const { logo, title, version } = this.props.data;

    return (
      <header className="header">
        <h1 className="logo">
          <Link to={logo.linkUrl}>
            <img src={logo.src} alt="logo" />
          </Link>
        </h1>
        {title && title.text ? (
          <span className="info-wrapper">
            <span className="project-name">/</span>
            <span className="project-name">
              <a href={title.linkUrl} target="_blank" rel="noreferrer noopener">
                {title.text}
              </a>
            </span>
          </span>
        ) : null}
        {version ? (
          <span className={`info-wrapper${title && title.text ? ' has-title' : ''}`}>
            <span className="splitter">|</span>
            <span className="version">v{version}</span>
          </span>
        ) : null}
      </header>
    );
  }
}

Header.propTypes = {
  data: PropTypes.object
};

export default Header;
