import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Employee, TreeNode } from '../types';
import EmployeeCard from './EmployeeCard';

import { useOrgChartContext } from '@context/OrgChartContext';
import { cx } from '@utils/cx';

const EMPLOYEE_CARD = 'employee-card';

const getManagerChain = (
	employees: Employee[],
	employeeId: string
): string[] => {
	const chain: string[] = [];
	let currentId = employeeId;
	while (currentId) {
		const employee = employees.find((e) => e.id === currentId);
		if (!employee || !employee.managerId) break;
		chain.push(employee.managerId);
		if (chain.includes(employee.id)) break;
		currentId = employee.managerId;
	}
	return chain;
};

const DraggableEmployeeCard = ({ node }: { node: TreeNode }) => {
	const ref = useRef<HTMLDivElement>(null);
	const { employees, isFiltered, setIsDnDDragging, onDrop } =
		useOrgChartContext();

	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: EMPLOYEE_CARD,
			item: () => {
				setIsDnDDragging(true);
				return { id: node.employee.id };
			},
			canDrag: () => !isFiltered,
			collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
			end: () => setIsDnDDragging(false),
		}),
		[node.employee.id, isFiltered]
	);

	const [{ isOver, canDrop }, drop] = useDrop(
		() => ({
			accept: EMPLOYEE_CARD,
			drop: (item: { id: string }) => onDrop(item.id, node.employee.id),
			canDrop: (item: { id: string }) => {
				if (item.id === node.employee.id) return false;
				const draggedEmployee = employees.find((e) => e.id === item.id);
				if (draggedEmployee?.managerId === node.employee.id) return false;
				const managerChain = getManagerChain(employees, node.employee.id);
				return !managerChain.includes(item.id);
			},
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
				canDrop: !!monitor.canDrop(),
			}),
		}),
		[node.employee.id, employees]
	);

	drag(drop(ref));

	return (
		<div
			ref={ref}
			className={cx(
				'employee-draggable',
				isDragging && 'employee-dragging',
				isOver && canDrop && 'employee-drop-allowed',
				isOver && !canDrop && 'employee-drop-denied'
			)}>
			<EmployeeCard employee={node.employee} />
		</div>
	);
};

export default DraggableEmployeeCard;
