// src/components/KanbanBoard.js
import React, { useState, useEffect } from 'react';
import './styles.css'; // Import the CSS file containing the styles
import Card from './Card';
import Button from './Button';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState(null);
  const [selectedSorting, setSelectedSorting] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);

  
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (Array.isArray(data.tickets)) {
          setTickets(data.tickets);
        } else {
          console.error('Tickets data is not an array');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchTickets();
  }, []);

  const handleDisplayClick = async (dropdownType) => {
    setShowCard(!showCard);
    if (dropdownType === 'statuses' && !statuses.length) {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (Array.isArray(data.tickets)) {
          const uniqueStatuses = [...new Set(data.tickets.map((ticket) => ticket.status))];
          setStatuses(uniqueStatuses);
        } else {
          console.error('Tickets data is not an array');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setSelectedDropdown('statuses');
    } else if (dropdownType === 'priorities' && !priorities.length) {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (Array.isArray(data.tickets)) {
          const uniquePriorities = [...new Set(data.tickets.map((ticket) => ticket.priority.toString()))];
          setPriorities(uniquePriorities);
        } else {
          console.error('Tickets data is not an array');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setSelectedDropdown('priorities');
    }
  };

  const handleStatusSelection = (status) => {
    setSelectedStatus(status);
  };

  const handlePrioritySelection = (priority) => {
    setSelectedPriority(priority);
  };

  const sortTickets = (tickets, selectedSorting) => {
    if (selectedSorting === 'priority') {
      return [...tickets].sort((a, b) => b.priority - a.priority);
    } else if (selectedSorting === 'title') {
      return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  const filterTickets = (tickets, selectedStatus, selectedPriority) => {
    let filteredTickets = tickets;
    if (selectedStatus) {
      filteredTickets = filteredTickets.filter((ticket) => ticket.status === selectedStatus);
    }
    if (selectedPriority) {
      filteredTickets = filteredTickets.filter((ticket) => ticket.priority.toString() === selectedPriority);
    }
    return filteredTickets;
  };

  const sortedTickets = sortTickets(tickets, selectedSorting);
  const filteredTickets = filterTickets(sortedTickets, selectedStatus, selectedPriority);

  if (!Array.isArray(tickets) || tickets.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="navbar">
        <button className="display-button" onClick={() => handleDisplayClick('statuses')}>
          Status
        </button>
        <button className="display-button" onClick={() => handleDisplayClick('priorities')}>
          Priority
        </button>
      </div>

      {showCard && (
        <div className="card">
          <div className="dropdown">
            {selectedDropdown === 'statuses' &&
              statuses.map((status, index) => (
                <button key={index} className="dropdown-button" onClick={() => handleStatusSelection(status)}>
                  {status}
                </button>
              ))}
            {selectedDropdown === 'priorities' &&
              priorities.map((priority, index) => (
                <button key={index} className="dropdown-button" onClick={() => handlePrioritySelection(priority)}>
                  {priority}
                </button>
              ))}
          </div>
        </div>
      )}

      <div className="kanban-board">
        <div className="container">
          <div className="column">
            {filteredTickets.map((ticket) => (
              <Card key={ticket.id} ticket={ticket} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
