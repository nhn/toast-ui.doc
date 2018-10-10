import React from 'react';
import PropTypes from 'prop-types';

import Types from '../components/Types';

class ParamsTable extends React.Component {
  getTableRows(parentProperties) {
    return parentProperties.map((item, index) => {
      const {
        name,
        types,
        defaultVal,
        description,
        properties
      } = item;

      let props;

      if (properties) {
        props = properties.slice();
        props.pop(); // must remove last item
      }

      return (
        <tr key={`tr-${index}`} className="comment">
          <td>
            <p className="name">{name}</p>
          </td>
          <td>
            <Types
              data={types}
              defaultVal={defaultVal}
            />
          </td>
          <td>
            <p className="description">{description}</p>
            {props && <ParamsTable properties={props} isProperties={true} />}
          </td>
        </tr>
      );
    });
  }

  render() {
    const {
      properties,
      isProperties,
      isPropertyTitle
    } = this.props;

    if (properties.length) {
      return (
        <div className={isProperties ? 'properties' : 'params-wrapper'}>
          <h5 className="title">{isProperties || isPropertyTitle ? 'PROPERTIES' : 'PARAMETERS'}</h5>
          <table className={isProperties ? '' : 'params'}>
            <colgroup>
              <col className="first-column" />
              <col className="second-column" />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {this.getTableRows(properties)}
            </tbody>
          </table>
        </div>
      );
    }

    return null;
  }
}

ParamsTable.propTypes = {
  properties: PropTypes.array,
  isProperties: PropTypes.bool,
  isPropertyTitle: PropTypes.bool
};

export default ParamsTable;
