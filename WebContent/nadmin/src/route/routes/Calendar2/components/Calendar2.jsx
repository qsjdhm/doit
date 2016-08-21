import React, { Component } from 'react'

class Calendar2 extends Component {
  render() {
    const events = [
      { id: 0, title: 'essay due' }
    ]

    return (
      <div>
        <h2>Calendar2</h2>
        <ul>
          {events.map(event => (
            <li key={event.id}>{event.title}</li>
          ))}
        </ul>
      </div>
    )
  }
}

module.exports = Calendar2
