import prisma from '@/prisma/client';
import { Flex, Grid } from '@radix-ui/themes';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';
import IssueChart from './IssueChart';
import { Metadata } from 'next';

export default async function Home() {
	let open = await prisma.issue.count({ where: { status: 'OPEN' } });
	let inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } });
	let closed = await prisma.issue.count({ where: { status: 'CLOSED' } });
	return (
		<Grid
			columns={{ initial: '1', md: '2' }}
			gap="5"
		>
			<Flex
				direction="column"
				gap="5"
			>
				<IssueSummary
					open={open}
					inProgress={inProgress}
					closed={closed}
				/>
				<IssueChart
					open={open}
					inProgress={inProgress}
					closed={closed}
				/>
			</Flex>
			<LatestIssues />
		</Grid>
	);
}

export const metadata: Metadata = {
	title: 'Issue Tracker - Dashboard',
	description: 'View a summary of project issues',
};
