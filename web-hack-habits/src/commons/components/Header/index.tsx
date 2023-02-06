import logoImage from './images/logo.svg';
import { Plus } from 'phosphor-react';

export const Header = (): any => {

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
                <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
                    <img src={logoImage} alt="habits" />

                    <button 
                        type="button"
                        className='border border-violet-500 font-semibold rounded-lg px-6 py-4 flex item-center gap-3 hover:border-violet-500'
                    >
                        <Plus
                            size={20}
                            className="text-violet-500" 
                        />
                        Novo hábito
                    </button>
                </div>
            </div>
        </div>
    )
}