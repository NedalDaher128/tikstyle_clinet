import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/CSS/index.css'
import 'semantic-ui-css/semantic.min.css'
import { Provider } from 'react-redux'
import AccountStore from  './redux/store.jsx'
import GlobalStyle from './assets/CSS/GlobalStyles';

// الملف الرئيسي الذي يشغل الموقع
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Provider store={AccountStore}>
      <GlobalStyle />
      <App />
    </Provider>
  );
} else {
  console.error("Element with id 'root' not found");
}
