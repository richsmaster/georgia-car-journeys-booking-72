import React, { useState, useEffect } from 'react';
import { CMSData } from '../types/cms';
import { getCMSData, updateCMSData, resetCMSData } from '../data/cms-data';

export const useCMS = () => {
  const [data, setData] = useState<CMSData>(() => {
    const cmsData = getCMSData();
    // Ensure booking data is always available
    if (!cmsData.booking) {
      cmsData.booking = {
        cities: [],
        airports: [],
        carTypes: [],
        hotels: [],
        tourDestinations: [],
        driverNationalities: [],
        languages: [],
        tourTypes: [],
        routes: [],
        settings: {
          id: '1',
          whatsappNumber: '',
          confirmationMessage: '',
          currencySymbol: '$',
          defaultLanguage: 'ar',
          minBookingDays: 1,
          maxBookingDays: 30,
          mandatoryTourWhenDifferentCity: false
        }
      };
    }
    
    // Ensure settings have mapboxToken field
    if (!cmsData.settings.mapboxToken) {
      cmsData.settings.mapboxToken = '';
    }
    
    return cmsData;
  });
  const [isLoading, setIsLoading] = useState(false);

  const updateData = async (newData: Partial<CMSData>) => {
    setIsLoading(true);
    try {
      updateCMSData(newData);
      const updatedData = { ...data, ...newData };
      // Ensure booking data structure is maintained
      if (!updatedData.booking) {
        updatedData.booking = {
          cities: [],
          airports: [],
          carTypes: [],
          hotels: [],
          tourDestinations: [],
          driverNationalities: [],
          languages: [],
          tourTypes: [],
          routes: [],
          settings: {
            id: '1',
            whatsappNumber: '',
            confirmationMessage: '',
            currencySymbol: '$',
            defaultLanguage: 'ar',
            minBookingDays: 1,
            maxBookingDays: 30,
            mandatoryTourWhenDifferentCity: false
          }
        };
      }
      
      // Ensure settings have mapboxToken field
      if (!updatedData.settings.mapboxToken) {
        updatedData.settings.mapboxToken = '';
      }
      
      setData(updatedData);
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
      const freshData = getCMSData();
      // Ensure booking data is available after reset
      if (!freshData.booking) {
        freshData.booking = {
          cities: [],
          airports: [],
          carTypes: [],
          hotels: [],
          tourDestinations: [],
          driverNationalities: [],
          languages: [],
          tourTypes: [],
          routes: [],
          settings: {
            id: '1',
            whatsappNumber: '',
            confirmationMessage: '',
            currencySymbol: '$',
            defaultLanguage: 'ar',
            minBookingDays: 1,
            maxBookingDays: 30,
            mandatoryTourWhenDifferentCity: false
          }
        };
      }
      
      // Ensure settings have mapboxToken field
      if (!freshData.settings.mapboxToken) {
        freshData.settings.mapboxToken = '';
      }
      
      setData(freshData);
    } catch (error) {
      console.error('Error resetting CMS data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = () => {
    const freshData = getCMSData();
    // Ensure booking data is available after refresh
    if (!freshData.booking) {
      freshData.booking = {
        cities: [],
        airports: [],
        carTypes: [],
        hotels: [],
        tourDestinations: [],
        driverNationalities: [],
        languages: [],
        tourTypes: [],
        routes: [],
        settings: {
          id: '1',
          whatsappNumber: '',
          confirmationMessage: '',
          currencySymbol: '$',
          defaultLanguage: 'ar',
          minBookingDays: 1,
          maxBookingDays: 30,
          mandatoryTourWhenDifferentCity: false
        }
      };
    }
    
    // Ensure settings have mapboxToken field
    if (!freshData.settings.mapboxToken) {
      freshData.settings.mapboxToken = '';
    }
    
    setData(freshData);
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
