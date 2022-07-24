/// <reference types="react" />
interface DeamtestProps {
    lang?: 'en-US';
    appId: number;
    apiKey: string;
    onVerify: (token: string) => void;
}
declare const Deamtest: ({ lang, appId, apiKey, onVerify }: DeamtestProps) => JSX.Element;

export { Deamtest as default };
