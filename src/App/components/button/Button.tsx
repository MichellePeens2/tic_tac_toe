import './Button.css'

export default function Button({type, children, onClick}: React.PropsWithChildren<{type: 'primary' | 'destructive' | 'secondary', onClick?: () => void}>) {
    let buttonClass: string 
    switch (type) {
      case 'primary':
        buttonClass = 'PrimaryButton';
      break;
      case 'destructive':
        buttonClass = 'DestructiveButton';
      break;
      case 'secondary':
        buttonClass = 'SecondaryButton';
      break;
    }
  
    return (
      <div className={`Button ${buttonClass}`} onClick={onClick}>{children}</div>
    );
  }
