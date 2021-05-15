import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import PaletteIcon from "@material-ui/icons/Palette";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SwapHorizontalCircleRoundedIcon from "@material-ui/icons/SwapHorizontalCircleRounded";
import Tooltip from "@material-ui/core/Tooltip";

const Main = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AllContainer = styled.div`
  position: absolute;
  display: grid;
  grid-template-rows: auto auto;
  row-gap: 10px;
`;

//
const CostReport = styled.div`
  box-shadow: 0 1px 3px rgb(0 0 0/12%), 0 1px 2px rgb(0 0 0/24%);
  top: 20%;
  background-color: #e6ecfc;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  margin-right: auto;
  display: grid;
  grid-template-columns: auto auto;
`;

const MainContent = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 10px;
  top: 200px;
  flex-direction: row;
`;

const Materials = styled.div`
  box-shadow: 0 1px 3px rgb(0 0 0/12%), 0 1px 2px rgb(0 0 0/24%);
  width: 100%;
  height: 285px;
  min-width: 250px;
  background-color: #e8bcc4;
  border-radius: 4px 0px 0px 4px;
`;

const MaterialForm = styled.div`
  box-shadow: 0 1px 3px rgb(0 0 0/12%), 0 1px 2px rgb(0 0 0/24%);
  width: 500px;
  height: 285px;
  background-color: #f7e3eb;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0px 30px;
  display: grid;
  grid-template-columns: auto auto;
  gap: 20px;
  align-content: center;
`;

const ColorPallete = styled.input`
  background-color: transparent;
  border-color: transparent;
  width: 0px;
  height: 0px;
  align-items: center;
  position: absolute;
  bottom: 20px;
  left: 20px;
`;

const ColorPalleteButtonContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  grid-row: 2/4;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ColorPalleteInnerButtonContainer = styled.div`
  border: dashed 1px;
  border-radius: 50%;
  position: relative;
  width: 70px;
  height: 70px;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ColorPalleteButton = styled.div`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  transition-timing-function: ease-in;
  transition: all 0.5s;
  cursor: pointer;
`;

const MaterialContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DeleteMaterial = styled.button`
  box-shadow: 0 1px 3px rgb(0 0 0/12%), 0 1px 2px rgb(0 0 0/24%);
  border: none;
  outline: none;
  border-radius: 0px 0px 0px 3px;
  background-color: #cf9388;
  padding: 20px;
  width: 100%;
  font-weight: 600;
`;
const AddEditMaterial = styled.button`
  box-shadow: 0 1px 3px rgb(0 0 0/12%), 0 1px 2px rgb(0 0 0/24%);
  border: none;
  outline: none;
  border-radius: 0px 0px 3px 0px;
  background-color: #b2b4be;
  padding: 20px;
  width: 100%;
  font-weight: 600;
  cursor: pointer;
  transition-timing-function: ease-in;
  transition: all 0.5s;
  :hover {
    background: #bebcb6;
  }
`;

const CostText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;

const Cost = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;

const MaterialList = styled.div`
  overflow-y: auto;
  max-height: 288px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const MaterialItem = styled.div`
  padding: 10px;
  cursor: pointer;
  display: grid;
  grid-template-columns: 50px auto 40px;
  grid-template-rows: auto auto;
  grid-template-areas:
    "color name delete"
    "color volume delete";
  column-gap: 10px;

  :hover {
    background: #b2b4be;
  }
`;

const MaterialNameContainer = styled.div`
  grid-area: name;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const MaterialColorContainer = styled.div`
  grid-area: color;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MaterialItemsColor = styled.div`
  border: dashed 1px;
  border-radius: 50%;
  width: 25px;
  height: 25px;
`;

const MaterialVolumeContainer = styled.div`
  grid-area: volume;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

const DeleteContainer = styled.div`
  grid-area: delete;
  display: flex;
  align-items: center;
`;

const StyledTextField = styled(TextField)`
  input {
    color: rgba(0, 0, 0, 0.5);
  }
  label {
    color: rgba(0, 0, 0, 0.5);
  }
  label.Mui-focused {
    color: black;
  }
  .MuiInputBase-root {
    color: black;
  }
  .MuiOutlinedInput-root {
    fieldset {
      border-color: rgba(0, 0, 0, 0.5);
      color: black;
    }
    &:hover fieldset {
      border-color: black;
      border-width: 2px;
      color: black;
    }
    &.Mui-focused fieldset {
      border-color: black;
      color: black;
    }
  }
`;

