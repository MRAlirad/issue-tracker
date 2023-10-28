import prisma from "@/prisma/client";
import IssueSummery from "./IssueSummery";
import LatestIssues from "./LatestIssues";

export default async function Home() {
	let open = await prisma.issue.count({where: {status: 'OPEN'}})
	let inProgress = await prisma.issue.count({where: {status: 'IN_PROGRESS'}})
	let closed = await prisma.issue.count({where: {status: 'CLOSED'}})
	return (
		<IssueSummery
			open={open}
			inProgress={inProgress}
			closed={closed}
		/>
		// <LatestIssues />
	);
}
