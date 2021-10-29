import './Error.css'

export default function Error({message}: {message: string}) {
    return (
        <p className="Error">{message}</p>
    )
}
