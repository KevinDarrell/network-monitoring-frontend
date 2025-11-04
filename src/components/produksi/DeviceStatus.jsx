import React, { useState, useEffect } from 'react';
import DeviceHistoryLine from './DeviceHistoryLine';
import '../../styles/view.css';

export default function DeviceStatus({ id, name, status, historyLength, updateTrigger }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [labelStatus, setLabelStatus] = useState('default');
  const [history, setHistory] = useState(Array(historyLength).fill('default'));

  useEffect(() => {
    if (updateTrigger === 0) return;

    const newStatus = status === 'UP' ? 'up' : status === 'DOWN' ? 'down' : 'default';
    setLabelStatus(newStatus);

    setHistory(prev => {
      const updated = [...prev];
      updated[currentIndex] = newStatus;
      return updated;
    });

    setCurrentIndex(prev => (prev + 1) % historyLength);
  }, [updateTrigger, status, historyLength]);

  return (
    <div className="flex items-center gap-3">
      <DeviceHistoryLine id={id} history={history} currentIndex={currentIndex} />
      <div className={`label flex items-center gap-2 ${labelStatus}`}>
        {labelStatus === 'up' && <span>🟢</span>}
        {labelStatus === 'down' && <span>🔴</span>}
        {labelStatus === 'default' && <span>⚪</span>}
        <span className="font-semibold text-base">{name}</span>
      </div>
    </div>
  );
}
