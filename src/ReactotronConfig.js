/* eslint-disable import/no-extraneous-dependencies */
import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

const reactotron = Reactotron
    .configure({ name: 'Recipe Finder' })
    .use(sagaPlugin())
    .use(reactotronRedux())
    .connect();

export default reactotron;
