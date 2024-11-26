const mockUsers = [
    { id: 1, name: "Anupsinh Chauhan", email: "anup@email.com", status: "Active", role: "Admin"},
    { id: 2, name: "Pruthviraj Chauhan", email: "pruthvi@email.com", status: "Active", role: "User" },
    { id: 3, name: "Krishna Kachave", email: "krish@email.com", status: "Inactive", role:"User" }

  ];
  const mockRoles = [
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "User", permissions: ["Read"] },
  ];

  const mockPermissions = [
    { id: 1, name: "Read" },
    { id: 2, name: "Write" },
    { id: 3, name: "Delete" },
    { id: 4, name: "Execute" },
  ];
  
  const api = {
    getUsers: () => Promise.resolve(mockUsers),
    addUser: (user) => Promise.resolve({ id: Date.now(), ...user }),
    updateUser: (user) => Promise.resolve(user),
    deleteUser: (id) => Promise.resolve(),
  
    getRoles: () => Promise.resolve(mockRoles),
    addRole: (role) => Promise.resolve({ id: Date.now(), ...role }),
    updateRole: (role) => Promise.resolve(role),
    deleteRole:(id) => Promise.resolve(),

    // Permission APIs
  getPermissions: () => Promise.resolve(mockPermissions),
  assignPermissionsToRole: (roleId, permissions) => {
    const role = mockRoles.find((r) => r.id === roleId);
    if (role) {
      role.permissions = permissions;
      return Promise.resolve(role);
    }
    return Promise.reject(new Error("Role not found"));
  },
  };



  
  export default api;