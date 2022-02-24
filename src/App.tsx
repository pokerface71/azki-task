import { BrowserRouter as Router } from 'react-router-dom';
import ViewSelector from './Routing/ViewSelector';
import { Provider } from 'react-redux';
import { store } from './store';
function App() {
	return (
		<Provider store={store}>
			<Router>
				<ViewSelector />
			</Router>
		</Provider>
	);
}

export default App;
