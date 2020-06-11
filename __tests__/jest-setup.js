import { configure, shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import graphql from 'graphql-mock';

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;

global.graphql = graphql;

global.___loader = {
  enqueue: jest.fn()
};
