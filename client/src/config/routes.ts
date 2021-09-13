//TODO: This is a little pointless as of now
// but I will leave it as a clear place to add routes in the future
import { AppointmentListView } from "../views/AppointmentListView";

const routes = [
  {
    path: "/",
    component: AppointmentListView,
    isPrivate: false,
  },
];

export default routes;
