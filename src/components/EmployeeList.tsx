'use client';

import { Search, Filter } from 'lucide-react';
import SkeletonLoader from './ui/skeleton';
import type { Employee } from '../types';

interface EmployeeListProps {
	employees: Employee[];
	teams: string[];
	selectedTeam: string;
	searchQuery: string;
	onTeamChange: (team: string) => void;
	onSearchChange: (query: string) => void;
	isLoading: boolean;
}

const EmployeeList = ({
	employees,
	teams,
	selectedTeam,
	searchQuery,
	onTeamChange,
	onSearchChange,
	isLoading,
}: EmployeeListProps) => {
	return (
		<>
			<div className='employee-header'>
				<h2 className='employee-title'>Employees</h2>

				<div className='search-wrapper'>
					<div className='search-icon-placeholder'>
						<Search className='icon-sm icon-gray-light' />
					</div>
					<input
						type='text'
						className='employee-search-input'
						placeholder='Search employees...'
						value={searchQuery}
						onChange={(e) => onSearchChange(e.target.value)}
					/>
				</div>

				<div className='filter-label'>
					<Filter className='icon-sm icon-gray' />
					<span>Filter by team:</span>
				</div>

				<select
					className='team-dropdown'
					value={selectedTeam}
					onChange={(e) => onTeamChange(e.target.value)}>
					{teams.map((team) => (
						<option key={team} value={team}>
							{team}
						</option>
					))}
				</select>
			</div>

			<div className='employee-list'>
				{isLoading ? (
					<div className='skeleton-wrapper'>
						<SkeletonLoader count={7} />
					</div>
				) : employees.length === 0 ? (
					<div className='no-employees'>
						No employees match your search criteria
					</div>
				) : (
					<ul className='employee-ul'>
						{employees.map((employee) => (
							<li key={employee.id} className='employee-list-item'>
								<div className='employee-item'>
									<div className='employee-avatar'>
										<span>
											{employee.name
												.split(' ')
												.map((n) => n[0])
												.join('')}
										</span>
									</div>
									<div className='employee-info'>
										<p className='employee-name'>{employee.name}</p>
										<p className='employee-role'>{employee.designation}</p>
										<div className='employee-team-badge'>{employee.team}</div>
									</div>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	);
};

export default EmployeeList;
