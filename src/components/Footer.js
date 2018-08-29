import React from 'react';
import {StaticQuery, graphql} from 'gatsby';

const Footer = () => (
  <StaticQuery
    query={graphql`
      query {
        allDataJson {
          edges {
            node {
              footer {
                title
                link
              }
            }
          }
        }
      }
    `}
    render={data => {
      const infoList = data.allDataJson.edges[0].node.footer;

      return (
        <footer className="footer">
          {infoList.map((item, index) => {
            const {
              link,
              title
            } = item;

            return (
              <span
                className="info"
                key={`footer-info-${index}`}
              >
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {title}
                </a>
              </span>
            );
          })}
        </footer>
      );
    }}
  />
);

export default Footer;
