import { useRoutes } from 'react-router-dom';
import logo from '@/resources/images/logo.svg';
import { routes } from './route';
import Navigator from './Navigator';
import './style.scss';

function App() {
	const routeElements = useRoutes(routes);

	return (
		<div className="App">
			<header className="header">
				<img src={logo} className="App-logo" alt="logo" />
				React Study
			</header>

			<div className="content-wrap">
				<div className="nav">
					<Navigator />
				</div>
				<div className="content">{routeElements}</div>
			</div>
		</div>
	);
}

export default App;