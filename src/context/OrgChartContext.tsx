import { createContext, useContext } from 'react';
import type { Employee } from '../types';

interface OrgChartContextProps {
  employees: Employee[];
  isFiltered: boolean;
  onDrop: (draggedId: string, droppedId: string) => void;
  setIsDnDDragging: (dragging: boolean) => void;
}

export const OrgChartContext = createContext<OrgChartContextProps | null>(null);

export const useOrgChartContext = () => {
  const context = useContext(OrgChartContext);
  if (!context) {
    throw new Error('useOrgChartContext must be used within a OrgChartContextProvider');
  }
  return context;
};