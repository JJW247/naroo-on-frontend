import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BACK_URL;

ReactDOM.render(<App />, document.getElementById('root'));
