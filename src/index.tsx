import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

axios.defaults.baseURL = process.env.REACT_APP_BACK_URL;

ReactDOM.render(<App />, document.getElementById('root'));
