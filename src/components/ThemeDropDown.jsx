import React from 'react'
import { Select, MenuItem } from "@mui/material";

const ThemeDropDown = ({ theme, setTheme }) => {
  return (
    <Select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                sx={{
                  color: `${theme === "dark" ? "white" : "black"}`,
                  background: "transparent",
                  border: "none",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                  "& .MuiSelect-icon": {
                    color: `${theme === "dark" ? "white" : "black"}`,
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: `${theme === "dark" ? "#18181b" : "white"}`,
                      color: `${theme === "dark" ? "white" : "black"}`,
                      borderRadius: "8px",
                      mt: 1,
                    },
                  },
                }}>
                <MenuItem value="dark">Dark</MenuItem>
                <MenuItem value="light">Light</MenuItem>
              </Select>
  )
}

export default ThemeDropDown