import React from 'react';
import PropTypes from 'prop-types';

import FunctionTerm from '../components/FunctionTerm';
import ParamsTable from '../components/ParamsTable';
import ExampleItems from '../components/ExampleItems';
import NormalList from '../components/NormalList';

class Overview extends React.Component {
  render() {
    const {
      data,
      hasProperties
    } = this.props;
    const {
      deprecated,
      name,
      description,
      codeInfo,
      examples,
      sees,
      todos,
      augments,
      params
    } = data;

    const popItems = [
      sees.slice(),
      todos.slice(),
      augments.slice(),
      params.slice()
    ];

    popItems.forEach(items => {
      if (items.length) {
        items.pop(); // remove default item
      }
    });

    return (
      <div className="overview">
        <div className="subsection">
          <dl>
            <dt className="subsection-term">
              <FunctionTerm
                deprecated={deprecated}
                name={name}
                codeInfo={codeInfo}
              />
            </dt>
            <dd className="subsection-description">
              <p
                className="description"
                dangerouslySetInnerHTML={{__html: description}}
              />
              {popItems[0].length ?
                <NormalList
                  title={'SEES'}
                  items={popItems[0]}
                /> : null}
              {popItems[1].length ?
                <NormalList
                  title={'TODOS'}
                  items={popItems[1]}
                /> : null}
              {popItems[2].length ?
                <NormalList
                  title={'EXTENDS'}
                  items={popItems[2]}
                /> : null}
              <ParamsTable
                properties={popItems[3]}
                isPropertyTitle={hasProperties}
              />
              {examples.length ?
                <ExampleItems items={examples} /> : null}
            </dd>
          </dl>
        </div>
      </div>
    );
  }
}

Overview.propTypes = {
  data: PropTypes.object,
  hasProperties: PropTypes.bool
};

export default Overview;
