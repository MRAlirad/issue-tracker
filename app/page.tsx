import prisma from '@/prisma/client';
import IssueSummery from './IssueSummery';
import LatestIssues from './LatestIssues';
import IssueChart from './IssueChart';

export default async function Home() {
	let open = await prisma.issue.count({ where: { status: 'OPEN' } });
	let inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } });
	let closed = await prisma.issue.count({ where: { status: 'CLOSED' } });
	return (
		<IssueChart
			open={open}
			inProgress={inProgress}
			closed={closed}
		/>
		// <LatestIssues />
	);
}
