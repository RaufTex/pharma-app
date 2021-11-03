import Header from './components/Header';
import { ListUsersProvider } from './context/UserContext';
import Routes from './routes/routes';

function App() {
  return (
    <div>
      <Header />
      <ListUsersProvider>
        <Routes />
      </ListUsersProvider>
    </div>
  );
}

export default App;
