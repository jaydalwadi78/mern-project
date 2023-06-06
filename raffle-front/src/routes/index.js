import React from 'react';
import { Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';
import PageRoutes from './routeLink';

export default function Router({ basename, children, history }) {
	const RouterRender = (routes) => {
		return routes.map((route, i) => {
			if (route.PageChildRoutes) {
				return RouterRender(route.PageChildRoutes);
			} else {
				return <Route
					key={Math.floor(Math.random() * 1000) + i}
					exact={true}
					path={route.path}
					element={
						<route.layout history={history}>
							<route.component />
						</route.layout>
					}
				/>
			}
		})
	}
	return (
		<Routes>
			{RouterRender(PageRoutes)}
		</Routes>
	);
}


