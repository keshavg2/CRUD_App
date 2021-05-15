import React, { useState } from 'react';
import { Stack } from '@fluentui/react';
import {TextField} from '@fluentui/react';
import { Dropdown, IDropdownOption, DropdownMenuItemType } from '@fluentui/react';
import {DatePicker} from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react';
import './Todo.css';

const options: IDropdownOption[] = [
  { key: 'Status', text: 'Status', itemType: DropdownMenuItemType.Header },
  { key: 'Todo', text: 'Todo' },
  { key: 'Ongoing', text: 'Ongoing' },
  { key: 'Stalled', text: 'Stalled'},
  { key:'Done', text:'Done'},

];

export default function Todo(){
  const [Title,setTitle]=useState('');
  const [Description, setDescription]=useState('');
  const [Time, setTime]=useState('');
  const [selectedItem,setOption]=useState('');
  const [people, setPeople]=useState([]);

  const handleSubmit = () =>{
    if(Title && Description){
      const person = {id: new Date().getTime().toString(),
        Title,Description,Time,selectedItem};
        console.log(person);
      setPeople((people) => {
        return[...people,person]
      });
    }
    else{
      console.log('Title and description is empty so fill it first');
    }
  }

    return(
      <div >
        <div className="stack">
        <Stack horizontal>
        <TextField 
        label="Title"  
        value={Title}
        onChange={(e)=> setTitle(e.target.value)}
        />
        <Dropdown
         placeholder="Select an option"
         label="Status"
         options={options}
         selectedKey={selectedItem}
         onChanged={ selectedOption=> setOption(selectedOption.text)}
        />
        <DatePicker
          label=" Due Date "
          placeholder="Select a date..."
          ariaLabel="Select a date"
          value={Time}
          onSelectDate={ date => setTime(date)}
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
        <PrimaryButton className="save" onClick={handleSubmit} text="Save" />
        {people.map((person,index)=>{
          const { id,Title,Description,Time,selectedItem }= person;
         return( 
         <div >
           <ul key={id}>
            <li className="Todo">
                <div className="Todoapp">
                <div><p>{Title}</p></div>
                <div><h5>{selectedItem}</h5></div> 
                <div><h6>{new Date(Time).toString()}</h6></div>
                </div>
              <div>{Description}</div></li>
           </ul>
          </div>
         ); 
        }

        )}
      </div>
    );
}