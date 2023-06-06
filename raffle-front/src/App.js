import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from "history";
import Routes from './routes';

function App() {
    const history = createBrowserHistory();
    return (
        <>
            <Suspense fallback={<span className="pageloader">..</span>}>
                <Router history={history}>
                    <Routes />
                </Router>
            </Suspense>
        </>
    );
}

export default App;