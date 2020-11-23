import React from "react";
import { map, keys, values, addIndex, prop, pipe, flatten, reduce, view, pluck, compose, mapObjIndexed } from "ramda";
import data from "./stub-data.json";
import Expression from "./expression";
import Group from "./group";
import converter from "./converter";
import styled from "styled-components";

const AddTask = styled.div`
  background-color: #aab2bd;
  border-radius: 3px;
  margin: 5px;
  width: 20px;
  height: 20px;
  color: white;
  display: grid;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  font-size: 20pt;
  cursor: pointer;
`;

const AddTaskGroup = styled.div`
  width: 20px;
  height: 40px;
  color: black;
  display: grid;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  font-size: 20pt;
  cursor: pointer;
`;

const ItemTotal = styled.div`
  height: 40px;
  line-height: 40px;
  font-size: 10pt;
  color: #aab2bd;
`;

const mapObjectToValues = mapper => compose(values, mapObjIndexed(mapper));


const App = () => {

  const convertedData = converter(data);

  return (

    <div className="App">

      {
        mapObjectToValues((node, rootKey) =>

          <Group
            key={rootKey}
            title={rootKey}>

            {
              mapObjectToValues((item, key) =>

                <Expression
                  key={key}
                  text={prop("task", item)}
                  isChecked={prop("isChecked", item)}
                />

              )(node)
            }

            <AddTaskGroup
              onClick={() => console.log("Add Task")}>
              +
              </AddTaskGroup>

          </Group>

        )(convertedData)

      }

      {/* <AddTask
        onClick={() => console.log("Add Task")}>
        +
      </AddTask> */}

    </div>

  )

}

export default App;



