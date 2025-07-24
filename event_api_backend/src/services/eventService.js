//
// Event Service - In-memory store for events
//

/**
 * EventService class manages events in memory.
 * Data is lost when the process exits.
 */
class EventService {
  constructor() {
    this.events = [];
    this.nextId = 1;
  }

  // PUBLIC_INTERFACE
  create(eventData) {
    const newEvent = { id: this.nextId++, ...eventData };
    this.events.push(newEvent);
    return newEvent;
  }

  // PUBLIC_INTERFACE
  findAll() {
    return this.events;
  }

  // PUBLIC_INTERFACE
  findById(id) {
    return this.events.find(e => e.id === id) || null;
  }

  // PUBLIC_INTERFACE
  update(id, updates) {
    const index = this.events.findIndex(e => e.id === id);
    if (index === -1) return null;
    this.events[index] = { ...this.events[index], ...updates };
    return this.events[index];
  }

  // PUBLIC_INTERFACE
  delete(id) {
    const index = this.events.findIndex(e => e.id === id);
    if (index === -1) return false;
    this.events.splice(index, 1);
    return true;
  }
}

module.exports = new EventService();
