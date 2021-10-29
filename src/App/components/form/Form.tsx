// Is it okay to use this type without props? 
export default function Form({children}: React.PropsWithChildren<{}>) {
  return (
    <form className="Form">
      {children}
    </form>
  );
}
