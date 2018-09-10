import React from 'react';
import PropTypes from 'prop-types';

import CodeInfo from '../components/CodeInfo';
import ParamsTable from '../components/ParamsTable';
import ExampleItems from '../components/ExampleItems';
import SubCategory from '../components/SubCategory';

class Overview extends React.Component {
  render() {
    const {isClass} = this.props;
    const {
      name,
      description,
      codeInfo,
      examples,
      sees,
      todos,
      augments,
      params
    } = this.props.data;

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
              {isClass ?
                <h4 className="title">
                  <span className="name">{name}</span>
                  <CodeInfo data={codeInfo} />
                </h4> : null}
            </dt>
            <dd className="subsection-description">
              <p className="description">{description}</p>
              {popItems[0].length ?
                <SubCategory
                  title={'SEES'}
                  listType={'mixed'}
                  items={popItems[0]}
                /> : null}
              {popItems[1].length ?
                <SubCategory
                  title={'TODOS'}
                  listType={'normal'}
                  items={popItems[1]}
                /> : null}
              {popItems[2].length ?
                <SubCategory
                  title={'AUGMENTS'}
                  listType={'normal'}
                  items={popItems[2]}
                /> : null}
              <ParamsTable properties={popItems[3]} />
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
  isClass: PropTypes.bool,
  data: PropTypes.object
};

export default Overview;
