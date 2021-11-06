import * as React from "react";
import Paper from "@material-ui/core/Paper";
import "./style.css";
import {
  Scheduler,
  WeekView,
  Appointments,
} from "@devexpress/dx-react-scheduler-material-ui";

import appointments from "./demo-data/today-appointments";

export default () => (
  <div class="mydiv">
    <Paper>
      <Scheduler class="myAppointments" data={appointments} height={1000}>
        <WeekView startDayHour={9} endDayHour={19} />
        <Appointments />
      </Scheduler>
    </Paper>
  </div>
);
