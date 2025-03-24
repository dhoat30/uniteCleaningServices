import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import styled from "@emotion/styled";
import Slider from "@mui/material/Slider";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

// styling for select
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Input({
  label,
  type,
  value,
  onChange,
  onBlur,
  required,
  autoComplete,
  errorMessage,
  isInvalid,
  options,
  multipleValue,
  lightTheme,
  min,
  max,
  note,
  id, 
  ...props
}) {
  if (type === "radio") {
    return (
      <FormControlStyled
        error={required ? isInvalid : null}
        variant="standard"
        sx={{ marginTop: "16px" }}
        fullWidth
      >
        <FormLabel className="radio-label">
          <Typography variant="h6" component="div">
            {label}
          </Typography>
        </FormLabel>
        <RadioGroup
          aria-labelledby="error-radios"
          name="quiz"
          color={lightTheme ? "primary" : "secondary"}
          value={value}
          onChange={onChange}
          sx={{ marginTop: "8px" }}
        >
          {options.map((option, index) => (
            <FormControlLabel
              color="white"
              sx={{ color: "rgba(255, 255, 255, 0.7)" }}
              key={index}
              value={option.value}
              control={<Radio color={lightTheme ? "primary" : "secondary"} />}
              label={option.label}
            />
          ))}
        </RadioGroup>
        <FormHelperText error={isInvalid}>
          {isInvalid && errorMessage}
        </FormHelperText>
      </FormControlStyled>
    );
  } else if (type === "select") {
    return (
      <FormControlStyled
        error={required ? isInvalid : null}
        sx={{ marginTop: "16px ", }}
        color="secondary"
        fullWidth={true}
      >
        <InputLabel id="multiple-checkbox-label" sx={{ width: "100%" }}>
          {label}
        </InputLabel>
        <Select
          sx={{ width: "100%" }}
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple={multipleValue}
          value={value}
          onChange={onChange}
          input={<OutlinedInput label={label} />}
          renderValue={
            multipleValue
              ? (selected) => selected.join(", ")
              : (selected) => selected.toString()
          }
          MenuProps={MenuProps}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              <Checkbox
                checked={value.indexOf(option.value) > -1}
                color={lightTheme ? "primary" : "secondary"}
              />
              <ListItemText
                primary={option.label}
                color={lightTheme ? "primary" : "secondary"}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControlStyled>
    );
  } else if (type == "checkbox") {
    return (
      <FormControlStyled
        error={required ? isInvalid : null}
        variant="standard"
        sx={{ marginTop: "16px " }}
      >
        <FormLabel className="radio-label">
          <Typography variant="h6" component="div">
            {label}
          </Typography>
        </FormLabel>

        <FormGroup
          aria-labelledby="checkbox"
          name="checkbox group"
          color={lightTheme ? "primary" : "secondary"}
          value={value}
          onChange={onChange}
          sx={{ marginTop: "8px" }}
        >
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option.value}
              control={
                <Checkbox
                  checked={value.indexOf(option.value) > -1}
                  name={option.label}
                  color={lightTheme ? "primary" : "secondary"}
                />
              }
              label={option.label}
            />
          ))}
        </FormGroup>

        <FormHelperText error={isInvalid}>
          {isInvalid && errorMessage}
        </FormHelperText>
      </FormControlStyled>
    );
  } else if (type === "slider") {
    return (
      <SliderContainer className="slider-container">
        <FormLabel className="radio-label">
          <Typography variant="h6" component="div">
            {label}
          </Typography>
        </FormLabel>
        <div className="slider-wrapper">
          <Slider
            aria-label="Default"
            valueLabelDisplay="auto"
            value={value}
            onChange={onChange}
            min={min}
            max={max}
          />
          <TextFieldStyle
            value={value ? value : min}
            size="small"
            onChange={onChange}
            color={lightTheme ? "primary" : "secondary"}
            inputProps={{
              step: 1,
              min: min,
              max: max,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </div>
        {note && <FormHelperText>{note}</FormHelperText>}

        <FormHelperText error={isInvalid}>
          {isInvalid && errorMessage}
        </FormHelperText>
      </SliderContainer>
    );
  } else if (type === "chip" && options.length > 0) {
    const handleChipClick = (optionValue) => {
      let currentValues = Array.isArray(value) ? [...value] : [];
      if (currentValues.includes(optionValue)) {
        currentValues = currentValues.filter((item) => item !== optionValue); // Remove if already present
      } else {
        currentValues.push(optionValue); // Add if not present
      }
      onChange(currentValues); // Pass back the updated array to the parent component
    };

    return (
      <FormControlStyled
        error={required ? isInvalid : null}
        style={{ marginTop: "16px" }}
      >
        <Typography variant="h6" component="div">
          {label}
        </Typography>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          {options.map((option, index) => (
            <Chip
              key={index}
              label={option.label}
              onClick={() => handleChipClick(option.value)}
              variant={value.includes(option.value) ? "filled" : "outlined"}
              color="primary"
            />
          ))}
        </div>
        <FormHelperText error={isInvalid}>
          {isInvalid && errorMessage}
        </FormHelperText>
      </FormControlStyled>
    );
  } else if (
    type === "text" ||
    type === "email" ||
    type === "tel" ||
    type === "textarea"
  ) {
    return (
      <TextFieldStyle
        sx={{
          marginTop: "24px",
        }}
        label={label}
        type={type}
        value={value}
        color={lightTheme ? "secondary" : "secondary"}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        variant="outlined"
     name={id}
     id={id}
        fullWidth
        autoComplete={autoComplete}
        helperText={isInvalid && errorMessage}
        error={required ? isInvalid : null}
        multiline={type === "textarea" ? true : false}
        minRows={type === "textarea" ? 3 : null}
      />
    );
  }
}
const FormControlStyled = styled(FormControl)`
.MuiChip-filled{ 
  span { 
    color: white; 
  }
}
  .MuiTypography-body1 {
    font-weight: 350;
  }
  .radio-label.Mui-focused {
    /* color: rgba(255, 255, 255, 0.7); */
  }
  label {
    @media (max-width: 600px) {
      padding: 8px 0;
    }
  }
`;

const TextFieldStyle = styled(TextField)`
  label,
  input {
    font-weight: 350;
  }
`;

const SliderContainer = styled.div`
  margin-top: 16px;
  .slider-wrapper {
    @media (max-width: 600px) {
      margin-left: 24px;
    }

    margin: 0 8px;
    display: grid;
    grid-template-columns: auto 60px;
    gap: 24px;
    align-items: center;
    .MuiFormControl-root {
      margin-top: 0;
    }
  }
`;
