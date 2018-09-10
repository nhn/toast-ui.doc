import React from 'react';
import PropTypes from 'prop-types';

import Types from '../components/Types';
import CodeInfo from '../components/CodeInfo';
import ExampleItems from '../components/ExampleItems';

class PropertyItem extends React.Component {
  render() {
    const {
      data,
      isFirstItem
    } = this.props;
    const {
      pid,
      override,
      deprecated,
      name,
      types,
      description,
      codeInfo,
      examples
    } = data;

    return (
      <div
        id={pid}
        className={`definition-list${isFirstItem ? ' first-child' : ''}`}
      >
        <dl>
          <dt className="subsection-term">
            <h4 className="title">
              {deprecated ? <span className="signiture">deprecated</span> : null}
              {override ? <span className="signiture">override</span> : null}
              <span className="name">{name}: </span> <Types data={types} />
              <CodeInfo data={codeInfo} />
            </h4>
          </dt>
          <dd className="subsection-description">
            <p className="description">{description}</p>
            <ExampleItems items={examples} />
          </dd>
        </dl>
      </div>
    );
  }
}

PropertyItem.propTypes = {
  data: PropTypes.object,
  isFirstItem: PropTypes.bool
};

export default PropertyItem;
