import '../styles/HomepageButton.scss'


export default function HomepageButton(props) {

  return <button
  className="homepage-button"
  onClick={props.onClick}>

  {props.children}


</button>;

}
