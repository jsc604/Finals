import '../styles/LoginButton.scss'


export default function Button( {handleClick, children} ) {

  return (
  <button className="login-button" onClick={ handleClick}> { children } </button>
  )
}