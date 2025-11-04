import React from 'react';
import '../../styles/view.css';

export default function DeviceHistoryLine({ id, history, currentIndex }) {
  return (
    <div className="line-container flex">
      {history.map((status, i) => (
        <span
          key={i}
          id={`dash-${id}-${i}`}
          className={`dash ${status} ${i === (currentIndex - 1 + history.length) % history.length ? 'live' : ''}`}
        />
      ))}
    </div>
  );
}
