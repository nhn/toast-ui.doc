const helper = require('./apiDataFactoryHelper');

/**
 * Make data of navigation
 * @param {Object} data - original data
 * @returns {Object} customized data
 */
function makeNavData(data) {
  const {
    pid,
    name,
    kind
  } = data;

  return {
    pid,
    parentPid: kind,
    name,
    opened: false,
    type: 'api'
  };
}

/**
 * Make data of each "Event" menu item
 * @param {string} name - name for menu id
 * @param {string} parentPid - parent menu id
 * @returns {Object} customized data
 */
function makeEventData(name, parentPid) {
  return {
    pid: helper.makeChildPid(name, parentPid, 'event'),
    parentPid,
    name,
    kind: 'event'
  };
}

/**
 * Make data of each "Augments" menu item
 * @param {string} name - name for menu id
 * @param {string} parentPid - parent menu id
 * @returns {Object} customized data
 */
function makeAugmentData(name, parentPid) {
  return {
    pid: name,
    parentPid,
    name: name,
    kind: 'augment'
  };
}

/**
 * Make data of "Augments" menu
 * @param {Array.<Object>} items - augment items
 * @param {Object} parent - parent data
 * @returns {Array.<Object>} customized data of augment items
 */
function makeAugmentsData(items, parent) {
  return items.map(item => {
    return makeAugmentData(item.name, parent.pid);
  });
}

/**
 * Make data of each "Mixes" menu item
 * @param {string} name - name for menu id
 * @param {string} parentPid - parent menu id
 * @returns {Object} customized data
 */
function makeMixData(name, parentPid) {
  return {
    pid: name,
    parentPid,
    name: name,
    kind: 'mix'
  };
}

/**
 * Make data of "Mixes" menu
 * @param {Array.<Object>} items - mix items
 * @param {Object} parent - parent data
 * @returns {Array.<Object>} customized data of mix items
 */
function makeMixesData(items, parent) {
  return items.map(item => {
    const {name} = item;
    const originalName = name.split('.').pop();

    return makeMixData(originalName, parent.pid);
  });
}

/**
 * Make data of each "Static Members" menu item
 * @param {string} name - name for menu id
 * @param {string} parentPid - parent menu id
 * @param {string} kind - "property" or "method"
 * @returns {Object} customized data
 */
function makeStaticMemberData(name, parentPid, kind) {
  return {
    pid: helper.makeChildPid(name, parentPid),
    parentPid,
    name: name,
    kind: kind === 'method' ? 'static-method' : 'static-property'
  };
}

/**
 * Make data of "Static Members" menu
 * @param {Array.<Object>} items - static member items
 * @param {Object} parent - parent data
 * @returns {Array.<Object>} customized data of static member items
 */
function makeStaticMembersData(items, parent) {
  return items.map(item => {
    const {name, kind} = item;
    const customKind = kind === 'function' || kind === 'method' ? 'method' : 'property';

    return makeStaticMemberData(name, parent.pid, customKind);
  });
}

/**
 * Make data of each "Instance Members" menu item
 * @param {string} name - name for menu id
 * @param {string} parentPid - parent menu id
 * @param {string} kind - "property" or "method"
 * @returns {Object} customized data
 */
function makeInstanceMemberData(name, parentPid, kind) {
  return {
    pid: helper.makeChildPid(name, parentPid),
    parentPid,
    name: name,
    kind: kind === 'method' ? 'instance-method' : 'instance-property'
  };
}

/**
 * Make data of "Instance Members" menu
 * @param {Array.<Object>} items - instance member items
 * @param {Object} parent - parent data
 * @returns {Array.<Object>} customized data of instance member items
 */
function makeInstanceMembersData(items, parent) {
  const customItems = [];

  items.forEach(item => {
    const {kind} = item;
    const customKind = kind === 'function' || kind === 'method' ? 'method' : 'property';

    if (kind) {
      customItems.push(makeInstanceMemberData(item.name, parent.pid, customKind));
    }
  });

  return customItems;
}

/**
 * Make data of sub-navigation
 * @param {Object} data - original data
 * @param {Object} parent - parent menu data
 * @returns {Object} customized data
 */
function makeSubNavData(data, parent) {
  const {
    augments,
    members,
    tags
  } = data;
  const augmentList = makeAugmentsData(augments, parent);
  const mixList = makeMixesData(helper.getMixesTag(tags), parent);
  const staticMemberList = makeStaticMembersData(members['static'], parent);
  const instanceMemberList = makeInstanceMembersData(members.instance, parent);
  const list = [];

  return list.concat(augmentList)
    .concat(mixList)
    .concat(staticMemberList)
    .concat(instanceMemberList);
}

/**
 * Make each member item
 * @param {Object} data - original data
 * @returns {Object} customized data
 */
function makeMemberItem(data) { // eslint-disable-line complexity
  const {
    originName,
    name,
    parentPid,
    kind,
    scope
  } = data;
  const isExternal = !!(originName.split('external:').length > 1);

  let item;

  if (kind === 'event') {
    item = makeEventData(name, parentPid);
  } else {
    const customScope = !scope && isExternal ? 'instance' : 'static';
    const customKind = kind === 'function' || kind === 'method' ? 'method' : 'property';

    if (customScope === 'instance') {
      item = makeInstanceMemberData(name, parentPid, customKind);
    } else {
      item = makeStaticMemberData(name, parentPid, customKind);
    }
  }

  return item;
}

module.exports = {
  makeNavData,
  makeSubNavData,
  makeMemberItem
};
