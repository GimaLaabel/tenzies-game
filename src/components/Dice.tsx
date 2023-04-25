
interface DiceProps {
    value: number;
    key: string;
    isHeld: boolean;
    toggle: () => void
  }

const Dice = (props: DiceProps) => {
    const heldStyles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div className='dice' 
             onClick={props.toggle}
             style={heldStyles}>
            <h2>{props.value}</h2>
        </div>
    )
}

export default Dice;