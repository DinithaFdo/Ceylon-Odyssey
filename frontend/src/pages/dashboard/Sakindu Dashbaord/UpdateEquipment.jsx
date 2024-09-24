import UpdateEquipment from '../../sakindu/UpdateEquipment';

const AdminUpdateEquipment = () => {

    return (
      <div className="min-h-screen flex">
        
        <aside className="w-64 bg-gray-800 text-white flex flex-col">
          <div className="p-4 text-xl font-bold bg-gray-900">
            Admin Dashboard
          </div>

          <nav className="flex-1 px-2 py-4 space-y-2">
            <a href="/Equipment-dashboard" className="block px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Manage Equipment</a>
            <a href="/Equipment-dashboard/AddEquipment" className="block px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Add Equipment</a>

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
                <UpdateEquipment/>
            </div>
            
          
        </main>
      </div>
    );
  };
  
  export default AdminUpdateEquipment;