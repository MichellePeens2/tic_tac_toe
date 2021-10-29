import './Form.css'

export default function Form({children}: React.PropsWithChildren<{}>) {
  return (
    <form className="Form">
      {children}
    </form>
  );
}
