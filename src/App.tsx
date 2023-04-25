import React from 'react';
import Dice from './components/Dice.js'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti';

type DialProps = {
  id: string,
  value: number,
  isHeld: boolean
}

export default function App(){
    const [dials, setDials] = React.useState<DialProps[]>(rollDice());
    const [tenzies, setTenzies] = React.useState<boolean>(false);

    React.useEffect(() => {
            const allHeld = dials.every(die => die.isHeld)
            let dieValue = dials.every(die => die.value === dials[0].value)   
            if( allHeld && dieValue){
                setTenzies(true)
                console.log("You won")
                
            }     
    }, [dials])
        
    // Generates an array of 10 numbers between 1 and 6
    function rollDice():DialProps[]{
        let roll:DialProps[] = []
        for(let i=0; i < 10; i++){
            let num = Math.floor(Math.random() * 6 + 1)            
            roll.push({id: nanoid(), value:num, isHeld: false})
        }
        return roll
    }

    const toggleIsHeld = (id: string) =>{
        if(tenzies){
            return
        }else{
            setDials((prevDials)=>{
                return prevDials.map((dial)=>{
                        if(dial.id === id){
                            dial = {...dial, isHeld: !dial.isHeld}
                        }                
                        return dial
                    })
                })
            }        
    }

    function rollNewDice(){
            if(tenzies){
                setDials(rollDice())
                setTenzies(false)
            }
            setDials(prevDial => prevDial.map(
            die => die.isHeld? 
                    die : 
                    {...die, value: Math.floor(Math.random() * 6 + 1)}
            ))        
       
    }

   

    // console.log(dials) 
    const diceElements = dials.map(
                              (die) => <Dice value={die.value}
                                            key={die.id}
                                            isHeld={die.isHeld}
                                            toggle ={()=>toggleIsHeld(die.id)}
                                            />
                              )

    return (
        <main>
            {tenzies && <Confetti width={600} height= {400} />}
            <div className='heading'>
                <h2>Tenzies</h2>
            </div>
            <div className='dice-container'>                
                {diceElements}
            </div>
            <div className='buttons'>
                <button className='btn-roll' onClick={rollNewDice}>{tenzies?"New Game": "Roll dice"}</button>
            </div>
        </main>        
    );
}