import './TextField.css'

export default function TextField({label, value, setValue}: {label: string, value: string, setValue: (value: string) => void}) {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
    }
  
    return (
      <>
        <label className="Label">{label}: </label>
        <input className="Input" type="text" name="firstName" value={value} onChange={onChange}/>
        <br/><br/>
      </>
    )
  }
