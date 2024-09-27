import UpdateTourPackage from "../../IshanFrontend/UpdateTourPackage";

const AdminUpdateTour = () => {

  return (
    <div className="min-h-screen flex">
      
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-xl font-bold bg-gray-900">
          Admin Dashboard
        </div>

        <nav className="flex-1 px-2 py-4 space-y-2">

        </nav>

        <div className="p-4">
          <button className="bg-red-600 px-4 py-2 w-full rounded hover:bg-red-500">Logout</button>
        </div>
      </aside>


      <main className="flex-1 bg-gray-100 p-6">
        <header className="bg-white shadow p-4 rounded mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Welcome, Admin!</h2>
        </header>

        <div>
          <UpdateTourPackage />
        </div>


      </main>
    </div>
  );
};

export default AdminUpdateTour;