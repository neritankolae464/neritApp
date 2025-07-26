 import { NOTIFICATIONS_ROUTE } from '../../../../ui/helpers/constants/routes';
import { Route } from './route';

export default new Route({
  pathname: '/notifications',
  getTitle: () => 'deepLink_theNotificationsPage',
  handler: () => ({ path: NOTIFICATIONS_ROUTE, query: new URLSearchParams() }),
});
