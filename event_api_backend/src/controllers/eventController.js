//
// Event Controller - Handles request/response for /events endpoints
//
const eventService = require('../services/eventService');

function validateEventInput(data) {
  // Basic required fields: title, date (YYYY-MM-DD), location, description optional
  const errors = [];
  if (!data.title || typeof data.title !== 'string') errors.push('title is required and must be a string');
  if (!data.date || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) errors.push('date is required (YYYY-MM-DD)');
  if (!data.location || typeof data.location !== 'string') errors.push('location is required and must be a string');
  if (data.description && typeof data.description !== 'string') errors.push('description must be a string');
  return errors;
}

// PUBLIC_INTERFACE
function getAllEvents(req, res) {
  return res.status(200).json(eventService.findAll());
}

// PUBLIC_INTERFACE
function getEventById(req, res) {
  const id = Number(req.params.id);
  const event = eventService.findById(id);
  if (!event) return res.status(404).json({ error: 'Event not found' });
  return res.status(200).json(event);
}

// PUBLIC_INTERFACE
function createEvent(req, res) {
  const errors = validateEventInput(req.body);
  if (errors.length > 0) return res.status(400).json({ errors });
  const event = eventService.create(req.body);
  return res.status(201).json(event);
}

// PUBLIC_INTERFACE
function updateEvent(req, res) {
  const id = Number(req.params.id);
  const errors = validateEventInput({ ...eventService.findById(id), ...req.body });
  if (errors.length > 0) return res.status(400).json({ errors });
  const updated = eventService.update(id, req.body);
  if (!updated) return res.status(404).json({ error: 'Event not found' });
  return res.status(200).json(updated);
}

// PUBLIC_INTERFACE
function deleteEvent(req, res) {
  const id = Number(req.params.id);
  const deleted = eventService.delete(id);
  if (!deleted) return res.status(404).json({ error: 'Event not found' });
  return res.status(204).send();
}

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};
