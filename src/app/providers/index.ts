import compose from 'compose-function';
import { withRouter } from './withRouter/withRouter';

export const withProviders = compose(withRouter);
