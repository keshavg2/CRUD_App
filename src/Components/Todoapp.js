import React, { useState } from 'react';
import { Stack } from '@fluentui/react';
import {TextField} from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react';
import './Todo.css';
import Update from './Update';



export default function Todo(){
  const initialForm ={id:null, Title:'', Description:''}
  const [Title,setTitle]=useState('');
  const [Description, setDescription]=useState('');
  const [people, setPeople]=useState([]);
  const [renovate,setRenovate]=useState(true);
  const [currentUser, setcurrentUser]=useState(initialForm);

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(Title && Description){
      const person = {id: new Date().getTime().toString(),Title,Description};
        //console.log(person);
        setPeople((people) => {
          //console.log(...people,person);
          return[...people,person]
        });
    }
    else{
      console.log('Title and description is empty so fill it first');
    }
  }

  function handleRemove(id){
    //console.log(id);
    const newPeople= people.filter((person)=>person.id!==id)
    setPeople(newPeople);
  }

  function handleUpdate(person){
     setRenovate(false);
     setcurrentUser({id:person.id,Title:person.Title,Description:person.Description});
     //console.log(currentUser);
  }
  
  function updateUser(id,updatedUser){
    setRenovate(true);
    setPeople(people.map(user => (user.id === id ? updatedUser : user)))
  }

    return(
      <div >
        {renovate?
          (<div>
           <div className="stack">
            <Stack horizontal>
            <TextField 
            label="Title"  
            value={Title}
            onChange={(e)=>setTitle(e.target.value)}
            />
            </Stack>
            </div>
            <Stack>
            <TextField 
            label="Description..." 
            multiline autoAdjustHeight 
            value={Description}
            onChange={(e)=>setDescription(e.target.value)}
            />
            </Stack>
            <PrimaryButton className="save" onClick={handleSubmit} text="Add" />
            </div>
            ):
            (<Update currentUser={currentUser} renovate={renovate} setRenovate={setRenovate} updateUser={updateUser}/>)
        }  


        {people.map((person)=>{
          const { id,Title,Description }= person;
         return( 
            <div >
              <ul key={id}>
                <li className="Todo">
                    <div className="Todoapp">
                      <div><p>{Title}</p></div>
                      <div><PrimaryButton className="save" onClick={()=>handleUpdate(person)} text="Edit" /></div>
                    </div>
                    <div>
                    <div>{Description}</div>
                    <div><PrimaryButton className="save" onClick={()=>handleRemove(id)} text="Delete" /></div>
                    </div>
                    </li>
              </ul>

              </div>
             ); 
            })}
      </div>
    );
}