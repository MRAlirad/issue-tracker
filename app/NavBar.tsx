'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import classNames from 'classnames';

const NavBar = () => {
	const currentPath = usePathname();
	const links = [
		{ label: 'Dashboard', href: '/' },
		{ label: 'Issues', href: '/issues/list' },
	];

	return (
		<nav className="flex gap-6 border-b mb-5 px-5 h-14 items-center">
			<Link href="/">
				<AiFillBug />
			</Link>
			<ul className="flex gap-6">
				{links.map((link) => (
					<Link
						key={link.label}
						href={link.href}
						className={classNames({
							'text-zinc-900': link.href === currentPath,
							'text-zinc-500': link.href !== currentPath,
							'hover:text-zinc-800 transition-colors': true,
						})}
					>
						{link.label}
					</Link>
				))}
			</ul>
		</nav>
	);
};

export default NavBar;
