import React from 'react';
import {Link, StaticQuery, graphql} from 'gatsby';

const Header = () => (
  <StaticQuery
    query={graphql`
      query {
        allDataJson {
          edges {
            node {
              header {
                logo
                link
                title
                version
              }
            }
          }
        }
      }
    `}
    render={data => {
      const {
        logo,
        link,
        title,
        version
      } = data.allDataJson.edges[0].node.header;

      return (
        <header className="header">
          <h1 className="logo">
            <Link to={`/`}>
              <img src={logo} alt="logo" />
            </Link>
          </h1>
          <span className="info project-name">
            <a
              href={link}
              target="_blank"
              rel="noreferrer noopener"
            >
              {title}
            </a>
          </span>
          <span className="splitter">|</span>
          <span className="version">v{version}</span>
        </header>
      );
    }}
  />
);

export default Header;
