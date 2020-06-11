import React from 'react';
import PropTypes from 'prop-types';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        {this.props.infoList.map((item, index) => {
          const { linkUrl, title } = item;

          return (
            <span className="info" key={`footer-info-${index}`}>
              <a href={linkUrl} target="_blank" rel="noreferrer noopener">
                {title}
              </a>
            </span>
          );
        })}
      </footer>
    );
  }
}

Footer.propTypes = {
  infoList: PropTypes.array
};

export default Footer;
