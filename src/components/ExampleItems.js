import React from 'react';
import PropTypes from 'prop-types';

class ExampleItems extends React.Component {
  render() {
    const {items} = this.props;

    if (items.length) {
      return (
        <div>
          <h5 className="title">EXAMPLES</h5>
          {items.map((item, index) => {
            const {
              description,
              code
            } = item;

            return (
              <div key={`tutorial-${index}`}>
                {description ? <p className="description">{description}</p> : null}
                <pre className="codeblock tui-language-javascript">
                  <code dangerouslySetInnerHTML={{__html: code}} />
                </pre>
              </div>
            );
          })}
        </div>
      );
    }

    return null;
  }
}

ExampleItems.propTypes = {
  items: PropTypes.array
};

export default ExampleItems;
