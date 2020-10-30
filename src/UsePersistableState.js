import { useState, useEffect } from 'react';

export const usePersistableState = (key, initialValue) => {
    let [activeFilter, setActiveFilter] = useState(localStorage.getItem(key) || initialValue);

    useEffect(() => localStorage.setItem(key, activeFilter), [key, activeFilter]);

    return [activeFilter, setActiveFilter];
}