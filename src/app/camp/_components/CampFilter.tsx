'use client';
import React, { useState } from 'react';

const CampFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenDropdown = () => {
    setIsOpen(true);
  };

  const handleCloseDropdown = () => {
    setIsOpen(false);
  };

  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
    handleCloseDropdown();
  };

  return (
    <div>
      <button onClick={handleOpenDropdown}>드롭다운 열기</button>

      {isOpen && (
        <div>
          <ul>
            <li onClick={() => handleSelectItem('항목 1')}>항목 1</li>
            <li onClick={() => handleSelectItem('항목 2')}>항목 2</li>
            <li onClick={() => handleSelectItem('항목 3')}>항목 3</li>
          </ul>
          <button onClick={handleCloseDropdown}>드롭다운 닫기</button>
        </div>
      )}

      {selectedItem && <p>선택된 항목: {selectedItem}</p>}
    </div>
  );
};

export default CampFilter;
