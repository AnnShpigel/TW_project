// // Импортируем необходимые модули из библиотеки React
// // createContext позволяет создать контекст данных
// // useState позволяет создать и управлять состоянием данных
// import React, { createContext, useState } from 'react';

// // Создайте контекст
// export const DataContext = createContext();

// // Создайте провайдер контекста
// export const DataProvider = ({ children }) => {
//     // Используем хук состояния для создания и управления состоянием данных
//     const [data, setData] = useState([]);

//     // Возвращаем провайдер контекста, который оборачивает дочерние элементы
//     // и предоставляет им доступ к данным и функции для их обновления
//     return (
//         <DataContext.Provider value={[data, setData]}>
//         {children}
//         </DataContext.Provider>
//     );
// };
