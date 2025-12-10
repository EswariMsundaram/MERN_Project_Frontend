import React from "react"
import { Navigate } from "react-router-dom"
import { useContext } from "react"
import {AuthContext} from "../context/AuthProvider"

interface Props{
    children:Jsx.Element;
}