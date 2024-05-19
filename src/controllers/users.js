import express from 'express';
import fs from  'fs';
import csv from 'csv-parser';

import  { deleteUserById, getUsers, getUserById } from '../db/users.js';
import {UserModel} from "../db/users.js"
import  ListModel from '../db/Lists.js'


export const addAllUsersusingcsv = async (req, res) => {
  try {
    const path = req.file.path;
    const lists = await ListModel.find();
    const users = [];

    fs.createReadStream(path)
      .pipe(csv())
      .on('data', (row) => {
        users.push(row);
        users.forEach(prop1 => {
          lists.forEach(prop => {
          if(prop.customProperties[0].title=='city'){
            prop1['city'] = prop1['city'] || prop.customProperties[0].defaultValue;
          }
          });
        });
      })
      .on('end', async () => {
        try {
          const result = await UserModel.insertMany(users);
          return res.status(200).json({ message: 'Inserted' });
        } catch (error) {
          return res.status(400).json({ message: error });
        } 
      });
  } catch (error) {
    return res.sendStatus(400);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = (req.params);
    const deletedUser = await deleteUserById(id);

    return res.json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const  data  = req.body;
    const updatedItem = await UserModel.findByIdAndUpdate(id.trim(), data, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    return res.json(updatedItem);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}
