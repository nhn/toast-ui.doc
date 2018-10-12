import React from 'react';
import PropTypes from 'prop-types';

import FunctionTerm from '../components/FunctionTerm';
import ParamsTable from '../components/ParamsTable';
import ReturnItem from '../components/ReturnItem';
import ExampleItems from '../components/ExampleItems';
import NormalList from '../components/NormalList';

class FunctionItem extends React.Component {
  render() { // eslint-disable-line complexity
    const {
      data,
      isFirstItem
    } = this.props;
    const {
      type,
      pid,
      override,
      deprecated,
      name,
      description,
      codeInfo,
      examples,
      sees,
      todos,
      params,
      returns
    } = data;

    const popItems = [
      sees.slice(),
      todos.slice(),
      params.slice(),
      returns.slice()
    ];

    popItems.forEach(items => {
      if (items.length) {
        items.pop(); // remove default item
      }
    });

    return (
      <div
        id={pid}
        className={`definition-list${isFirstItem ? ' first-child' : ''}`}
      >
        <dl>
          <dt className="subsection-term">
            <FunctionTerm
              deprecated={deprecated}
              override={override}
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
            <ParamsTable
              properties={popItems[2]}
              isPropertyTitle={type === 'event'}
            />
            {popItems[3].length ?
              <ReturnItem data={popItems[3][0]} /> : null}
            {examples.length ?
              <ExampleItems items={examples} /> : null}
          </dd>
        </dl>
      </div>
    );
  }
}

FunctionItem.propTypes = {
  data: PropTypes.object,
  isFirstItem: PropTypes.bool
};

export default FunctionItem;
