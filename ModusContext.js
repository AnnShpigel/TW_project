import React, { createContext, useState, useContext } from 'react';

// Контекст записывает модусы и их данные в рамках сессии в оболочке(!)
// и строит структуру дерева моусов для вывода
const ModusContext = createContext();

export const useModusContext = () => useContext(ModusContext);

export const ModusProvider = ({ children }) => {
  const [moduses, setModuses] = useState([]);

  const addModus = (modus) => {
    setModuses(prevModuses => [...prevModuses, { ...modus, goals: [] }]);
  };

  const deleteModus = (modusId) => {
    const removeModusRecursive = (moduses, modusId) => {
      return moduses.filter(modus => modus.id !== modusId);
    };
    setModuses(prevModuses => removeModusRecursive(prevModuses, modusId));
  };

  const updateGoalsForModus = (modusId, goals) => {
    setModuses(prevModuses =>
      prevModuses.map(modus =>
        modus.id === modusId ? { ...modus, goals: goals.map(goal => ({ name: goal, activities: [] })) } : modus
      )
    );
  };

  const addActivityToGoal = (modusId, goalIndex, activity) => {
    setModuses(prevModuses =>
      prevModuses.map(modus =>
        modus.id === modusId ? { 
          ...modus, 
          goals: modus.goals.map((goal, index) => 
            index === goalIndex ? { ...goal, activities: [...goal.activities, activity] } : goal
          )
        } : modus
      )
    );
  };

  const buildModusTree = () => {
    const modusMap = new Map(moduses.map(modus => [modus.id, {...modus, children: []}]));
    const tree = [];
    moduses.forEach(modus => {
      if (modus.parentId === null) {
        tree.push(modusMap.get(modus.id));
      } else {
        const parent = modusMap.get(modus.parentId);
        if (parent) {
          parent.children.push(modusMap.get(modus.id));
        }
      }
    });
    return tree;
  };

  return (
    <ModusContext.Provider value={{ moduses, addModus, deleteModus, updateGoalsForModus, buildModusTree, addActivityToGoal }}>
      {children}
    </ModusContext.Provider>
  );
};
