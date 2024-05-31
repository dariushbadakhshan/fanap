import { Subject } from 'rxjs';

type EventBusModel = {
  type?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};

const eventBus = new Subject<EventBusModel>();

export default eventBus;
