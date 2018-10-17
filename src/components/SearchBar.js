import React from 'react';
import PropTypes from 'prop-types';
import {StaticQuery, graphql, navigate} from 'gatsby';

import SearchList from '../components/SearchList';

const KEY_CODE_ENTER = 13;
const KEY_CODE_UP = 38;
const KEY_CODE_DOWN = 40;

const SEARCH_BAR_CLASSNAME = 'search-container';

const hasClass = (element, className) => {
  const elClassName = element && element.getAttribute &&
      (element.getAttribute('class') || element.getAttribute('className') || '');

  return elClassName.indexOf(className) > -1;
};

const toLowerCase = (str) => {
  return str.toLowerCase();
};

const defaultState = {
  searching: false,
  value: null,
  movedIndex: -1,
  result: []
};

class SearchBar extends React.Component {
  constructor() {
    super();

    this.state = defaultState;

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  attachEvent() {
    document.addEventListener('click', this.handleClick);
  }

  detachEvent() {
    document.removeEventListener('click', this.handleClick);
  }

  handleKeyDown(ev) {
    const {
      keyCode
    } = ev;

    this.setState((prevState) => {
      let index = prevState.movedIndex;

      if (keyCode === KEY_CODE_UP &&
        index > 0) {
        index -= 1;
      } else if (keyCode === KEY_CODE_DOWN &&
        index < this.state.result.length - 1) {
        index += 1;
      }

      return {
        movedIndex: index
      };
    });
  }

  handleKeyUp(ev) {
    const {
      keyCode,
      target
    } = ev;

    const {
      result,
      movedIndex
    } = this.state;

    if (keyCode === KEY_CODE_UP ||
      keyCode === KEY_CODE_DOWN) {
      return;
    }

    if (keyCode === KEY_CODE_ENTER &&
      result.length && movedIndex > -1) {
      let url = `/${result[movedIndex].node.pid}`;
      this.moveToPage(url);
    } else {
      this.search(target.value);
    }
  }

  handleFocus(ev) {
    const {
      value
    } = ev.target;

    this.attachEvent();

    if (value.length) {
      this.search(value);
    }
  }

  handleClick(ev) {
    let element = ev.target;

    while (element && !hasClass(element, SEARCH_BAR_CLASSNAME)) {
      element = element.parentElement;
    }

    if (!element) {
      this.resetState();
    }
  }

  search(query) {
    this.setState({
      searching: true,
      value: query,
      result: this.findMatchingValues(query)
    });
  }

  findMatchingValues(value) {
    return this.props.data.filter(item => {
      const foundValue = toLowerCase(item.node.name);

      return (value !== '' && foundValue.indexOf(toLowerCase(value)) > -1);
    });
  }

  moveToPage(url) {
    if (url) {
      navigate(url);
    }

    this.resetState();
  }

  resetState() {
    this.detachEvent();

    this.setState({
      searching: false,
      value: null,
      result: [],
      movedIndex: -1
    });
  }

  render() {
    const {
      searching,
      value,
      result,
      movedIndex
    } = this.state;

    return (
      <div className={`search-container${searching ? ' searching' : ''}`}>
        <div className="search-box">
          <span className={`btn-search${searching ? ' searching' : ''}`}>
            <span className="icon">
              <span className="oval"></span>
              <span className="stick"></span>
            </span>
          </span>
          <input
            type="text"
            placeholder="Search"
            onKeyDown={this.handleKeyDown}
            onKeyUp={this.handleKeyUp}
            onFocus={this.handleFocus}
          />
        </div>
        <hr className={`line ${searching ? 'show' : 'hide'}`} />
        <SearchList
          searching={searching}
          value={value}
          result={result}
          movedIndex={movedIndex}
        />
      </div>
    );
  }
}

const SearchBarWrapper = () => (
  <StaticQuery
    query={graphql`
      query {
        allSearchKeywordsJson {
          edges {
            node {
              pid
              parentPid
              name
            }
          }
        }
      }
    `}
    render={data => <SearchBar data={data.allSearchKeywordsJson.edges} />}
  />
);

SearchBar.propTypes = {
  data: PropTypes.array
};

export default SearchBarWrapper;
