import express from 'express';
import  ListModel from '../db/Lists.js'



export const AddList = async (req, res) => {
    try {
        const { title, customProperties } = req.body;
        const Listforsave = new ListModel({ title, customProperties });
        await Listforsave.save();
        res.status(201).json(Listforsave);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

export const getAllLists = async (req, res) => {
    try {
        const lists = await ListModel.find();
        res.status(200).json(lists);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  };

  export const getList = async (req, res) => {
    try {
        const list = await ListModel.findById(req.params.id);
        if (!list) {
          return res.status(404).json({ error: 'List not found' });
        }
        res.status(200).json(list);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  };
  
  export const deleteList = async (req, res) => {
    try {
        const deletedList = await ListModel.findByIdAndDelete(req.params.id);
        if (!deletedList) {
          return res.status(404).json({ error: 'List not found' });
        }
        res.status(200).json({ message: 'List deleted' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
  }
  
  export const updateList = async (req, res) => {
    try {
        const { title, customProperties } = req.body;
        const updatedList = await ListModel.findByIdAndUpdate(req.params.id, { title, customProperties }, { new: true });
        if (!updatedList) {
          return res.status(404).json({ error: 'List not found' });
        }
        res.status(200).json(updatedList);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
  }