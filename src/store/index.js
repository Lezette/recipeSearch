import { persistStore } from 'redux-persist';
import rootSaga from './rootSaga';
import configureStore from './configStore';

const store = configureStore({});
const persistor = persistStore(store);
store.runSaga(rootSaga);

export default { persistor, store };