function SubmitMaterial() {
  const [cost, setCost] = useState("");
  const [lastCost, setLastCost] = useState(null);
  const [totalCost, setTotalCost] = useState(0);
  const [color, setColor] = useState("#504a49");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [materialName, setMaterialName] = useState("");
  const [volume, setVolume] = useState("");
  const [material, setMaterial] = useState([]);
  const [lastIndex, setLastIndex] = useState(null);
  const [open, setOpen] = useState(false);

  const [textColor, setTextColor] = useState("black");

  //it is calculated if the color chosed from color pallete is light or dark
  //if the color is light (hsp>127.5) color text is changes to black
  //if the color is dark (else) color text is changed to white
  useEffect(() => {
    let isColor = +(
      "0x" + color.slice(1).replace(color.length < 5 && /./g, "$&$&")
    );

    let red = isColor >> 16;
    let green = (isColor >> 8) & 255;
    let blue = isColor & 255;

    let hsp = Math.sqrt(
      0.299 * (red * red) + 0.587 * (green * green) + 0.114 * (blue * blue)
    );

    if (hsp > 127.5) {
      setTextColor("black");
    } else {
      setTextColor("white");
    }
  }, [color]);

  //onClick event: when color div is clicked, html color picker is opened
  const colorPalleteOnload = () => {
    const isColorPallet = document.getElementById("colorPallete");
    if (isColorPallet) {
      isColorPallet.click();
    }
  };

  //if material cost, name and volume field are not empty, their value besides color and date
  //are added to "material" state and totalCost is updated to the new value. All the fields
  //are then become empty.
  const addItems = () => {
    if (
      cost !== null &&
      cost !== "" &&
      materialName !== null &&
      materialName !== "" &&
      volume !== null &&
      volume !== "" &&
      lastIndex == null
    ) {
      let tempCost = cost;
      setMaterial([
        ...material,
        {
          name: materialName,
          cost: cost,
          volume: volume,
          color: color,
          date: date,
        },
      ]);
      addTotalCost(totalCost, tempCost);
      emptyFields();
    }
  };

  //make the fileds of material form empty
  const emptyFields = () => {
    setMaterialName("");
    setCost("");
    setVolume("");
    setDate(new Date().toISOString().split("T")[0]);
    setColor("#504a49");
    setLastIndex(null);
    setLastCost(null);
  };

  //when "edit" button is clicked, every changes in the form is reflected, background color
  //of the item is removed to show that the item is not selected anymore, if cost is also changed,
  //totalcost is also updated, and fields of the material form become empty. if no item is selected,
  //(lastIndex==null) a dialog box is shown to inform the user to choose an item to edit.
  const editItems = () => {
    if (lastIndex !== null) {
      let tempMat = [...material];
      tempMat[lastIndex].name = materialName;
      tempMat[lastIndex].cost = cost;
      tempMat[lastIndex].volume = volume;
      tempMat[lastIndex].date = date;
      tempMat[lastIndex].color = color;

      const tempMatItem = document.getElementById(`mterialItem${lastIndex}`);
      tempMatItem.style.background = "";

      if (lastCost !== null && lastCost !== cost) {
        let lastCo = lastCost;
        let curCo = cost;
        negateTotalCost(curCo, lastCo);
      }
      emptyFields();
    } else {
      setOpen(true);
    }
  };

  //close the dialog box if it is already opened.
  const handleClose = () => {
    setOpen(false);
  };

  //update total cost when the information of a material is edited.
  const negateTotalCost = (cost, lastCost) => {
    let tempcost = subtractTotalCost(totalCost, lastCost);
    console.log("Current totalcost", tempcost);
    addTotalCost(tempcost, cost);
  };

  //add a value(cost) to total cost when an item is added to the list of materials.
  const addTotalCost = (totalCost, cost) => {
    setTotalCost(
      (parseFloat(totalCost) + parseFloat(cost)).toFixed(
        Math.max(
          cost.split(".")[1]?.length ? cost.split(".")[1].length : 0,
          totalCost.toString().split(".")[1]?.length
            ? totalCost.toString().split(".")[1].length
            : 0
        )
      )
    );
  };

  //delete a material from the list of materials and subtract the corresponding cost from
  //total cost. if an item was selected, the background color will be removed.
  const deleteMaterialItem = (index) => {
    let tempMaterial = [...material];
    let tempcost = subtractTotalCost(totalCost, tempMaterial[index].cost);
    setTotalCost(tempcost);
    tempMaterial.splice(index, 1);
    setMaterial(tempMaterial);
    emptyFields();
    if (lastIndex !== null) {
      const tempMatItem = document.getElementById(`mterialItem${lastIndex}`);
      tempMatItem.style.background = "";
    }
  };
  //subtract a value(currentCost) from total cost when an item is eliminated from the list of materials.
  const subtractTotalCost = (totalCost, currentCost) => {
    let tempcost = (parseFloat(totalCost) - parseFloat(currentCost)).toFixed(
      Math.max(
        currentCost.split(".")[1]?.length
          ? currentCost.split(".")[1].length
          : 0,
        totalCost.toString().split(".")[1]?.length
          ? totalCost.toString().split(".")[1].length
          : 0
      )
    );
    tempcost = parseFloat(tempcost.toString());
    return tempcost;
  };

  //when an item is selected, the backgroung color of the item is changed and the value of
  //material name, cost, volume, color, and date for a specific index that is already sent
  //to the function, are kept in the corresponding states and accordingly they are shown
  //in the fields of material form. lastindex is set to show that an item is selected and if
  //a user clicks on "Add" button, no new item will be added unless "Edit" button is clicked
  //and everything returns to its normal state.
  const editMaterialContent = (index) => {
    if (lastIndex !== null) {
      const tempMat = document.getElementById(`mterialItem${lastIndex}`);
      tempMat.style.backgroundColor = "";
    }

    let tempMaterial = [...material];
    let tempLastMaterial = [...material];
    setMaterialName(tempMaterial[index].name);
    setCost(tempMaterial[index].cost);
    setLastCost(tempLastMaterial[index].cost);
    setVolume(tempMaterial[index].volume);
    setDate(tempMaterial[index].date);
    setColor(tempMaterial[index].color);
    const tempMat = document.getElementById(`mterialItem${index}`);
    tempMat.style.backgroundColor = "#b2b4be";
    changeLastIndex(index);
  };

  //last index is set
  const changeLastIndex = (index) => {
    setLastIndex(index);
  };

  return (
    <Main>
      <AllContainer>
        {/* Total Cost */}
        <CostReport>
          <CostText>Total Cost:</CostText>
          <Cost>{totalCost}</Cost>
        </CostReport>
        <MainContent>
          <MaterialContainer>
            <Materials>
              <MaterialList>
                {/* Material Items */}
                {material.map((item, key) => (
                  <MaterialItem key={key} id={`mterialItem${key}`}>
                    <MaterialColorContainer
                      onClick={() => editMaterialContent(key)}
                    >
                      <MaterialItemsColor
                        style={{ backgroundColor: item.color }}
                      />
                      {/* {item.color} */}
                    </MaterialColorContainer>
                    <MaterialNameContainer
                      onClick={() => editMaterialContent(key)}
                    >
                      {item.name}
                    </MaterialNameContainer>
                    <MaterialVolumeContainer
                      onClick={() => editMaterialContent(key)}
                    >
                      {item.volume}
                    </MaterialVolumeContainer>
                    <DeleteContainer>
                      <DeleteIcon
                        onClick={() => deleteMaterialItem(key)}
                        key={key}
                        id={`delete${key}`}
                      />
                    </DeleteContainer>
                  </MaterialItem>
                ))}
              </MaterialList>
            </Materials>
            <ButtonContainer>
              {/* Edit Button */}
              <Tooltip title="Edit" placement="bottom-end">
                <AddEditMaterial onClick={() => editItems()}>
                  <SwapHorizontalCircleRoundedIcon />
                </AddEditMaterial>
              </Tooltip>
              {/* Add Button */}
              <Tooltip title="Add" placement="bottom-end">
                <AddEditMaterial onClick={() => addItems()}>
                  <AddCircleIcon />
                </AddEditMaterial>
              </Tooltip>
            </ButtonContainer>
          </MaterialContainer>
          {/* Material Form */}
          <MaterialForm>
            {/* Name Field */}
            <StyledTextField
              id="material-name"
              label="Name"
              variant="outlined"
              onChange={(e) => setMaterialName(e.target.value)}
              value={materialName}
            />
            {/* Volume Field */}
            <StyledTextField
              id="material-volume"
              label="Volume"
              variant="outlined"
              type="number"
              onChange={(e) => setVolume(e.target.value)}
              value={volume}
            />
            {/* Cost Field */}
            <StyledTextField
              id="material-cost"
              label="Cost"
              variant="outlined"
              type="number"
              onChange={(e) => setCost(e.target.value)}
              value={cost}
            />
            {/* Date Field */}
            <StyledTextField
              InputLabelProps={{
                shrink: true,
              }}
              id="material-cost"
              label="Delivery Date"
              variant="outlined"
              type="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
            {/* Color Palette */}
            <ColorPalleteButtonContainer>
              <ColorPalleteInnerButtonContainer>
                <ColorPallete
                  type="color"
                  id="colorPallete"
                  onChange={(e) => setColor(e.target.value)}
                />
                <Tooltip title="Color" placement="bottom-end">
                  <ColorPalleteButton
                    style={{ backgroundColor: color, color: textColor }}
                    onClick={() => colorPalleteOnload()}
                  >
                    {/* Color */}
                    <PaletteIcon />
                  </ColorPalleteButton>
                </Tooltip>
              </ColorPalleteInnerButtonContainer>
            </ColorPalleteButtonContainer>
          </MaterialForm>
        </MainContent>
      </AllContainer>
      {/* Dialog (will be shown when no item is selected and "Edit" button is clicked)*/}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"No Item Is Selected!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please select an item from the left side pannel to edit.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Main>
  );
}

export default SubmitMaterial;
