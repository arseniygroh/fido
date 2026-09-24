export default function Header({onOpenModal}: {onOpenModal: () => void}) {
    return (
        <header className="bg-slate-800 text-white px-6 py-4 shadow-md flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold tracking-wide">
                Додаток для фанатів цитат
            </h1>
            <button 
                onClick={onOpenModal} 
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 shadow-sm"
            >
                Створити нову цитату
            </button>
        </header>
    );
}