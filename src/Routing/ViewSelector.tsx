import { Route, Routes } from 'react-router-dom';
import { Home } from '../View';

const ViewSelector = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />}></Route>
			<Route path="/:step" element={<Home />}></Route>
		</Routes>
	);
};

export default ViewSelector;
