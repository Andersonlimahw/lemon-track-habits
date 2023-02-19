import { Check } from "phosphor-react"

export const NewHabitForm = () => {

    return (
        <form className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual seu comprometimento?
            </label>
            <input
                type="text"
                id="title"
                placeholder="ex: meditar, dormir bem, atividades físicas, etc..."
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
                autoFocus
            />

            <label
                htmlFor="title"
                className="font-semibold leading-tight"
            >
                Qual a recorrência?
            </label>  
            {/* Lista de checkbox           */}

            <button 
                type="submit"
                className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600"
            >
                <Check size={20} weight="bold" />
                Confirmar
            </button>
        </form>
    )
}