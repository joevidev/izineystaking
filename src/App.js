import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Provider } from 'react-redux';
import store from './store';

import Home from './containers/pages/home';
import Documents from './containers/pages/Documents';
import Governance from './containers/pages/Governance';
import Staking from './containers/pages/Staking';
import Error404 from './containers/errors/Error404';


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Error Display */}
          <Route path="*" element={<Error404 />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/documents" element={<Documents />} />
          <Route exact path="/governance" element={<Governance />} />
          <Route exact path="/staking" element={<Staking />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
