import { useState } from 'react';
import logoImage from './images/logo.svg';
import { Plus } from 'phosphor-react';
import DialogHabit from '../Radix/Dialog';

export const Header = (): any => {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
                <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
                    <img src={logoImage} alt="habits" />
                    <DialogHabit />
                </div>
            </div>
        </div>
    )
}