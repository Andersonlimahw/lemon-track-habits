import { Header } from '../../commons/components/Header';
import { SummaryTable } from '../../commons/components/SummaryTable';

export const Home = (): any => {

    return (
        <div className='w-screen h-screen flex flex-col justify-center items-center gap-2'>
            <Header />
            <SummaryTable />
        </div>
    )
}