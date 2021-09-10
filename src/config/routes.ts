import { CreateAppointmentView } from "../views/CreateAppointmentView";
import { AdminView } from "../views/AdminView";
import { WelcomeView } from "../views/WelcomeView";

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
  {
    path: "/",
    component: WelcomeView,
    isPrivate: false,
  },
];

export default routes;
