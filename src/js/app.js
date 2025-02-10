import { getEvents } from './api/get_events';

const app = async () => {
  const data = await getEvents({});
  console.log(data);
};
app();
console.log('Hello world');
