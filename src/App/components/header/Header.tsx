import './Header.css'

export default function Header({title}: {title: string} ) {
    return (
        <h1 className='Header'>{title}</h1>
    );
}
