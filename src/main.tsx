

import ReactDOM from 'react-dom/client';
import AppRouter from '@routes/AppRouter.js';
//bootsrap styles
import 'bootstrap/dist/css/bootstrap.min.css';
import "@styles/global.css"
 //axios
 import"./services/API/axios-global.js"

//store
import { store } from './store';
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <AppRouter/>
  </Provider>
)
