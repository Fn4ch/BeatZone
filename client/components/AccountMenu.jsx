import React from 'react'
import { IconButton, Menu, MenuItem} from '@mui/material'
import {AccountCircle, Logout} from '@mui/icons-material'
import { useState } from 'react'

const AccountMenu = () => {

    const[auth, setAuth] = useState()
    const[anchorEl, setAnchorEl] = useState()

    const handleChange = (event) => {
        setAuth(event.target.checked)
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget)
    }
    
    const handleClose = () => {
        setAnchorEl(null)
      }

    return(
        <>              
            <div>   
              <IconButton                 
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="secondary"
              >
                <AccountCircle color='secondary' fontSize='large'/>
              </IconButton>
              <Menu
                width={"auto"}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My tracks</MenuItem>
                <MenuItem onClick={handleClose}>Playlists</MenuItem>
                <MenuItem onClick={handleClose}>logout <Logout/></MenuItem>
              </Menu>
            </div>          
        </>
    )
}

export default AccountMenu