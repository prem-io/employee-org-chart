import type { Employee } from '../types';

interface EmployeeCardProps {
	employee: Employee;
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
	return (
		<div className='employee-card'>
			<div className='employee-card-header'>
				<div className='employee-card-header-content'>
					<div className='employee-avatar'>
						<span className='employee-avatar-text'>
							{employee.name
								.split(' ')
								.map((n) => n[0])
								.join('')}
						</span>
					</div>
					<div className='employee-name-block'>
						<h3 className='employee-name'>{employee.name}</h3>
						<p className='employee-designation'>{employee.designation}</p>
					</div>
				</div>
			</div>
			<div className='employee-card-body'>
				<div className='employee-info'>
					<div className='info-row'>
						<span className='info-label'>Team:</span>
						<span className='employee-badge'>{employee.team}</span>
					</div>
					{employee.contactInfo && (
						<div className='info-row'>
							<span className='info-label'>Contact:</span>
							<span>{employee.contactInfo}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default EmployeeCard;
