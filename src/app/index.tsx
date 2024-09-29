import React from 'react';
import { RoutesView } from './routes';
import { withProviders } from './providers';
import 'shared/styles/index.scss';
import { cn } from 'shared/helpers/cn';

import { useUnit } from 'effector-react';
import { appModel } from 'shared/model/app-model';
const App = () => {
    const { theme } = useUnit(appModel);

    return (
        <div className={cn(theme, 'app')}>
            <RoutesView />
        </div>
    );
};

export default withProviders(App);
