
import { useState, useEffect } from 'react';
import { CMSData } from '../types/cms';
import { getCMSData, updateCMSData, resetCMSData } from '../data/cms-data';

export const useCMS = () => {
  const [data, setData] = useState<CMSData>(getCMSData());
  const [isLoading, setIsLoading] = useState(false);

  const updateData = async (newData: Partial<CMSData>) => {
    setIsLoading(true);
    try {
      updateCMSData(newData);
      setData({ ...data, ...newData });
    } catch (error) {
      console.error('Error updating CMS data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetData = async () => {
    setIsLoading(true);
    try {
      resetCMSData();
      setData(getCMSData());
    } catch (error) {
      console.error('Error resetting CMS data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = () => {
    setData(getCMSData());
  };

  useEffect(() => {
    const handleStorageChange = () => {
      refreshData();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    data,
    updateData,
    resetData,
    refreshData,
    isLoading
  };
};
