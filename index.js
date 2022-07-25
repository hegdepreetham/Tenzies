

function Head(){

    return(
         <div className="text-center"> 
            <h1 className="title">Tenzies</h1>
            <h6 className="title-info">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h6>     
         </div>
    )
}
function Die(props){  
   const val=props.value
   let ele=""
    switch (val) {
        case 1:
            ele=
                <div class="dice first-face">
                <span class="dot">
                </span>
                </div>
                 break;
        case 2:
        ele=
        <div class="dice second-face">
        <span class="dot">
        </span>
        <span class="dot">
        </span>
      </div>
                break;    
 
        case 3:
            ele=
            <div class="dice third-face">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
                    break;
        case 4:
        ele=
        <div class="fourth-face dice">
        <div class="column">
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
        <div class="column">
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
      
                break;
        case 5:
            ele=
            <div class="fifth-face dice">
  
            <div class="column">
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
            
            <div class="column">
              <span class="dot"></span>
            </div>
            
            <div class="column">
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          
          </div>
                    break; 
        case 6:
            ele=
            <div class="sixth-face dice">
            <div class="column">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
            <div class="column">
              <span class="dot"></span>
              <span class="dot"></span>
                  <span class="dot"></span>
            </div>
          
          </div>
                    break;
    }
    console.log(props.isHeld);
   const styles={
    backgroundColor: props.held ? "#1bee25" : "white"
   }
    return(        
     <div style={styles} onClick={()=>props.toggle()}>{ele}</div>                                 
    )
}
let rolls=0;

function Main(){
    let prevRec=localStorage.getItem("record") || ""
    const[diceArray,setDiceArray]=React.useState(allNewDice())
    const[Tenzies,setTenzies]=React.useState(false)


    
    React.useEffect(function(){
        let value=diceArray[0].value
        if(diceArray.every(die=>die.isHeld) && diceArray.every(die=>die.value===value)){
            setTenzies(true) 
            console.log("won");
        }

        // let i=0;
        // let value=diceArray[0].value
        // diceArray.map(item=>{
        //         if(item.value===value && item.isHeld===true)
        //         i++          
        // })
        // if(i===10){
        //     setTenzies(true) 
        //     console.log("won");
        // }
        
    },diceArray)

function allNewDice(){
    let arr=[] 
    for(let i=0;i<10;i++){
      arr.push(generate())
    }
    return arr;
}
function generate(){
     return {value:Math.floor((Math.random()*6)+1),isHeld:false ,  id:`#${Math.floor(Math.random()*10000)}`}
}

function roll(){
    rolls++
    document.querySelector(".Rolls").innerHTML=`Rolls: <span>${rolls}</span>`
    setDiceArray(prev=>{
      return  prev.map(item=>{
            return  item.isHeld?item:generate()
        })
    })
}
function holdDice(id){
    setDiceArray(prev=>{
       return prev.map(item=>{
            return id===item.id?{...item,isHeld:!item.isHeld}:item 
        })

    })

    // const arr=[]
    // diceArray.map(item=>{
    //         if(id===item.id){
    //             arr.push({...item,isHeld:!item.isHeld})
    //         }
    //         else{
    //             arr.push(item)
    //         }
    // })
    // setDiceArray(arr)
}
function newRoll(){
        if(prevRec=="" || prevRec>rolls)
        localStorage.setItem("record",rolls)
        rolls=0
        setDiceArray(allNewDice())
        setTenzies(false)
}
const element=diceArray.map(item=><Die value={item.value} held={item.isHeld} toggle={()=>holdDice(item.id)}/>)
    return (
        <div className="container">
            <div className="row">
                    <Head/>  
            </div>

        <div className="dices">
            {element}
        </div>
        <div className="row text-center mt-5">
            <p className="Rolls"> </p>
            <p>Previous Record : {prevRec}</p>
             {(Tenzies)?<button type="button" onClick={newRoll} className="btn btn-sucess btn-lg">New Game</button>:
                <button type="button" onClick={roll} className="btn btn-priamry btn-lg">Roll</button> }

          </div>
 
        </div>
     
    )
}
ReactDOM.render(<Main/>,document.getElementById("root"))