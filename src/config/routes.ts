import { CreateAppointmentView } from "../views/CreateAppointmentView";
import { AdminView } from "../views/AdminView";

const routes = [
  {
    path: "/create",
    component: CreateAppointmentView,
    isPrivate: false,
  },
  {
    path: "/admin",
    component: AdminView,
    isPrivate: false,
  },
];

export default routes;
