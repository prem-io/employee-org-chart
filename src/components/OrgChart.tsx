import { useState, useRef, useEffect } from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AlertCircle, Minus, Plus } from 'lucide-react';
import { OrgChartContext } from '@context/OrgChartContext';
import OrgChartNode from './OrgChartNode';
import type { Employee, TreeNode } from '../types';

interface OrgChartProps {
	employees: Employee[];
	filteredEmployees: Employee[];
	onUpdateManager: (employeeId: string, newManagerId: string) => Promise<void>;
	selectedTeam: string;
}

const buildOrgTree = (
	employees: Employee[],
	rootId: string | null = null
): TreeNode[] => {
	return employees
		.filter((employee) => employee.managerId === rootId)
		.map((employee) => ({
			employee,
			children: buildOrgTree(employees, employee.id),
		}));
};

const OrgChart = ({
	employees,
	filteredEmployees,
	onUpdateManager,
	selectedTeam,
}: OrgChartProps) => {
	const [error, setError] = useState<string | null>(null);
	const [zoomLevel, setZoomLevel] = useState(1);
	const [pan, setPan] = useState({ x: 0, y: 0 });
	const [isDnDDragging, setIsDnDDragging] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);
	const isPanning = useRef(false);
	const start = useRef({ x: 0, y: 0 });

	// Clear error after 5 seconds
	useEffect(() => {
		if (error) {
			const timer = setTimeout(() => setError(null), 5000);
			return () => clearTimeout(timer);
		}
	}, [error]);

	const handleDrop = async (draggedId: string, droppedId: string) => {
		try {
			await onUpdateManager(draggedId, droppedId);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to update manager');
		}
	};

	const handleMouseDown = (e: React.MouseEvent) => {
		if (isDnDDragging) return; // don’t pan if DnD is active
		isPanning.current = true;
		start.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
	};

	const handleMouseMove = (e: MouseEvent) => {
		if (!isPanning.current) return;
		setPan({ x: e.clientX - start.current.x, y: e.clientY - start.current.y });
	};

	const handleMouseUp = () => {
		isPanning.current = false;
	};

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		el.addEventListener('mousemove', handleMouseMove);
		el.addEventListener('mouseup', handleMouseUp);
		el.addEventListener('mouseleave', handleMouseUp);

		return () => {
			el.removeEventListener('mousemove', handleMouseMove);
			el.removeEventListener('mouseup', handleMouseUp);
			el.removeEventListener('mouseleave', handleMouseUp);
		};
	}, []);

	// Determine which employees to display in the chart
	const displayEmployees =
		selectedTeam === 'All' ? employees : filteredEmployees;

	// Build the org tree
	const orgTree = buildOrgTree(displayEmployees);

	// Check if we're in filtered mode
	const isFiltered = selectedTeam !== 'All';

	return (
		<OrgChartContext.Provider
			value={{ employees: displayEmployees, isFiltered, onDrop: handleDrop, setIsDnDDragging }}>
			<DndProvider backend={HTML5Backend}>
				<div className='org-wrapper'>
					<div className='org-toolbar'>
						<h2 className='org-title'>
							Organization Chart{' '}
							{selectedTeam !== 'All' && `- ${selectedTeam} Team`}
						</h2>
						<div className='zoom-controls'>
							<button
								onClick={() =>
									setZoomLevel((prev) => Math.max(0.5, prev - 0.1))
								}
								className='zoom-button'>
								<Minus className='icon' />
							</button>
							<span className='zoom-percent'>
								{Math.round(zoomLevel * 100)}%
							</span>
							<button
								onClick={() => setZoomLevel((prev) => Math.min(2, prev + 0.1))}
								className='zoom-button'>
								<Plus className='icon' />
							</button>
						</div>
					</div>

					{error && (
						<div className='alert alert-error'>
							<AlertCircle className='icon' />
							<strong>Error:</strong> {error}
						</div>
					)}

					{isFiltered && (
						<div className='alert alert-info'>
							<AlertCircle className='icon' />
							<div>
								<strong>Filtered View:</strong> Drag and drop is disabled when
								viewing a filtered team.
							</div>
						</div>
					)}

					<div
						className='org-scroll'
						ref={containerRef}
						onMouseDown={handleMouseDown}>
						<div
							className='org-chart'
							style={{
								transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})`,
								transformOrigin: 'top center',
								cursor: isFiltered ? 'default' : 'grab',
							}}>
							{orgTree.length > 0 ? (
								orgTree.map((node) => (
									<OrgChartNode key={node.employee.id} node={node} />
								))
							) : (
								<div className='org-empty'>No employees to display</div>
							)}
						</div>
					</div>
				</div>
			</DndProvider>
		</OrgChartContext.Provider>
	);
};

export default OrgChart;
