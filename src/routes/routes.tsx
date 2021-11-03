import { Switch, Route, BrowserRouter } from 'react-router-dom';

import InfoTable from '../components/InfoTable';
import InfoScreen from '../components/InfoScreen';

const Routes = () => {
  return (
    <BrowserRouter>
      <InfoTable />

      <Switch>
        <Route path='/:id' component={InfoScreen} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
