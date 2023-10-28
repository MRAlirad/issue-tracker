import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import { IssueStatusBadge, Link } from '@/app/components';
import NextLink from 'next/link';
import IssueActions from './IssueActions';
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';

interface Props {
	searchParams: {
		status: Status,
		orderBy: keyof Issue
	};
}

interface Column {
	label: string;
	value: keyof Issue;
	className?: string;
}

const IssuesPage = async ({ searchParams }: Props) => {
	const columns: Column[] = [
		{ label: 'Issue', value: 'title' },
		{ label: 'Status', value: 'status', className: 'hidden sm:table-cell' },
		{ label: 'Created', value: 'createAt', className: 'hidden sm:table-cell' },
	];
	const statuses = Object.values(Status);
	const status = statuses.includes(searchParams.status) ? searchParams.status : undefined;
	const orderBy = columns.map(column => column.value).includes(searchParams.orderBy) ? {[searchParams.orderBy] : 'asc'} : undefined;

	const issues = await prisma.issue.findMany({
		where: { status },
		orderBy,
	});
	return (
		<div>
			<IssueActions />

			<Table.Root variant="surface">
				<Table.Header>
					<Table.Row>
						{columns.map((column) => (
							<Table.ColumnHeaderCell
								className={column.className}
								key={column.value}
							>
								<NextLink
									href={{
										query: { ...searchParams, orderBy: column.value },
									}}
								>
									{column.label}
								</NextLink>
								{column.value === searchParams.orderBy && <ArrowUpIcon className='inline' />}
							</Table.ColumnHeaderCell>
						))}
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{issues.map((issue) => (
						<Table.Row key={issue.id}>
							<Table.Cell>
								<Link href={`/issues/${issue.id}`}>{issue.title}</Link>
								<div className="block sm:hidden">
									<IssueStatusBadge status={issue.status} />
								</div>
							</Table.Cell>
							<Table.Cell className="hidden sm:table-cell">
								<IssueStatusBadge status={issue.status} />
							</Table.Cell>
							<Table.Cell className="hidden sm:table-cell">{issue.createAt.toDateString()}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</div>
	);
};

export const dynamic = 'force-dynamic';

export default IssuesPage;
