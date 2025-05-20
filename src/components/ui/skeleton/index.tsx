const SkeletonLoader = ({ count = 2 }: { count?: number }) => {
	return (
		<div className='skeleton-container'>
			{Array.from({ length: count }).map((_, i) => (
				<div className='skeleton-item' key={i}>
					<div className='skeleton-avatar shimmer'></div>
					<div className='skeleton-lines'>
						<div className='skeleton-line short shimmer'></div>
						<div className='skeleton-line medium shimmer'></div>
					</div>
				</div>
			))}
		</div>
	);
};

export default SkeletonLoader;
