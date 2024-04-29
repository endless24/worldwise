import Map from "../component/Map";
import SideBar from "../component/SideBar";
import User from "../component/User";
import styles from "./AppLayout.module.css";
import ProtectedRoute from "./ProtectedRoute";

function AppLayout() {
  return (
    <ProtectedRoute>
      <div className={styles.app}>
        <SideBar />
        <Map />
        <User />
      </div>
    </ProtectedRoute>
  );
}

export default AppLayout;
