import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';

import store from './store/store.jsx';

import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
)
