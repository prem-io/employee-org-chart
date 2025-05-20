import DraggableEmployeeCard from './DraggableEmployeeCard';
import type { TreeNode } from '../types';

const OrgChartNode = ({ node }: { node: TreeNode }) => {
	return (
		<div className='org-node'>
			<DraggableEmployeeCard node={node} />
			{node.children.length > 0 && (
				<div className='org-children'>
					<div className='org-line'></div>
					<div className='org-children-wrapper'>
						{node.children.map((child) => (
							<div key={child.employee.id} className='org-child'>
								<OrgChartNode node={child} />
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default OrgChartNode;
