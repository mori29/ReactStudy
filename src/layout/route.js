import Home from '@/domain';
import Test from '@/domain/Test';
import IdTest from '@/domain/IdTest';
import NoMatch from '@/domain/404';

const routes = [
	{ path: '/', element: <Home /> },
	{ path: '/test', element: <Test /> },
	{ path: '/id-test/:id', element: <IdTest /> },
	{ path: '*', element: <NoMatch /> },
];

export { routes };