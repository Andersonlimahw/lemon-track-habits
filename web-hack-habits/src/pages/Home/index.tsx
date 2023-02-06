import { Header } from '../../commons/components/Header';
import { SummaryTable } from '../../commons/components/SummaryTable';
import logoImage from './images/logo.svg';
import { Plus } from 'phosphor-react';

export const Home = (): any => {

    return (
        <>
            <Header />
            <SummaryTable />
        </>
    )
}