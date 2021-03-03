import React, { useState } from 'react';
import { Stack } from '@fluentui/react';
import {TextField} from '@fluentui/react';
import { Dropdown, IDropdownOption, DropdownMenuItemType } from '@fluentui/react';
import {DatePicker} from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react';

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
      console.log('Title and dscription is empty so fill it first');
    }
  }

    return(
      <div>
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
        <Stack>
        <TextField 
        label="Description..." 
        multiline autoAdjustHeight 
        value={Description}
        onChange={(e)=>setDescription(e.target.value)}
        />
        </Stack>
        <PrimaryButton onClick={handleSubmit} text="Save" />
        {people.map((person,index)=>{
          const { id,Title,Description,Time,selectedItem }= person;
         return( 
         <div key={id}>
           <ul>
            <li><h4>{Title}</h4>
            <h5>{selectedItem}</h5> 
            <h5>{new Date(Time).toString()}</h5></li>
            <li><h6>{Description}</h6></li>
           </ul>
          </div>
         ); 
        }

        )}
      </div>
    );
}