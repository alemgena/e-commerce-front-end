import React, { useState } from 'react';
import { Button, ButtonGroup, MenuItem, Select } from '@mui/material';

const priceFilters = [
  { value: 'low', label: 'Low to High' },
  { value: 'high', label: 'High to Low' },
];

const ProductFilter = ({ handlePriceFilter }:any) => {
  const [priceFilter, setPriceFilter] = useState('low');

  const handleChange = (event:any) => {
    const value = event.target.value;
    setPriceFilter(value);
    handlePriceFilter(value);
  };
  

  return (
    <div>
      <ButtonGroup>
        <Button>Filter by Price: </Button>
        <Select
          labelId="price-filter-selector"
          id="price-filter-selector"
          value={priceFilter}
          onChange={handleChange}
        >
          {priceFilters.map((filter) => (
            <MenuItem key={filter.value} value={filter.value}>
              {filter.label}
            </MenuItem>
          ))}
        </Select>
      </ButtonGroup>
    </div>
  );
};

export default ProductFilter;
