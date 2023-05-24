import { Outlet } from "react-router-dom";

import MainLayout from "layouts/MainLayout";

function App() {
  return (
    <div className="min-h-screen">
      <MainLayout>
        <Outlet />
      </MainLayout>
    </div>
  );
}

export default App;
