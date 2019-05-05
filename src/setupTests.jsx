import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// Configure enzyme adapter for rendering, needs to follow react version (see
// import in the header).
configure({ adapter: new Adapter() });
