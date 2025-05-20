// File: src/App.tsx
import React, { useEffect, useState } from 'react';
import EmployeeList from '@components/EmployeeList';
import OrgChart from '@components/OrgChart';

import { fetchEmployees, updateEmployeeManager } from '@api/server';
import type { Employee } from './types';

const App: React.FC = () => {
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
	const [selectedTeam, setSelectedTeam] = useState<string>('All');
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [isLoading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const getEmployees = async () => {
			try {
				const data = await fetchEmployees();
				setEmployees(data);
				setFilteredEmployees(data);
				setLoading(false);
			} catch (error) {
				// TODO: Add error toast
				console.error('Failed to load employees:', error);
			} finally {
				setLoading(false);
			}
		};

		getEmployees();
	}, []);

	useEffect(() => {
		let result = [...employees];

		// Apply team filter
		if (selectedTeam !== 'All') {
			result = result.filter((employee) => employee.team === selectedTeam);
		}

		// Apply search filter
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			result = result.filter(
				(employee) =>
					employee.name.toLowerCase().includes(query) ||
					employee.designation.toLowerCase().includes(query) ||
					employee.team.toLowerCase().includes(query)
			);
		}

		setFilteredEmployees(result);
	}, [employees, selectedTeam, searchQuery]);

	const handleUpdateManager = async (
		employeeId: string,
		newManagerId: string
	) => {
		try {
			await updateEmployeeManager(employeeId, newManagerId);

			// Update local state
			setEmployees((prevEmployees) =>
				prevEmployees.map((emp) =>
					emp.id === employeeId ? { ...emp, managerId: newManagerId } : emp
				)
			);

			// TODO: Add success toast
		} catch (error) {
			// TODO: Add error toast
			console.error('Failed to update employee manager:', error);
		}
	};

	const teams = ['All', ...new Set(employees.map((e) => e.team))];

	return (
		<div className='container'>
			<div className='sidebar'>
				<EmployeeList
					employees={filteredEmployees}
					teams={teams}
					selectedTeam={selectedTeam}
					searchQuery={searchQuery}
					onTeamChange={setSelectedTeam}
					onSearchChange={setSearchQuery}
					isLoading={isLoading}
				/>
			</div>
			<div className='main'>
				<OrgChart
					employees={employees}
					filteredEmployees={filteredEmployees}
					onUpdateManager={handleUpdateManager}
					selectedTeam={selectedTeam}
				/>
			</div>
		</div>
	);
};

export default App;
