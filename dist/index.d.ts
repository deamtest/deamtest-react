import { FC } from 'react';

interface DeamtestProps {
    lang?: string;
    appId: number;
    apiKey: string;
    onVerify: (token: string) => void;
}
declare const Deamtest: FC<DeamtestProps>;

export { Deamtest as default };
