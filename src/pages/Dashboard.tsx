import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Users, GraduationCap, ClipboardList } from 'lucide-react';

export const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: Users,
      label: 'Total Usuarios',
      value: '24',
      color: 'bg-blue-500',
    },
    {
      icon: GraduationCap,
      label: 'Estudiantes',
      value: '156',
      color: 'bg-green-500',
    },
    {
      icon: ClipboardList,
      label: 'Actividades',
      value: '1,204',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          ¡Bienvenido de nuevo, {user?.username}!
        </h2>
        <p className="text-gray-600">
          Esto es lo que está pasando en tu sistema de gestión de FP Dual.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg shadow-sm p-6 flex items-center border border-gray-100 hover:border-gray-200 transition-colors"
          >
            <div
              className={`${stat.color} p-3 rounded-lg text-white mr-4 shadow-sm`}
            >
              <stat.icon size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {stat.label}
              </h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Actividades Recientes
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    Actividad de Estudiante #{i}
                  </p>
                  <p className="text-sm text-gray-500">2 hours ago</p>
                </div>
                <span className="px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Acciones Rápidas
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors">
              <h4 className="font-medium text-gray-800">Añadir Estudiante</h4>
              <p className="text-sm text-gray-500">
                Registrar un nuevo estudiante en el sistema
              </p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
              <h4 className="font-medium text-gray-800">Registrar Actividad</h4>
              <p className="text-sm text-gray-500">
                Registrar una nueva actividad de estudiante
              </p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
              <h4 className="font-medium text-gray-800">Ver Informes</h4>
              <p className="text-sm text-gray-500">
                Acceder a los informes de actividad
              </p>
            </button>
            <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
              <h4 className="font-medium text-gray-800">Gestionar Usuarios</h4>
              <p className="text-sm text-gray-500">
                Añadir o modificar cuentas de usuario
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};