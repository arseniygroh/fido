export default function Header({onOpenModal}: {onOpenModal: () => void}) {
    return (
        <header style={{ backgroundColor: '#282c34', padding: '20px', color: 'white', textAlign: 'center' }}>
            <h1>Додаток для фанатів цитат</h1>
            <button onClick={onOpenModal} type="button">Створити нову цитату</button>
        </header>
    );
}