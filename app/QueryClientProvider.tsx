'use client'

import { QueryClient, QueryClientProvider as RectQueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
	return <RectQueryClientProvider client={queryClient}>{children}</RectQueryClientProvider>;
};

export default QueryClientProvider;
