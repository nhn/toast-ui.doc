const helper = require('./apiDataFactoryHelper');

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

function makeAugmentData(name, parentPid) {
  return {
    pid: helper.makePid(name, parentPid),
    parentPid,
    name: name,
    kind: 'augment'
  };
}

function makeAugmentsData(items, parent) {
  return items.map(item => {
    return makeAugmentData(item.name, parent.pid);
  });
}

function makeMixData(name, parentPid) {
  return {
    pid: helper.makeChildPid(name, parentPid),
    parentPid,
    name: name,
    kind: 'mix'
  };
}

function makeMixesData(items, parent) {
  return items.map(item => {
    const {name} = item;
    const originalName = name.split('.').pop();

    return makeMixData(originalName, parent.pid);
  });
}

function makeStaticMemberData(name, parentPid, kind) {
  return {
    pid: helper.makeChildPid(name, parentPid),
    parentPid,
    name: name,
    kind: `static-${kind}`
  };
}

function makeStaticMembersData(items, parent) {
  return items.map(item => {
    const {
      name,
      kind
    } = item;

    return makeStaticMemberData(name, parent.pid, kind || 'property');
  });
}

function makeInstanceMemberData(name, parentPid, kind) {
  return {
    pid: helper.makeChildPid(name, parentPid),
    parentPid,
    name: name,
    kind: `instance-${kind}`
  };
}

function makeEventData(name, parentPid) {
  return {
    pid: helper.makeChildPid(name, parentPid, 'event'),
    parentPid,
    name,
    kind: 'event'
  };
}

function makeInstanceMembersData(items, parent) {
  const customItems = [];

  items.forEach(item => {
    const {kind} = item;

    if (kind) {
      customItems.push(makeInstanceMemberData(item.name, parent.pid, kind));
    }
  });

  return customItems;
}

function makeSubNavData(item, parent) {
  const {
    augments,
    members,
    tags
  } = item;
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

function makeMemberItem(data) {
  const {
    name,
    parentPid,
    kind,
    scope
  } = data;

  let item;

  if (kind === 'event') {
    item = makeEventData(name, parentPid);
  } else {
    const type = kind === 'function' ? 'function' : 'property';

    if (scope === 'instance') {
      item = makeInstanceMemberData(name, parentPid, type);
    } else {
      item = makeStaticMemberData(name, parentPid, type);
    }
  }

  return item;
}

module.exports = {
  makeNavData,
  makeSubNavData,
  makeMemberItem
};
